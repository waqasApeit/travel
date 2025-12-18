import React from "react";
import styles from "./enquiryform.module.css";
import { IoFastFood } from "react-icons/io5";
import { BiSolidDish } from "react-icons/bi";
import { FaGlobe } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import { FaUmbrellaBeach } from "react-icons/fa";
import { FaMountainSun } from "react-icons/fa6";
import Link from "next/link";
function EnquiryForm() {
  return (
    <>
      <div className={styles.bgcolor}>
        <div className={`container ${styles.section}`}>
          <h1 className={styles.headerText}>
            Experience Once In Your Life Time
          </h1>

          <p className={styles.subHeader}>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts.
          </p>

          <div className="row justify-content-center ">
            <div className="col-md-4 col-sm-6">
              <BiSolidDish className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Good Foods</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>

            <div className="col-md-4 col-sm-6">
              <FaGlobe className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Travel Anywhere</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>

            <div className="col-md-4 col-sm-6">
              <ImAirplane className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Airplane</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>
          </div>

          <div className="row justify-content-center mt-3">
            <div className="col-md-4 col-sm-6">
              <FaUmbrellaBeach className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Beach Resort</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>

            <div className="col-md-4 col-sm-6">
              <FaMountainSun className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Mountain Climbing</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>

            <div className="col-md-4 col-sm-6">
              <BiSolidDish className={styles.featureIcon} />
              <h2 className={styles.featureTitle}>Hot Air Balloon</h2>
              <p className={styles.featureDesc}>
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia.
              </p>
            </div>
          </div>
        </div>
      </div>

    <section className={`${styles.ticket} position-relative`}>
  <div className={styles.overlay}></div>

  <div className="container">
    <div className={`w-lg-75 mx-auto text-center ${styles.ticketInner}`}>
      <div className={styles.ticketTitle}>
        <h5>LET'S DO IT HURRY</h5>
        <h1>
          HAVEN'T BOOKED YOUR HOTEL YET?{" "}
          {/* <span className={styles.pink}>Get Ticket</span> */}
        </h1>
      </div>

      <div className={styles.ticketInfo}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className={styles.ticketButton}>
          <Link href="/contact-us">Contact Us</Link>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default EnquiryForm;
