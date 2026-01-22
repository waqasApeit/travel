"use client";
import React from "react";
import styles from "./Topdestination.module.css";
import {
  FaMountain,
  FaUtensils,
  FaLandmark,
  FaCamera,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import moment from "moment";
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
function Topdestination() {
  const router = useRouter();
  const HotelListing = (cname) => {
    var lat;
    var lng;
    var code;
    var location;
    var country;
    var city = "";
    if (cname === "makkah") {
      lat = 21.4240968;
      lng = 39.81733639999999;
      code = "SA";
      location = "Makkah Saudi Arabia";
      country = "Saudi Arabia";
      city = "Makkah";
    } else if (cname === "madinah") {
      lat = 24.4672132;
      lng = 39.6024496;
      code = "SA";
      location = "Madinah Saudi Arabia";
      country = "Saudi Arabia";
      city = "Madinah";
    } else if (cname === "london") {
      lat = 51.5072178;
      lng = -0.1275862;
      code = "GB";
      location = "London, UK";
      country = "United Kingdom";
      city = "London";
    } else if (cname === "dubai") {
      lat = 25.2048493;
      lng = 55.2707828;
      code = "AE";
      location = "Dubai - United Arab Emirates";
      country = "United Arab Emirates";
      city = "Dubai";
    } else if (cname === "riyadh") {
      lat = 24.713552;
      lng = 46.675297;
      code = "SA";
      location = "Riyadh, Saudi Arabia";
      country = "Saudi Arabia";
      city = "Riyadh";
    } else if (cname === "jeddah") {
      lat = 21.543333;
      lng = 39.172778;
      code = "SA";
      location = "Jeddah, Saudi Arabia";
      country = "Saudi Arabia";
      city = "Jeddah";
    } else if (cname === "newyork") {
      lat = 40.7127753;
      lng = -74.0059728;
      code = "US";
      location = "New York, USA";
      country = "United States";
      city = "New York";
    } else if (cname === "istanbul") {
      lat = 41.0082376;
      lng = 28.9783589;
      code = "TR";
      location = "Istanbul, Turkey";
      country = "Turkey";
      city = "Istanbul";
    }
    const queryParams = new URLSearchParams();
    queryParams.set("checkIn", moment().add(1, "days").format("YYYY-MM-DD"));
    queryParams.set("checkOut", moment().add(2, "days").format("YYYY-MM-DD"));
    queryParams.set("currency", "GBP");
    queryParams.set("city", city);
    queryParams.set("lat", lat);
    queryParams.set("lng", lng);
    queryParams.set("code", code);
    queryParams.set("location", location);
    queryParams.set("country", country);
    const roomsArray = [
      {
        adults: 2,
        children: [],
      },
    ];
    localStorage.setItem("searchRoomSelection", JSON.stringify(roomsArray));
    router.push(`/hotels?${queryParams.toString()}`);
  };
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className={`fw-bold mb-0 ${philosopher.className}`}>
              Explore Our Top Destinations
            </h2>
          </div>

          {/* Grid */}
          <div className="row g-3 g-md-4">
            <div className="col-6 col-md-3">
              <div
                className={styles.card}
                onClick={() => HotelListing("london")}
              >
                {/* Image */}
                <Image
                  src="/images/home/london.jpg"
                  alt="london"
                  className={styles.image}
                  width={1000}
                  height={1000}
                  //   quality={75}
                />

                {/* Overlay */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.content}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {/* <FaMountain size={18} className={styles.icon} /> */}
                    <h5
                      className={`mb-0 fw-bold text-white ${philosopher.className}`}
                    >
                      London
                    </h5>
                  </div>
                  <p className="text-white-50 small mb-0">
                    Discover timeless history, royal landmarks, and vibrant city
                    life.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.card}  onClick={() => HotelListing("dubai")}>
                {/* Image */}
                <Image
                  src="/images/home/uae.jpeg"
                  alt="Dubai"
                  className={styles.image}
                  width={1000}
                  height={1000}
                />

                {/* Overlay */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.content}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {/* <FaMountain size={18} className={styles.icon} /> */}
                    <h5
                      className={`mb-0 fw-bold text-white ${philosopher.className}`}
                    >
                      Dubai
                    </h5>
                  </div>
                  <p className="text-white-50 small mb-0">
                    Experience luxury, desert adventures, and world-class
                    attractions.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.card}  onClick={() => HotelListing("newyork")}>
                {/* Image */}
                <Image
                  src="/images/home/newyork.jpg"
                  alt="New York"
                  className={styles.image}
                  width={1000}
                  height={1000}
                />

                {/* Overlay */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.content}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {/* <FaMountain size={18} className={styles.icon} /> */}
                    <h5
                      className={`mb-0 fw-bold text-white ${philosopher.className}`}
                    >
                      New York
                    </h5>
                  </div>
                  <p className="text-white-50 small mb-0">
                    Feel the energy of the city that never sleeps.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className={styles.card}  onClick={() => HotelListing("istanbul")}>
                {/* Image */}
                <Image
                  src="/images/home/istanbol.jpg"
                  alt="Istanbul"
                  className={styles.image}
                  width={1000}
                  height={1000}
                />

                {/* Overlay */}
                <div className={styles.overlay} />

                {/* Content */}
                <div className={styles.content}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    {/* <FaMountain size={18} className={styles.icon} /> */}
                    <h5
                      className={`mb-0 fw-bold text-white ${philosopher.className}`}
                    >
                      Istanbul
                    </h5>
                  </div>
                  <p className="text-white-50 small mb-0">
                    Where East meets West with rich culture and breathtaking
                    history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Topdestination;
