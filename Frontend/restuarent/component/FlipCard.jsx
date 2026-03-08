import { useState } from "react";
import "./FlipCard.css";

export default function FlipCard({ title, oneLine, description }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="flip-card"
      onClick={() => setFlipped((prev) => !prev)}
      role="button"
      aria-label={title}
    >
      <div className={`flip-card-inner ${flipped ? "is-flipped" : ""}`}>
        
        {/* FRONT */}
        <div className="flip-card-face flip-card-front">
          <h3>{title}</h3>
          <span className="divider" />
          <p className="subtitle">{oneLine}</p>
        </div>

        {/* BACK */}
        <div className="flip-card-face flip-card-back">
          <h3>{title}</h3>
          <span className="divider light" />
          <p className="description">{description}</p>
        </div>

      </div>
    </div>
  );
}
