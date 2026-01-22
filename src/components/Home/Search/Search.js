import React from "react";
import { IoAirplane } from "react-icons/io5";
import { FaHotel, FaRightLong } from "react-icons/fa6";
import { BsSuitcaseFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import styles from "./search.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
const HotelSearch = dynamic(() => import("./HotelSearch"));
const ActivitySearch = dynamic(() => import("./ActivitySearch"));
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "700",
});
export default async function Search() {
  return (
    <div className={styles.heroWrapper}>
      {/* Swiper Carousel Background */}
      <div className={styles.heroCarouselBackground}>
        <HeroSection />
      </div>

      {/* Overlay between carousel and content */}
      <div className={styles.heroOverlay}></div>

      {/* Content on top of carousel */}
      <div className={styles.heroContent}>
        <div className="container">
          <div className="text-center text-white mb-4">
            <h1
              className={`fw-bold ${styles.heroTitle} ${philosopher.className}`}
            >
              Discover Saudi Arabia
            </h1>
            <p className="fw-medium">
              From ancient ruins to Red Sea adventures. Find your perfect
              experience.
            </p>
          </div>

          <div
            className={`${styles.searchTabsWrapper} d-flex justify-content-center mb-3`}
          >
            <ul
              className="nav nav-pills gap-2 lights medium"
              id="searchTabs"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-pill active"
                  id="activity-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#activity-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="activity-tab-pane"
                  aria-selected="false"
                >
                  <GiSettingsKnobs className="me-1" /> Activities
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link rounded-pill"
                  id="hotel-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#hotel-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="hotel-tab-pane"
                  aria-selected="true"
                >
                  <FaHotel className="me-1" /> Hotels
                </button>
              </li>
            </ul>
          </div>
          <div
            className={`tab-content ${styles.searchBoxWrapper}`}
            id="searchTabsContent"
          >
            <div
              className="tab-pane fade "
              id="hotel-tab-pane"
              role="tabpanel"
              aria-labelledby="hotel-tab"
            >
              <HotelSearch />
            </div>

            <div
              className="tab-pane fade show active"
              id="activity-tab-pane"
              role="tabpanel"
              aria-labelledby="activity-tab"
            >
              <ActivitySearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
