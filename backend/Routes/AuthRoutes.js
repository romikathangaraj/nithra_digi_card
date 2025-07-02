const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateToken = require("../middleware/authMiddleware");

const {
  findUserByEmail,
  findGoogleUser,
  createLocalUser,
  createGoogleUser,
} = require("../Models/UserModel");

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// REGISTER
router.post("/register", async (req, res) => {
  const { email, password, name, phone_number } = req.body;
  findUserByEmail(email, async (err, results) => {
    if (results.length > 0) return res.status(400).json({ error: "User already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = {
      name,
      email,
      phone_number,
      password_hash,
      profile_pic: "https://i.imgur.com/7k12EPD.png",
    };

    createLocalUser(user, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: "7d" });
      res.status(201).json({ message: "Registered", token, user: { ...user, id: result.insertId } });
    });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (results.length === 0) return res.status(400).json({ error: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Login successful", token, user });
  });
});

// GOOGLE SIGN-IN
router.post("/google-signin", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: google_id, picture } = ticket.getPayload();

    findGoogleUser(email, (err, results) => {
      if (results.length > 0) {
        const user = results[0];
        const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({ message: "Google login successful", token: jwtToken, user });
      } else {
        const newUser = {
          name,
          email,
          google_id,
          profile_pic: picture,
        };
        createGoogleUser(newUser, (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          const jwtToken = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: "7d" });
          res.status(201).json({
            message: "Google account registered",
            token: jwtToken,
            user: { ...newUser, id: result.insertId },
          });
        });
      }
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Create digital card
router.post('/create-card', authenticateToken, upload.any(), async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    // Check if company_name already exists for this user (or globally if needed)
    const [existing] = await db.query('SELECT 1 FROM card WHERE company_name = ?', [body.companyName]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, error: 'Company name already exists. Please choose a different name.' });
    }

    const logoFile = files.find(f => f.fieldname === 'logo');
    const logoPath = logoFile ? `/uploads/${logoFile.filename}` : null;

    const products = [];
    for (let i = 0; i < 10; i++) {
      const imgField = `product${i + 1}_img`;
      const imageFile = files.find(f => f.fieldname === imgField);
      const imagePath = imageFile ? `/uploads/${imageFile.filename}` : null;
      products.push({
        name: body[`product${i + 1}_name`] || '',
        image: imagePath
      });
    }

    const videoLinks = [
      body.video1 || '',
      body.video2 || '',
      body.video3 || '',
      body.video4 || '',
      body.video5 || ''
    ];

    const values = [
      req.user.id,
      body.companyName,
      body.selectedTheme,
      logoPath,
      `${body.firstName} ${body.lastName}`,
      body.position,
      body.phone,
      body.whatsapp,
      body.address,
      body.email,
      body.website,
      body.location,
      body.established_date,
      body.about,
      body.facebook,
      body.twitter,
      body.instagram,
      body.linkedin,
      body.youtube,
      body.pinterest,
      ...videoLinks,
      body.google_map,
      body.bankName,
      body.accountHolder,
      body.accountNumber,
      body.ifsc,
      body.gst,
      body.googlepay,
      body.phonepe,
      body.paytm,
      ...products.flatMap(p => [p.image, null, null]),
      products.length,
      body.url_slug,
      body.razorpay_payment_id
    ];

    const sql = `
      INSERT INTO card (
        user_id, company_name, theme_id, logo, name, position, phone_number, alternate_phone_number,
        address, email, website, location, established_date, about_us,
        facebook_link, twitter_link, instagram_link, linkedin_link, youtube_link, pinterest_link,
        link1, link2, link3, link4, link5,
        google_map, bank_name, account_holder_name, account_number, ifsc, gst,
        gpay, phonepay, paytm_number,
        product1_img, product1_mrp, product1_selling_price,
        product2_img, product2_mrp, product2_selling_price,
        product3_img, product3_mrp, product3_selling_price,
        product4_img, product4_mrp, product4_selling_price,
        product5_img, product5_mrp, product5_selling_price,
        product6_img, product6_mrp, product6_selling_price,
        product7_img, product7_mrp, product7_selling_price,
        product8_img, product8_mrp, product8_selling_price,
        product9_img, product9_mrp, product9_selling_price,
        product10_img, product10_mrp, product10_selling_price,
        count, url_slug, razorpay_payment_id
      ) VALUES (${Array(values.length).fill('?').join(',')})
    `;

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      res.status(201).json({ success: true, card_id: result.insertId });
    });

  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


router.get("/user-cards", authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM card WHERE user_id = ?  AND is_delete = 0";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json({ cards: results });
  });
});

