import React from "react";
import styles from "./about.module.css";
import Image from "next/image";

import { FaHeart, FaUsers, FaAward, FaGlobe } from "react-icons/fa";
export default function SectionTwo() {
  return (
    <>
 <section className={styles.sectionSpacing}>
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className={`fw-bold ${styles.valuesHeading}`}>
            What We Stand For
          </h2>
          <p className={styles.valuesSubtext}>
            Our values guide everything we do, from selecting our partners to
            designing your experiences.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaHeart />
              </div>
              <h5 className={styles.valuesTitle}>Passion for Travel</h5>
              <p className={styles.valuesDescription}>
                We believe travel has the power to transform lives and connect
                people across cultures.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaUsers />
              </div>
              <h5 className={styles.valuesTitle}>Local Expertise</h5>
              <p className={styles.valuesDescription}>
                Our guides are locals who share authentic stories and hidden
                gems you won't find in guidebooks.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaAward />
              </div>
              <h5 className={styles.valuesTitle}>Quality First</h5>
              <p className={styles.valuesDescription}>
                Every tour is carefully curated and reviewed to ensure
                unforgettable experiences.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaGlobe />
              </div>
              <h5 className={styles.valuesTitle}>Sustainable Tourism</h5>
              <p className={styles.valuesDescription}>
                We're committed to responsible travel that benefits local
                communities and protects our planet.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
