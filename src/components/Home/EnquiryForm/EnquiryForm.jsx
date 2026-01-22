import React from "react";
import styles from "./enquiryform.module.css";
import Link from "next/link"
import { Philosopher } from 'next/font/google';
const philosopher = Philosopher({
  subsets: ['latin'],
  weight: '700',
});
function EnquiryForm() {
  return (
    <>
   
    {/* <div className={styles.bgcolor}>
  <div className={`container py-5 ${styles.section}`}>
    <h1 className={styles.headerText}>
      Unforgettable Hotel Stays & Excursions
    </h1>

    <p className={styles.subHeader}>
      Discover premium hotels and curated excursions designed to give you
      comfort, adventure, and memorable travel experiences worldwide.
    </p>

    <div className="row">
      <div className="col-md-4">
        <FaHotel className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>Luxury Hotels</h2>
        <p className={styles.featureDesc}>
          Stay at handpicked hotels offering comfort, world-class amenities,
          and prime locations for every type of traveler.
        </p>
      </div>

      <div className="col-md-4">
        <FaUmbrellaBeach className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>Beach & Resort Escapes</h2>
        <p className={styles.featureDesc}>
          Relax at stunning beach resorts and seaside hotels with exclusive
          leisure activities and breathtaking views.
        </p>
      </div>

      <div className="col-md-4">
        <FaCity className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>City Tours</h2>
        <p className={styles.featureDesc}>
          Explore iconic cities with guided sightseeing tours, cultural
          experiences, and local attractions.
        </p>
      </div>
    </div>

    <div className="row mt-4">
      <div className="col-md-4">
        <FaMountainSun className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>Adventure Excursions</h2>
        <p className={styles.featureDesc}>
          Enjoy mountain tours, desert safaris, and outdoor adventures designed
          for thrill-seekers and nature lovers.
        </p>
      </div>

      <div className="col-md-4">
        <FaShip className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>Cruises & Boat Tours</h2>
        <p className={styles.featureDesc}>
          Experience luxury cruises, island hopping, and scenic boat tours
          tailored for relaxing journeys.
        </p>
      </div>

      <div className="col-md-4">
        <FaMapMarkedAlt className={styles.featureIcon} />
        <h2 className={styles.featureTitle}>Guided Experiences</h2>
        <p className={styles.featureDesc}>
          Book professionally guided excursions with expert local guides to
          ensure safe and enriching travel experiences.
        </p>
      </div>
    </div>
  </div>
</div> */}

    <section className={`${styles.ticket} position-relative`}>
  <div className={styles.overlay}></div>

  <div className="container">
    <div className={`w-lg-75 mx-auto text-center ${styles.ticketInner}`}>
      <div className={styles.ticketTitle}>
        {/* <h5>LET'S DO IT HURRY</h5> */}
        <h1 className={philosopher.className}>
         Ready to Explore World?{" "}
        
        </h1>
      </div>

      <div className={styles.ticketInfo}>
        <p>
          Book your next adventure and discover the wonders of the Kingdom.
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
