const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const db = require('../db'); // make sure the path is correct
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // ✅ Add this
const authenticateToken = require("../middleware/authMiddleware"); // adjust path if needed


 // or configure `diskStorage()` if saving to disk


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



// Storage setup for multer
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
router.post('/create-card',authenticateToken, upload.any(), async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

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

    const values = [
      req.user.id,
      body.companyName,
      body.selectedTheme,
      null, // logo
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
      null, null, null, null, null, // link1-5
      body.google_map,
      body.bankName,
      body.accountHolder,
      body.accountNumber,
      body.ifsc,
      body.gst,
      body.googlepay,
      body.phonepe,
      body.paytm,
      ...products.flatMap(p => [p.image, null, null]), // image, mrp, selling_price
      products.length,
      body.url_slug
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
        count, url_slug
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
  const userId = req.user.id; // pulled from JWT
  const sql = "SELECT card_id, company_name, url_slug FROM card WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json({ cards: results });
  });
});


// GET /api/card/:slug
router.get("/card/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM card WHERE url_slug = ?";
  db.query(sql, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Card not found" });
    res.json({ card: results[0] });
  });
});



module.exports = router;
