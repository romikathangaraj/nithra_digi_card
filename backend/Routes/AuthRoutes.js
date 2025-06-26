const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
const db = require('../db'); // make sure the path is correct

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



// Save digital card details
router.post('/create-card', async (req, res) => {
  try {
    const {
      user_id,
      url_slug, // ✅ Get the slug from frontend
      companyName,
      selectedTheme,
      logo,
      firstName,
      lastName,
      position,
      phone,
      whatsapp,
      email,
      website,
      about,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      pinterest,
      paytm,
      googlepay,
      phonepe,
      bankName,
      accountHolder,
      accountNumber,
      ifsc,
      established_date,
      location,
      address,
      gst,
      google_map,
      products = [] // default to empty array if undefined
    } = req.body;

    // Build the values array
    const values = [
      user_id,
      companyName,
      selectedTheme,
      logo,
      `${firstName} ${lastName}`,
      position,
      phone,
      whatsapp,
      address,
      email,
      website,
      location,
      established_date,
      about,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      pinterest,
      null, null, null, null, null, // link1 to link5 (optional future links)
      google_map,
      bankName,
      accountHolder,
      accountNumber,
      ifsc,
      gst,
      googlepay,
      phonepe,
      paytm,
      url_slug // ✅ Add slug as the last static field
    ];

    // Add product fields (product1_img, product1_mrp, product1_selling_price, ...)
    for (let i = 0; i < 10; i++) {
      const product = products[i] || {};
      values.push(product.image || null);
      values.push(product.mrp || null);
      values.push(product.selling_price || null);
    }

    values.push(products.length || 0); // count of products

    // Prepare the SQL query with placeholders
    const sql = `
      INSERT INTO card (
        user_id,
        company_name, theme_id, logo, name, position, phone_number, alternate_phone_number,
        address, email, website, location, established_date, about_us,
        facebook_link, twitter_link, instagram_link, linkedin_link, youtube_link, pinterest_link,
        link1, link2, link3, link4, link5,
        google_map, bank_name, account_holder_name, account_number, ifsc, gst,
        gpay, phonepay, paytm_number, url_slug,
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
        count
      ) VALUES (${Array(values.length).fill('?').join(',')})
    `;

    // Run the insert query
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ success: false, error: 'Database error' });
      }
      return res.status(201).json({ success: true, card_id: result.insertId });
    });

  } catch (error) {
    console.error('Server error:', error.message);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});


router.get("/user-cards/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT card_id, company_name, url_slug FROM card WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "DB Error" });
    res.json({ cards: results });
  });
});


module.exports = router;
