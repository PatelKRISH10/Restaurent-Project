const express = require("express");
const db = require("../db");
const router = express.Router();

/* =========================
   CUSTOMER REGISTER
   (Only customers can signup)
========================= */
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing fields" });
  }

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'customer')",
    [name, email, password],
    (err) => {
      if (err) {
        console.error("REGISTER ERROR:", err);
        return res.json({ success: false });
      }

      res.json({ success: true });
    }
  );
});

/* =========================
   LOGIN (Customer & Staff)
========================= */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false });
  }

  db.query(
    "SELECT id, name, email, role FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error("LOGIN ERROR:", err);
        return res.json({ success: false });
      }

      if (result.length > 0) {
        res.json({
          success: true,
          user: result[0], // id, name, email, role
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;
