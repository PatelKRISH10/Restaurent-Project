const express = require("express");
const db = require("../db");
const router = express.Router();

/* ================= GET TODAY SABJI ================= */
router.get("/today", (req, res) => {
  db.query(
    "SELECT sabji_lunch, sabji_dinner FROM daily_sabji WHERE id = 1",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});

/* ================= UPDATE SABJI FROM KITCHEN ================= */
router.post("/update", (req, res) => {
  const { sabji_name, slot } = req.body;

  if (!sabji_name || !slot) {
    return res.status(400).json({ success: false });
  }

  const column =
    slot === "lunch" ? "sabji_lunch" : "sabji_dinner";

  const sql = `
    UPDATE daily_sabji
    SET ${column} = ?, updated_at = NOW()
    WHERE id = 1
  `;

  db.query(sql, [sabji_name], (err) => {
    if (err) {
      console.error("Sabji update error:", err);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;
