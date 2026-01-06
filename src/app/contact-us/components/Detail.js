import React from 'react'
import styles from "../ContactUs.module.css";
import { BsPinMapFill , BsEnvelopeOpen , BsTelephoneFill , BsClockHistory, BsFacebook , BsTwitterX, BsInstagram, BsYoutube, BsLinkedin, BsTiktok } from 'react-icons/bs';
export default function Detail() {
  return (
    <div className={styles.contactdetail}>
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
    </div>
  )
}
