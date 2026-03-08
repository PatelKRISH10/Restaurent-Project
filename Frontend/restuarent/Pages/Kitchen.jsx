import { useEffect, useState } from "react";
import "./Kitchen.css";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [sabji, setSabji] = useState("");
  const [slot, setSlot] = useState("lunch");

  useEffect(() => {
    fetchOrders();
    fetchBookings();
  }, []);

  /* ================= FORMAT DATE ================= */
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  /* ================= FETCH ORDERS ================= */
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/kitchen");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/tables/today-bookings"
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  /* ================= COMPLETE ORDER ================= */
  const markOrderCompleted = async (orderId) => {
    try {
      await fetch(
        `http://localhost:5000/api/orders/complete/${orderId}`,
        { method: "PUT" }
      );
      fetchOrders();
    } catch (err) {
      console.error("Complete order error:", err);
    }
  };

  /* ================= CANCEL ORDER ================= */
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/cancel/${orderId}`,
        { method: "PUT" }
      );
      const data = await res.json();

      if (data.success) fetchOrders();
      else alert("Cancel failed");
    } catch (err) {
      console.error("Cancel error:", err);
    }
  };

  /* ================= UPDATE SABJI ================= */
  const updateSabji = async () => {
    if (!sabji.trim()) {
      alert("Please enter sabji name");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/sabji/update",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sabji_name: sabji, slot }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Sabji updated successfully");
        setSabji("");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Sabji update error:", err);
    }
  };

  return (
    <div className="kitchen-wrapper">

      {/* ================= SABJI BAR ================= */}
      <div className="sabji-bar">
        <div className="sabji-left">
          🥦 Today’s Sabji Update
        </div>

        <div className="sabji-controls">
          <select value={slot} onChange={(e) => setSlot(e.target.value)}>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>

          <input
            placeholder="Gobi Sabji, Matar Sabji"
            value={sabji}
            onChange={(e) => setSabji(e.target.value)}
          />

          <button className="primary-btn" onClick={updateSabji}>
            Update
          </button>
        </div>
      </div>

      <h1 className="dashboard-title">Kitchen Dashboard</h1>

      {/* ================= TODAY BOOKINGS ================= */}
      <div className="dashboard-card">
        <h2 className="card-title">📅 Today’s Table Bookings</h2>

        {bookings.length === 0 ? (
          <p className="empty-text">No table bookings today</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Guests</th>
                <th>Time Slot</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.guests}</td>
                  <td>{b.time_slot}</td>
                  <td>{formatDateTime(b.booking_date)}</td>
                  <td>
                    <span className={`status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= ORDERS ================= */}
      <div className="dashboard-card">
        <h2 className="card-title">🍽️ Orders to Prepare</h2>

        {orders.length === 0 ? (
          <p className="empty-text">No orders to prepare</p>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.table_no}</td>
                  <td>{o.items}</td>
                  <td>₹{o.total}</td>
                  <td>
                    <span className="status preparing">{o.status}</span>
                  </td>
                  <td style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button
                      className="complete-btn"
                      onClick={() => markOrderCompleted(o.id)}
                    >
                      Ready
                    </button>

                    <button
                      className="cancel-btn"
                      onClick={() => cancelOrder(o.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
