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
            <small>
              Premium stays and unforgettable excursions designed for travelers
              who want more.
            </small>
            <h1 className={`fw-bold ${styles.heroTitle}`}>
              Where Comfort Meets Adventure
            </h1>
            {/* <p className={styles.heroSubtitle}>Turning your journey into a path of blessings</p> */}
          </div>

          {/* Tabs */}

          {/* Tab Content */}
          <div
            className={`tab-content ${styles.searchBoxWrapper}`}
            id="searchTabsContent"
          >
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
                    className="nav-link active"
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
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
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
              </ul>
            </div>
            <div
              className="tab-pane fade show active"
              id="hotel-tab-pane"
              role="tabpanel"
              aria-labelledby="hotel-tab"
            >
              <HotelSearch />
            </div>

            <div
              className="tab-pane fade"
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
