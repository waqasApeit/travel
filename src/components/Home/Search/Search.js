import React from "react";
import { IoAirplane } from "react-icons/io5";
import { FaHotel, FaRightLong } from "react-icons/fa6";
import { BsSuitcaseFill } from "react-icons/bs";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import dynamic from "next/dynamic";
import HeroSection from "./HeroSection";
import styles from "./search.module.css";
import { IoBed } from "react-icons/io5";
import { MdAttractions } from "react-icons/md";
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
              className="nav nav-pills gap-3 lights medium justify-content-center"
              id="searchTabs"
              role="tablist"
            >
              {/* Activity */}
              <li className="nav-item" role="presentation">
                <div className="tab-item text-center">
                  <button
                    className="nav-link rounded d-flex align-items-center justify-content-center active"
                    id="activity-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#activity-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="activity-tab-pane"
                    aria-selected="true"
                  >
                    <MdAttractions size={20} />
                  </button>
                  <span className="tab-label text-white">Activity</span>
                </div>
              </li>

              {/* Hotel */}
              <li className="nav-item" role="presentation">
                <div className="tab-item text-center">
                  <button
                    className="nav-link rounded d-flex align-items-center justify-content-center"
                    id="hotel-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#hotel-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="hotel-tab-pane"
                    aria-selected="false"
                  >
                    <IoBed size={20} />
                  </button>
                  <span className="tab-label text-white">Hotel</span>
                </div>
              </li>
            </ul>
          </div>
         <div
            className={`tab-content ${styles.searchBoxWrapper}`}
            id="searchTabsContent"
          >
            <div
              className="tab-pane fade show active"
              id="activity-tab-pane"
              role="tabpanel"
              aria-labelledby="activity-tab"
            >
              <ActivitySearch />
            </div>

            <div
              className="tab-pane fade"
              id="hotel-tab-pane"
              role="tabpanel"
              aria-labelledby="hotel-tab"
            >
              <HotelSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
