const db = require("../db");

exports.findUserByEmail = (email, cb) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], cb);
};

exports.findGoogleUser = (email, cb) => {
  db.query("SELECT * FROM users WHERE email = ? AND auth_provider = 'google'", [email], cb);
};

exports.createLocalUser = (user, cb) => {
  const sql = `
    INSERT INTO users (name, email, phone_number, password_hash, profile_pic, auth_provider)
    VALUES (?, ?, ?, ?, ?, 'local')
  `;
  db.query(sql, [user.name, user.email, user.phone_number, user.password_hash, user.profile_pic], cb);
};

exports.createGoogleUser = (user, cb) => {
  const sql = `
    INSERT INTO users (name, email, google_id, profile_pic, auth_provider)
    VALUES (?, ?, ?, ?, 'google')
  `;
  db.query(sql, [user.name, user.email, user.google_id, user.profile_pic], cb);
};
