import React from "react";
import styles from "./about.module.css";
export default function SectionThree() {
  return (
    <>
      <div className="container mt-4">
        <section className={styles.sectionSpacing}>
          <div className="container text-center">
            {/* Badge */}
            <span className={styles.storyBadge}>Our Story</span>

            {/* Heading */}
            <h1 className={`fw-bold ${styles.storyHeading}`}>
              We Make Travel{" "}
              <span className={styles.highlight}>Unforgettable</span>
            </h1>

            {/* Description */}
            <p className={styles.storyDescription}>
              Saudi Excursions was founded with a clear vision: to showcase Saudi Arabia through authentic, immersive, and well-curated travel experiences. Inspired by the Kingdom’s rich heritage, breathtaking landscapes, and warm hospitality, we connect travelers with the real essence of Saudi Arabia.
            </p>
          </div>
        </section>
      </div>

      <section className={styles.sectionSpacing}>
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>300+</p>
              <p className={styles.statsLabel}> Curated Tours & Experiences</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>30+</p>
              <p className={styles.statsLabel}>Saudi Destinations Covered</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>50k+</p>
              <p className={styles.statsLabel}>Satisfied Travelers</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>8+</p>
              <p className={styles.statsLabel}>Years of Industry Experience</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
