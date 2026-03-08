import { useState } from "react";
import "./FAQ.css";

export default function FAQ({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="faq-editorial">
      <h3>Frequently Asked Questions</h3>

      {items.map((item, index) => (
        <div key={index} className="faq-row">
          <button
            className="faq-question"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
          >
            {item.question}
            <span>{openIndex === index ? "−" : "+"}</span>
          </button>

          <div
            className={`faq-answer ${
              openIndex === index ? "open" : ""
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}
