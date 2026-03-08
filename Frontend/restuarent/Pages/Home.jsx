import { useNavigate } from "react-router-dom";
import FlipCard from "../component/FlipCard";
import AboutSection from "../component/AboutSection";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  // ✅ FAQ DATA (REUSABLE & EDITABLE)
  const faqData = [
    {
      question: "Is the food really healthy and home-style?",
      answer:
        "Yes. Our food is prepared daily using traditional home-style cooking methods. We focus on balanced meals, limited oil usage, and fresh ingredients just like home cooking."
    },
    {
      question: "Do you add soda or any artificial chemicals in food?",
      answer:
        "No. We do not use soda, artificial colors, preservatives, or harmful chemicals. Hygiene and natural taste are our highest priorities."
    }
  ];

  return (
    <div className="home-wrapper">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <h1 className="title">Shree Umiya Bhojnalaya</h1>
        <p className="moto">Home Food Outside The Home</p>
        <p className="home-sub">
          Authentic Vegetarian Meals • Since 2020
        </p>

        <button
          className="h-btn"
          onClick={() => navigate("/dining")}
        >
          Book Table
        </button>
      </section>

      {/* ================= MENU SECTION ================= */}
      <section className="menu">
        <h2 className="home-section-title">Our Thali Menu</h2>

        <div className="flip-card-row">
          <FlipCard
            title="₹70 Thali"
            oneLine="Parcel Only"
            description="4 Roti, 1 Sabji, Dal & Rice"
          />

          <FlipCard
            title="₹100 Thali"
            oneLine="Best Seller"
            description="6 Roti, 2 Sabji (Veg + Beans), Dal, Rice & Free Buttermilk"
          />

          <FlipCard
            title="₹120 Thali"
            oneLine="Full Meal"
            description="8 Roti, 2 Sabji (Veg + Beans), Extra Sabji, Extra Dal & Rice & Free Buttermilk"
          />
        </div>
      </section>

      {/* ================= ABOUT + FAQ ================= */}
      <AboutSection faqData={faqData} />

    </div>
  );
}
