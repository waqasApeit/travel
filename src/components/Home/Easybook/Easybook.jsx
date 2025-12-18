import React from 'react'
import styles from './easybook.module.css'
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link';
function Easybook() {
  return (
    <>
       <section className={`container-fluid px-0 ${styles.serviceSection}`}>
      <div className="row g-0">

        <div className={`col-md-4 border-end  ${styles.paddd}  ${styles.darkCard}`}>
          <h3 className={styles.title}>Easy Booking Service</h3>
          <p className={styles.text}>
            Book your trips quickly and effortlessly with our streamlined booking process designed for your convenience.
          </p>

          <Link href="/about-us" className={styles.explore}>
            <span className={styles.icon}>
              <FaArrowRight />
            </span>
            Explore More
          </Link>
        </div>

        <div className={`col-md-4 ${styles.paddd} ${styles.darkCard}`}>
          <h3 className={styles.title}>Trusted 100% Satisfaction</h3>
          <p className={styles.text}>
           We are committed to delivering reliable services and unforgettable experiences with complete customer satisfaction.
          </p>

          <Link href="/about-us" className={styles.explore}>
            <span className={styles.icon}>
              <FaArrowRight />
            </span>
            Explore More
          </Link>
        </div>

        <div className={`col-md-4 ${styles.paddd} ${styles.lightCard}`}>
          <h3 className={`${styles.title} ${styles.darkText}`}>
            Pilgrims Five Stars Service
          </h3>
          <p className={styles.lightText}>
           Enjoy premium services designed to provide comfort, care, and excellence throughout your sacred journey.
          </p>

          <Link href="/about-us"className={`${styles.explore} ${styles.darkExplore}`}>
            <span className={styles.icon}>
              <FaArrowRight />
            </span>
            Explore More
          </Link>
        </div>

      </div>
    </section>
    </>
  )
}

export default Easybook
