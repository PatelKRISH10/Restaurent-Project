import FAQ from "./FAQ";
import "./AboutSection.css";

export default function AboutSection({ faqData }) {
  return (
    <section id="about" className="about-editorial">

      {/* TOP INTRO */}
      <div className="about-intro">
        <h2>About Us</h2>
        <p className="about-tagline">
          Serving home-style vegetarian food with care, honesty, and simplicity.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="about-content">
        <div className="about-text-block">
          <p>
            Shree Umiya Bhojnalaya was started in <b>2020</b> with a simple goal —
            <b> serving home-style food outside the home</b>.
          </p>

          <p>
            Our food is prepared just like <b>mom-cooked meals</b>, focusing on
            <b> healthy cooking</b>, fresh vegetables and hygienic preparation.
          </p>

          <p>
            We proudly serve pure vegetarian food in <b>Ghatkopar</b> for families,
            office-goers and students.
          </p>
        </div>

        {/* VISUAL / EMPTY BLOCK (future image ready) */}
        <div className="about-visual">
          <div className="visual-placeholder">
            Since<br /><span>2020</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <FAQ items={faqData} />

    </section>
  );
}
