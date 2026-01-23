import React from 'react'
import styles from "../ContactUs.module.css";
import { BsPinMapFill , BsEnvelopeOpen , BsTelephoneFill , BsClockHistory, BsFacebook , BsTwitterX, BsInstagram, BsYoutube, BsLinkedin, BsTiktok } from 'react-icons/bs';

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
export default function Detail() {
  return (
    <>
    {/* <div className={styles.contactdetail}>
      <div className={styles.infodiv}>
        <div className={`${styles.infoheader} mb-4`}>
          <h3 className='fw-bolds text-center'>Contact Information</h3>
          <p>
            Do you have any questions about our Hotels and Excursions packages, or need any guidance while planning your trip? The Kashta Travels team is here to help you with expert advice and travel plans that are just for you. Call us and plan your next trip, and get affordable package deals for a smooth and meaningful journey.
          </p>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-3">  <div className={styles.infocard}>
            <div className={styles.iconcontainer}>
              <BsPinMapFill/>
            </div>
            <div className="card-content">
              <h4>Our Location</h4>
              <p> Jeddah, Saudia Arabia</p>
            </div>
          </div></div>
            <div className="col-md-3"><div className={styles.infocard}>
            <div className={styles.iconcontainer}>
              <BsEnvelopeOpen/>
            </div>
            <div className="card-content">
              <h4>Email Us</h4>
              <a href="mailto:info@traveltours.net" className="text-decoration-none text-white">info@kashta.com</a>
            </div>
          </div></div>
            <div className="col-md-3"> <div className={styles.infocard}>
            <div className={styles.iconcontainer}>
              <BsTelephoneFill/>
            </div>
            <div className="card-content">
              <h4>Call Us</h4>
              <a href="tel:123456789" className="text-decoration-none text-white">1122 236 5647</a>
            </div>
          </div></div>
            <div className="col-md-3"><div className={styles.infocard}>
            <div className={styles.iconcontainer}>
              <BsClockHistory/>
            </div>
            <div className="card-content">
              <h4>Working Hours</h4>
              <p>Monday-Friday: 9AM - 6PM</p>
            </div>
          </div></div>
          </div>
        </div>


        <div className={`mt-5 text-center ${styles.contactsocialLinks}`}>
          <h5>Follow Us</h5>
          <div className={styles.socialicons}>
            <a href=""><BsFacebook/></a>
            <a href=""><BsTwitterX/></a>
            <a href=""><BsInstagram/></a>
            <a href=""><BsLinkedin/></a>
             <a href=""><BsTiktok/></a>
          </div>
        </div>
      </div>
    </div> */}
    <div className="container mt-4">
            <section className={styles.sectionSpacing}>
              <div className="container text-center">
                {/* Badge */}
                <span className={styles.storyBadge}>Get In Touch</span>
    
                {/* Heading */}
                <h1 className={`fw-bold ${styles.storyHeading}`}>
                We'd Love to Hear From You
                </h1>
    
                {/* Description */}
                <p className={styles.storyDescription}>
                 Have questions about a tour? Need help planning your trip? Our friendly team is here to help.
                </p>
              </div>
            </section>
          </div>

 <section className={styles.section}>
      <div className="container">
        <div className="row g-4">

          {/* Visit Us */}
          <div className="col-6 col-lg-3">
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <FaMapMarkerAlt />
              </div>
              <h5 className={styles.title}>Visit Us</h5>
              <p className={styles.text}>123 Adventure Street</p>
            </div>
          </div>

          {/* Call Us */}
          <div className="col-6 col-lg-3">
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <FaPhoneAlt />
              </div>
              <h5 className={styles.title}>Call Us</h5>
              <p className={styles.text}>+966 11 222 3333</p>
            </div>
          </div>

          {/* Email Us */}
          <div className="col-6 col-lg-3">
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <FaEnvelope />
              </div>
              <h5 className={styles.title}>Email Us</h5>
              <p className={styles.text}>info@kashta.com</p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="col-6 col-lg-3">
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <FaClock />
              </div>
              <h5 className={styles.title}>Working Hours</h5>
              <p className={styles.text}>Mon - Fri: 9AM - 6PM</p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </>
  )
}
