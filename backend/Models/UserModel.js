const db = require("../db");

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};

exports.findGoogleUser = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND auth_provider = 'google'", [email]);
  return rows;
};

exports.createLocalUser = async (user) => {
  const [result] = await db.query(`
    INSERT INTO users (name, email, phone_number, password_hash, profile_pic, auth_provider)
    VALUES (?, ?, ?, ?, ?, 'local')`, 
    [user.name, user.email, user.phone_number, user.password_hash, user.profile_pic]
  );
  return result;
};

exports.createGoogleUser = async (user) => {
  const [result] = await db.query(`
    INSERT INTO users (name, email, google_id, profile_pic, auth_provider)
    VALUES (?, ?, ?, ?, 'google')`, 
    [user.name, user.email, user.google_id, user.profile_pic]
  );
  return result;
};
