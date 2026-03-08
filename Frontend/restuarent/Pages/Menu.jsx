import { useEffect, useState } from "react";
import "./Menu.css";
import thaliImg from "./thali.png";

export default function Menu() {
  const [sabji, setSabji] = useState({
    sabji_lunch: "",
    sabji_dinner: ""
  });

  useEffect(() => {
    fetchTodaySabji();
  }, []);

  const fetchTodaySabji = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/sabji/today");
      const data = await res.json();
      setSabji(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="menu-page">

      {/* HERO */}
      <section className="menu-hero">
        <div className="menu-hero-text">
          <h1>Find Your <span>Favorite Thali</span></h1>
          <p>
            Enjoy fresh, healthy and home-style vegetarian meals
            prepared daily with love and hygiene.
          </p>
        </div>

        <div className="menu-hero-image">
          <div className="image-ring">
            <img src={thaliImg} alt="Thali" />
          </div>
        </div>
      </section>

         {/* ================= THALI SECTION ================= */}
      <section className="thali-section">
        <h2 className="section-title">Our Thali Menu</h2>

        <div className="thali-grid">
          <div className="thali-box">
            <h3>₹70 Thali</h3>
            <span className="tag">Parcel Only</span>
            <p>4 Roti • 1 Sabji • Dal • Rice</p>
          </div>

          <div className="thali-box highlight">
            <h3>₹100 Thali</h3>
            <span className="tag best">Most Loved</span>
            <p>
              6 Roti • 2 Sabji • Dal • Rice • Buttermilk
            </p>
          </div>

          <div className="thali-box">
            <h3>₹120 Thali</h3>
            <span className="tag">Full Meal</span>
            <p>
              8 Roti • Extra Sabji • Dal • Rice • Buttermilk
            </p>
          </div>
        </div>
      </section>

      {/* THALI */}
      <section className="thali-section">
        {/* your thali boxes remain unchanged */}
      </section>

      {/* 🔥 DYNAMIC SABJI */}
      <section className="menu-highlight">
        <div className="highlight-item">
          🍛 <strong>Lunch Sabji:</strong>
          <span>{sabji.sabji_lunch || "Updating..."}</span>
        </div>

        <div className="highlight-item">
          🌙 <strong>Dinner Sabji:</strong>
          <span>{sabji.sabji_dinner || "Updating..."}</span>
        </div>
      </section>

    </div>
  );
}
