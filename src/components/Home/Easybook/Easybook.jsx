import React from 'react'
import styles from './easybook.module.css'
import { FaArrowRight } from "react-icons/fa";
import { FaShieldAlt, FaClock, FaAward } from "react-icons/fa";
import { Imperial_Script } from "next/font/google";
import { Philosopher } from 'next/font/google';
const philosopher = Philosopher({
  subsets: ['latin'],
  weight: '400',
})
import Link from 'next/link';
function Easybook() {
  const features = [
  {
    icon: FaShieldAlt,
    title: "Trusted & Safe",
    description: "All tours are verified and meet Saudi tourism standards",
  },
  {
    icon: FaClock,
    title: "Flexible Booking",
    description: "Free cancellation up to 24 hours before your tour",
  },
  {
    icon: FaAward,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you 10% off",
  },
];
  return (
    <>
       {/* <section className={`container-fluid px-0 ${styles.serviceSection}`}>
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
    </section> */}
        <section className={`py-5 border-bottom ${styles.section}`}>
      <div className="container">
        <div className="row g-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div className="col-12 col-md-4" key={feature.title}>
                <div className="d-flex align-items-start gap-3">
                  <div className={styles.iconWrapper}>
                    <Icon size={24} className={styles.icon} />
                  </div>
                  <div>
                    <h5 className={`fw-semibold mb-1 ${philosopher.className}`}>
                      {feature.title}
                    </h5>
                    <p className="text-muted mb-0 small">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    </>
  )
}

export default Easybook