router.get("/card/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM card WHERE url_slug = ?  AND is_delete = 0";
  
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Card not found" });

    const card = results[0];

    // ✅ Construct products array
    const products = [];
    for (let i = 0; i < 10; i++) {
      const imgField = `product${i + 1}_img`;
      const nameField = `product${i + 1}_name`; // optional
      if (card[imgField]) {
        products.push({
          name: card[nameField] || `Product ${i + 1}`,
          image: card[imgField]
        });
      }
    }
    card.products = products;

    // ✅ Construct videos array from link1 to link5
    const videoLinks = [];
    for (let i = 1; i <= 5; i++) {
      const link = card[`link${i}`];
      if (link && link.trim() !== "") {
        videoLinks.push(link);
      }
    }
    card.videos = videoLinks;

    res.json({ card });
  });
});
// GET /api/auth/get-card/:url_slug
router.get('/get-card/:url_slug', authenticateToken, async (req, res) => {
  try {
    const { url_slug } = req.params;
    const [result] = await db.query('SELECT * FROM cards WHERE url_slug = ? AND is_delete = 0', [url_slug]);

    if (result.length === 0) {
      return res.status(404).json({ error: "Card not found" });
    }

    res.json({ card: result[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/auth/delete-card/:slug
router.delete('/delete-card/:slug', authenticateToken, async (req, res) => {
  const slug = req.params.slug;
  const userId = req.user.id;

  try {
    await db.query(
      'UPDATE card SET is_delete = 1 WHERE url_slug = ? AND user_id = ?',
      [slug, userId]
    );

    res.status(200).json({ message: 'Card marked as deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting card', error });
  }
});
router.put(
  "/update-card/:url_slug",
  authenticateToken,
  upload.any(),
  async (req, res) => {
    const { url_slug } = req.params;
    const userId = req.user.id;

    try {
      const files = req.files || [];
      const body = req.body;

      // Get existing card
      const [existingCard] = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM card WHERE url_slug = ? AND user_id = ?",
          [url_slug, userId],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      if (!existingCard) {
        return res.status(404).json({ success: false, error: "Card not found" });
      }

      // Logo
      const logoFile = files.find((f) => f.fieldname === "logo");
      const logoPath = logoFile
        ? `/uploads/${logoFile.filename}`
        : existingCard.logo;

      // Products
      const products = [];
      for (let i = 0; i < 10; i++) {
        const imgField = `product${i + 1}_img`;
        const imageFile = files.find((f) => f.fieldname === imgField);
        const imagePath = imageFile
          ? `/uploads/${imageFile.filename}`
          : existingCard[`product${i + 1}_img`];
        products.push({
          name: body[`product${i + 1}_name`] || "",
          image: imagePath,
        });
      }

      const videoLinks = [
        body.video1 || "",
        body.video2 || "",
        body.video3 || "",
        body.video4 || "",
        body.video5 || "",
      ];

      const updatedValues = [
        `${body.firstName} ${body.lastName}`,
        body.position,
        body.phone,
        body.whatsapp,
        body.address,
        body.email,
        body.website,
        body.location,
        body.established_date,
        body.about,
        body.facebook,
        body.twitter,
        body.instagram,
        body.linkedin,
        body.youtube,
        body.pinterest,
        ...videoLinks,
        body.google_map,
        body.bankName,
        body.accountHolder,
        body.accountNumber,
        body.ifsc,
        body.gst,
        body.googlepay,
        body.phonepe,
        body.paytm,
        ...products.flatMap((p) => [p.image, null, null]),
        products.length,
        logoPath,
        body.razorpay_payment_id,
        url_slug,
        userId,
      ];

      const sql = `
        UPDATE card SET
          name = ?,
          position = ?,
          phone_number = ?,
          alternate_phone_number = ?,
          address = ?,
          email = ?,
          website = ?,
          location = ?,
          established_date = ?,
          about_us = ?,
          facebook_link = ?,
          twitter_link = ?,
          instagram_link = ?,
          linkedin_link = ?,
          youtube_link = ?,
          pinterest_link = ?,
          link1 = ?, link2 = ?, link3 = ?, link4 = ?, link5 = ?,
          google_map = ?,
          bank_name = ?,
          account_holder_name = ?,
          account_number = ?,
          ifsc = ?,
          gst = ?,
          gpay = ?,
          phonepay = ?,
          paytm_number = ?,
          product1_img = ?, product1_mrp = ?, product1_selling_price = ?,
          product2_img = ?, product2_mrp = ?, product2_selling_price = ?,
          product3_img = ?, product3_mrp = ?, product3_selling_price = ?,
          product4_img = ?, product4_mrp = ?, product4_selling_price = ?,
          product5_img = ?, product5_mrp = ?, product5_selling_price = ?,
          product6_img = ?, product6_mrp = ?, product6_selling_price = ?,
          product7_img = ?, product7_mrp = ?, product7_selling_price = ?,
          product8_img = ?, product8_mrp = ?, product8_selling_price = ?,
          product9_img = ?, product9_mrp = ?, product9_selling_price = ?,
          product10_img = ?, product10_mrp = ?, product10_selling_price = ?,
          count = ?,
          logo = ?,
          razorpay_payment_id = ?
        WHERE url_slug = ? AND user_id = ?
      `;

      db.query(sql, updatedValues, (err, result) => {
        if (err) {
          console.error("DB error:", err);
          return res.status(500).json({ success: false, error: "Database error" });
        }
        return res.status(200).json({ success: true, message: "Card updated successfully" });
      });
    } catch (err) {
      console.error("Server error:", err.message);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  }
);

router.get('/check-company-name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const [result] = await db.query('SELECT 1 FROM cards WHERE company_name = ?', [name]);
    res.json({ exists: result.length > 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ exists: false });
  }
});


module.exports = router;
