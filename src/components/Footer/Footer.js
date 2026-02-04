"use client";
import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Philosopher } from "next/font/google";
import { useRouter } from "next/navigation";
import moment from "moment";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "700",
});
export default function Footer() {
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
      <footer className={styles.footer}>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <div className="container py-5">
            <div
              className={`text-center mx-auto ${styles.newsletterContainer}`}
            >
              <h3 className={`fw-bold mb-3 ${philosopher.className}`}>
                Get Exclusive Deals
              </h3>
              <p
                className="mb-4"
                style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1rem" }}
              >
                Subscribe for special offers and travel inspiration delivered to
                your inbox.
              </p>

              <form className="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  className={`form-control ${styles.newsletterInput}`}
                  placeholder="Enter your email address"
                />
                <button
                  type="button"
                  className={`btn text-light ${styles.subscribeBtn}`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container py-5">
          <div className="row g-4 g-lg-5">
            {/* Brand */}
            <div className="col-12 col-lg-4">
              <div className={styles.brandSection}>
                <Link href="/" className={styles.logoContainer}>
                  <Image
                    height={180}
                    width={220}
                    src="/images/kashtawhitelogo.png"
                    alt="kashta"
                    className="img-fluid"
                  />
                </Link>

                <p className={styles.brandDescription}>
                  Discover the wonders of Saudi Arabia with expertly curated
                  tours and experiences. Your journey starts here.
                </p>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <span>Riyadh, Saudi Arabia</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhoneAlt />
                    <span>+966 11 222 3333</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FaEnvelope />
                    <span>info@kashta.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="col-6 col-md-4 col-lg-2">
              <div className={styles.footerSection}>
                <h6
                  className={`fw-bold ${styles.footerHeading} ${philosopher.className}`}
                >
                  Company
                </h6>
                <ul className={styles.footerList}>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/contact-us">Contact</Link>
                  </li>
                  <li>
                    <Link href="/faqs">FAQs</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Destinations */}
            <div className="col-6 col-md-4 col-lg-3">
              <div className={styles.footerSection}>
                <h6
                  className={`fw-bold ${styles.footerHeading} ${philosopher.className}`}
                >
                  Top Destinations
                </h6>
                <ul className={styles.footerList}>
                  <li
                    onClick={() => HotelListing("london")}
                    style={{ cursor: "pointer" }}
                  >
                    <a> London</a>
                  </li>
                  <li
                    onClick={() => HotelListing("dubai")}
                    style={{ cursor: "pointer" }}
                  >
                    <a> Dubai</a>
                  </li>
                  <li
                    onClick={() => HotelListing("newyork")}
                    style={{ cursor: "pointer" }}
                  >
                    <a> New York</a>
                  </li>
                  <li
                    onClick={() => HotelListing("istanbul")}
                    style={{ cursor: "pointer" }}
                  >
                    <a> Istanbul</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            {/* <div className="col-6 col-md-2">
              <h6 className={`fw-bold mb-3 ${philosopher.className}`}>
                Categories
              </h6>
              <ul className={styles.footerList}>
                <li>
                  <Link href="/">Adventure</Link>
                </li>
                <li>
                  <Link href="/">Heritage & Culture</Link>
                </li>
                <li>
                  <Link href="/">Food & Drink</Link>
                </li>
                <li>
                  <Link href="/">Desert Safari</Link>
                </li>
              </ul>
            </div> */}

            {/* Support */}
            <div className="col-12 col-md-4 col-lg-3">
              <div className={styles.footerSection}>
                <h6
                  className={`fw-bold ${styles.footerHeading} ${philosopher.className}`}
                >
                  Support & Legal
                </h6>
                <ul className={styles.footerList}>
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/faqs">Faqs</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className="container">
            <div className={styles.bottomContent}>
              <p className={styles.copyright}>
                © {new Date().getFullYear()} Kashta Travel. All rights reserved.
              </p>

              <div className={styles.socialLinks}>
                <a href="#" aria-label="Facebook" className={styles.social}>
                  <FaFacebookF />
                </a>
                <a href="#" aria-label="Instagram" className={styles.social}>
                  <FaInstagram />
                </a>
                <a href="#" aria-label="Twitter" className={styles.social}>
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
