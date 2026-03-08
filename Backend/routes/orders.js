const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/place", (req, res) => {
  const { table_no, items, total } = req.body;

  if (!table_no || !items || !total) {
    return res.status(400).json({ success: false });
  }

  db.query(
    "INSERT INTO orders (table_no, items, total, status) VALUES (?, ?, ?, 'Preparing')",
    [table_no, items, total],
    (err) => {
      if (err) {
        console.error("ORDER INSERT ERROR:", err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

router.get("/kitchen", (req, res) => {
  db.query(
    "SELECT * FROM orders WHERE status='Preparing'",
    (err, result) => {
      if (err) return res.status(500).json([]);
      res.json(result);
    }
  );
});

router.get("/today", (req, res) => {
  db.query(
    "SELECT SUM(total) AS collection FROM orders WHERE DATE(created_at)=CURDATE()",
    (err, result) => res.json(result[0])
  );
});

/* ============================
   MARK ORDER AS COMPLETED
============================ */
router.put("/complete/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE orders SET status='Completed' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    }
  );
});

/* ============================
   COMPLETED ORDERS BY DATE
============================ */
router.get("/completed", (req, res) => {
  const { date, slot } = req.query;

  let sql = `
    SELECT *
    FROM orders
    WHERE status='Completed'
      AND DATE(created_at)=?
  `;

  const params = [date];

  if (slot && slot !== "all") {
    sql += " AND items LIKE ?";
    params.push(`%${slot}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

/* ============================
   CANCEL ORDER
============================ */
router.put("/cancel/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE orders SET status='Cancelled' WHERE id=?",
    [id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }

      res.json({ success: true });
    }
  );
});


module.exports = router;
