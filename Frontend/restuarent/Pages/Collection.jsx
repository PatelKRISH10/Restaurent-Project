import { useEffect, useState } from "react";
import "./Collection.css";

export default function Collection() {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [slot, setSlot] = useState("all"); // ONLY for bookings
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchOrdersAndCollection();
    fetchBookings();
  }, [date, slot]);

  /* ================= ORDERS + COLLECTION ================= */
  const fetchOrdersAndCollection = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/completed?date=${date}`
      );
      const data = await res.json();
      setOrders(data);

      const sum = data.reduce((acc, o) => acc + Number(o.total), 0);
      setTotal(sum);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= BOOKINGS (SLOT FILTER APPLIES) ================= */
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tables/completed?date=${date}&slot=${slot}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="collection-wrapper">
      <h1 className="dashboard-title">Collection Dashboard</h1>

      {/* ================= DATE FILTER ================= */}
      <div className="filter-bar">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Collection</h3>
          <p>₹ {total}</p>
        </div>
        <div className="summary-card">
          <h3>Orders Completed</h3>
          <p>{orders.length}</p>
        </div>
        <div className="summary-card">
          <h3>Tables Served</h3>
          <p>{bookings.length}</p>
        </div>
      </div>

      {/* ================= ORDERS HISTORY ================= */}
      <div className="dashboard-card">
        <h2>Completed Orders</h2>

        {orders.length === 0 ? (
          <p className="empty-text">No completed orders</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.table_no}</td>
                  <td>{o.items}</td>
                  <td>₹{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= BOOKINGS HISTORY ================= */}
      <div className="dashboard-card">
        <h2>Completed Table Bookings</h2>

        {/* SLOT FILTER (ONLY FOR BOOKINGS) */}
        <div className="slot-buttons">
          {["all", "Lunch", "Dinner"].map((s) => (
            <button
              key={s}
              className={slot === s ? "active" : ""}
              onClick={() => setSlot(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {bookings.length === 0 ? (
          <p className="empty-text">No completed bookings</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Guests</th>
                <th>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.guests}</td>
                  <td>{b.time_slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
