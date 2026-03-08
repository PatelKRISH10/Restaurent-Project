import { useEffect, useState } from "react";
import "./DiningDashboard.css";
import bannerImg from "./restoLOGO.png";

export default function DiningDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= STATES ================= */
  const [bookings, setBookings] = useState([]);

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const [tableNo, setTableNo] = useState("");
  const [thali, setThali] = useState("");
  const [quantity, setQuantity] = useState(1);

  /* ================= FETCH BOOKINGS ================= */
  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    if (!user) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/tables/my-bookings/${user.id}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Fetch bookings error:", err);
    }
  };

  /* ================= BOOK TABLE ================= */
  const bookTable = async () => {
    if (!date || !timeSlot) {
      alert("Please select date and time slot");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/tables/book-table",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guests,
            booking_date: date,
            time_slot: timeSlot,
            user_id: user.id,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Table booked successfully");
        setDate("");
        setTimeSlot("");
        fetchMyBookings();
      } else {
        alert("Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Server error");
    }
  };

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    if (!tableNo || !thali || quantity < 1) {
      alert("Fill all order details");
      return;
    }

    const priceMap = {
      "₹70 Thali": 70,
      "₹100 Thali": 100,
      "₹120 Thali": 120,
    };

    const total = priceMap[thali] * quantity;

    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            table_no: tableNo,
            items: `${thali} x ${quantity}`,
            total,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Order placed successfully");
        setTableNo("");
        setThali("");
        setQuantity(1);
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Server error");
    }
  };

  /* ================= FORMAT DATE ================= */
  const formatDate = (d) => {
    const dateObj = new Date(d);
    return dateObj.toLocaleDateString("en-IN");
  };

  /* ================= JSX ================= */
  return (
    <div className="dining-page">

      {/* ================= HERO ================= */}
      <section className="dining-hero">
        <div className="dining-hero-text">
          <h1>
            Enjoy Dining <br />
            At <span>Shree Umiya Bhojnalaya</span>
          </h1>
          <p>
            Authentic home-style vegetarian meals served
            fresh every day with hygiene and love.
          </p>
          <div className="hero-note">
            🍽️ Pure Veg • Since 2020 • Fresh Daily
          </div>
        </div>

        <div className="dining-hero-image">
          <img src={bannerImg} alt="Shree Umiya Bhojnalaya" />
        </div>
      </section>

      {/* ================= BOOKING BAR ================= */}
      <section className="booking-bar">
        <select value={guests} onChange={(e) => setGuests(e.target.value)}>
          <option value={2}>2 Guests</option>
          <option value={3}>3 Guests</option>
          <option value={4}>4 Guests</option>
          <option value={5}>5 Guests</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        >
          <option value="">Select Time</option>
          <option value="Lunch">Lunch (12:00 – 3:30)</option>
          <option value="Dinner">Dinner (7:30 – 11:00)</option>
        </select>

        <button className="primary-btn" onClick={bookTable}>
          Book Table
        </button>
      </section>

      {/* ================= MY BOOKINGS ================= */}
      <section className="card-section">
        <h2 className="section-title">📅 My Table Bookings</h2>

        <div className="booking-card">
          {bookings.length === 0 ? (
            <p className="empty-text">No bookings yet</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Guests</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.guests}</td>
                    <td>{formatDate(b.booking_date)}</td>
                    <td>{b.time_slot}</td>
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
      </section>

      {/* ================= PLACE ORDER ================= */}
      <section className="order-section">
        <div className="order-left">
          <img
            src="https://images.pexels.com/photos/8148149/pexels-photo-8148149.jpeg"
            alt="Food Plate"
          />
        </div>

        <div className="order-right">
          <h2>🍽️ Place Your Order</h2>

          <input
            placeholder="Table Number"
            value={tableNo}
            onChange={(e) => setTableNo(e.target.value)}
          />

          <select value={thali} onChange={(e) => setThali(e.target.value)}>
            <option value="">Select Thali</option>
            <option>₹70 Thali</option>
            <option>₹100 Thali</option>
            <option>₹120 Thali</option>
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button className="primary-btn full" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </section>

    </div>
  );
}
