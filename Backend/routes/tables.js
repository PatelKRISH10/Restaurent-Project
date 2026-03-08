const express = require("express");
const db = require("../db");
const router = express.Router();

/* =========================
   BOOK TABLE
========================= */
router.post("/book-table", (req, res) => {
  const { guests, booking_date, time_slot, user_id } = req.body;

  if (!guests || !booking_date || !time_slot) {
    return res.status(400).json({ success: false });
  }

  const sql = `
    INSERT INTO table_bookings
    (user_id, guests, booking_date, time_slot, status)
    VALUES (?, ?, ?, ?, 'Booked')
  `;

  db.query(
    sql,
    [user_id || null, guests, booking_date, time_slot],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

/* =========================
   TODAY BOOKINGS (NOT COMPLETED)
========================= */
router.get("/today-bookings", (req, res) => {
  db.query(
    `
    SELECT id, guests, time_slot, booking_date, status
    FROM table_bookings
    WHERE booking_date = CURDATE()
      AND status != 'Completed'
    `,
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json([]);
      }
      res.json(result);
    }
  );
});

/* =========================
   MARK BOOKING COMPLETED
========================= */
router.put("/complete/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE table_bookings SET status='Completed' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false });
      res.json({ success: true });
    }
  );
});


/* ============================
   COMPLETED BOOKINGS BY DATE
============================ */
router.get("/completed", (req, res) => {
  const { date, slot } = req.query;

  let sql = `
    SELECT *
    FROM table_bookings
    WHERE status='Completed'
      AND booking_date=?
  `;

  const params = [date];

  if (slot && slot !== "all") {
    sql += " AND time_slot LIKE ?";
    params.push(`%${slot}%`);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json([]);
    res.json(result);
  });
});

router.get("/my-bookings/:userId", (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM table_bookings WHERE user_id=? ORDER BY booking_date DESC",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json([]);
      res.json(result);
    }
  );
});

router.put("/cancel/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE table_bookings SET status='Cancelled' WHERE id=? AND status='Booked'",
    [id],
    (err, result) => {
      if (err || result.affectedRows === 0) {
        return res.json({ success: false });
      }
      res.json({ success: true });
    }
  );
});


module.exports = router;
