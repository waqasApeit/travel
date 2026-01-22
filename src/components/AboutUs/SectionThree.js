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
              Born from a passion for authentic experiences, Explore connects
              curious travelers with local experts who share their world's
              hidden treasures. Since 2015, we've been crafting journeys that go
              beyond sightseeing to create lasting memories.
            </p>
          </div>
        </section>
      </div>

      <section className={styles.sectionSpacing}>
        <div className="container">
          <div className="row text-center gy-4">
            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>500+</p>
              <p className={styles.statsLabel}>Tours Offered</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>50+</p>
              <p className={styles.statsLabel}>Destinations</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>100k+</p>
              <p className={styles.statsLabel}>Happy Travelers</p>
            </div>

            <div className="col-6 col-md-3">
              <p className={styles.statsValue}>10+</p>
              <p className={styles.statsLabel}>Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
