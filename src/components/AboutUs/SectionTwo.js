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
            Our Values Shape Every Experience We Deliver
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaHeart />
              </div>
              <h5 className={styles.valuesTitle}>Authentic Travel Experiences</h5>
              <p className={styles.valuesDescription}>
                We believe travel should feel real and meaningful. Every experience we offer reflects Saudi culture, traditions, and lifestyle — not scripted tourism.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaUsers />
              </div>
              <h5 className={styles.valuesTitle}>Local Knowledge & Insight</h5>
              <p className={styles.valuesDescription}>
                Our guides and partners are locals who share genuine stories, cultural context, and places only insiders know.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaAward />
              </div>
              <h5 className={styles.valuesTitle}>Excellence & Reliability</h5>
              <p className={styles.valuesDescription}>
               From hotels to activities, we carefully select and review every service to ensure comfort, safety, and quality at every step.

              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className={styles.valuesCard}>
              <div className={styles.valuesIconBox}>
                <FaGlobe />
              </div>
              <h5 className={styles.valuesTitle}>Responsible & Sustainable Tourism</h5>
              <p className={styles.valuesDescription}>
               We support ethical travel practices that respect local communities, preserve heritage sites, and protect Saudi Arabia’s natural beauty.

              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
