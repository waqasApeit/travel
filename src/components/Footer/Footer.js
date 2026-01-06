import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGooglePlusG,
  FaLinkedinIn,
  FaPhone,
  FaMailBulk,
  FaAngleRight,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { FaLocationPin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={`container ${styles.footerContent}`}>
        {/* TOP ROW */}
        {/* <div className={`row align-items-center ${styles.topRow}`}>

      
          <div className="col-lg-4 col-md-12 text-center text-lg-start mb-4 mb-lg-0">
            <div className={styles.footerLogo}>
              <Image
                height={150}
                width={230}
                src="/images/footer-logo.png"
                alt="footer-logo"
              />
            </div>
          </div>

        
          <div className="col-lg-4 col-md-12 text-center mb-4 mb-lg-0">
            <h5 className={styles.sectionTitle}>Connect with us</h5>
            <div className={styles.socialIcons}>
              <a className="text-decoration-none text-white" href="https://www.facebook.com/Traveltoursbirmingham"><span><FaFacebookF /></span></a>
              <a className="text-decoration-none text-white" href="https://x.com/Traveltours2"><span><FaXTwitter /></span></a>
              <a className="text-decoration-none text-white" href="https://www.instagram.com/Travel.tours"><span><FaInstagram /></span></a>
              <a className="text-decoration-none text-white" href="https://www.linkedin.com/company/Traveltours/"><span><FaLinkedinIn /></span></a>
              <a className="text-decoration-none text-white" href="https://www.tiktok.com/@Traveltours"><span><FaTiktok /></span></a>
            </div>
          </div>

     
          <div className="col-lg-4 col-md-12 text-center text-lg-end">
           
            <div className={styles.subscribeBox}>
              <a href="tel:01217772522" className="text-decoration-none "><button >Contact Us:  0121 777 2522</button></a>
            </div>
          </div>

        </div> */}

        {/* <hr className={styles.separator} /> */}
        <div className="row mb-5">
          <div className="col-lg-4 col-md-6 mb-4">
            {/* <h5 className={styles.heading}>Trusted Support</h5> */}
            <div className={styles.footerLogo}>
              <Image
                height={100}
                width={350}
                src="/images/logoo.png"
                alt="kashta"
                className="img-fluid"
              />
              {/* <h1 className="fw-bold">Travel</h1> */}
            </div>

            <p className={styles.text}>
              Travel, based in the UK, is committed to helping pilgrims every
              step of the way. We make sure that your Hajj or Umrah journey goes
              smoothly,
            </p>
            <hr />
            <div className={styles.socialLinks}>
              <a href="#" className={`${styles.icon} ${styles.facebook}`}>
                <FaFacebookF color="#1C403A" />
              </a>
              <a href="#" className={`${styles.icon} ${styles.instagram}`}>
                <FaInstagram color="#1C403A" />
              </a>

              <a href="#" className={`${styles.icon} ${styles.twitter}`}>
                <FaLinkedinIn color="#1C403A" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className={styles.heading}>Contact Info</h5>
            <div className={styles.contactItem}>
              <div>
                <FaLocationPin />
              </div>
              <div>
                Stratford Road Birmingham, UK
              </div>
            </div>
            <div className={styles.contactItem}>
              <div>
                <FaPhone />
              </div>
              <div>
                {/* <strong>Phone No:</strong> <br /> */}
                <a
                  href="tel:9211122233333"
                  className="text-decoration-none text-white"
                >
                  {" "}
                  +92 111 222 33333
                </a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div>
                <FaMailBulk />
              </div>
              <div>
                {/* <strong>Email Address:</strong> <br /> */}
                <a
                  href="mailto:info@example.com"
                  className="text-decoration-none text-white"
                >
                  info@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className={styles.heading}>Usefull Links</h5>

            <ul className={styles.quickLinks}>
              <li>
                <Link href="/" className="text-white">
                  <FaAngleRight /> Home
                </Link>
              </li>{" "}
              <li>
                <Link href="/about-us" className="text-white">
                  <FaAngleRight /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-white">
                  <FaAngleRight /> Contact Us
                </Link>
              </li>
              {/* <li>
                <Link href="/blogs" className="text-white">
                  <FaAngleRight /> Blogs
                </Link>
              </li> */}
              <li>
                <Link href="/faqs" className="text-white">
                  <FaAngleRight /> Faqs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <hr className={styles.separator} /> */}
        <hr />
        {/* BOTTOM BAR */}
        <div className={`row ${styles.bottomBar}`}>
          <div className="col-md-6 text-center text-md-start">
            Copyright <b>&copy; {new Date().getFullYear()}</b> All Rights
            Reserved.{" "}
          </div>

          <div className="col-md-6 text-center text-md-end">
            <Link href="/terms-and-conditions" className="text-white">
              <span className={styles.bottomLink}>Terms and Conditions</span>
            </Link>{" "}
            |
            <Link href="/privacy-policy" className="text-white">
              <span className={styles.bottomLink}> Privacy Policy</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
