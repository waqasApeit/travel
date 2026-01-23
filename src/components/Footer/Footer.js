import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "700",
});
export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        {/* Newsletter */}
        <div className={styles.newsletter}>
          <div className="container py-5">
            <div className="text-center mx-auto" style={{ maxWidth: "520px" }}>
              <h3 className={`fw-bold mb-2 ${philosopher.className}`}>
                Get Exclusive Deals
              </h3>
              <p className="text-secondary mb-4">
                Subscribe for special offers and travel inspiration.
              </p>

              <form className="d-flex flex-column flex-sm-row gap-2">
                <input
                  type="email"
                  className={`form-control ${styles.newsletterInput}`}
                  placeholder="Enter your email"
                />
                <button className="btn exploreBtn text-light btn-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="container py-5">
          <div className="row g-4 align-items-baseline">
            {/* Brand */}
            <div className="col-12 col-md-3">
              <Image
                height={200}
                width={250}
                src="/images/logoo.png"
                alt="kashta"
                className="img-fluid"
              />

              <p className="small text-secondary mb-3">
                Discover the wonders of Saudi Arabia with expertly curated tours
                and experiences.
              </p>

              <div className="small text-secondary d-flex flex-column gap-2">
                <span className="d-flex align-items-center gap-2">
                  <FaMapMarkerAlt /> Riyadh, Saudi Arabia
                </span>
                <span className="d-flex align-items-center gap-2">
                  <FaPhoneAlt /> +966 11 222 3333
                </span>
                <span className="d-flex align-items-center gap-2">
                  <FaEnvelope /> info@kashta.com
                </span>
              </div>
            </div>

            {/* Company */}
            <div className="col-6 col-md-2">
              <h6 className={`fw-bold mb-3 ${philosopher.className}`}>Company</h6>
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
                  <Link href="/faqs">Faqs</Link>
                </li>
              </ul>
            </div>

            {/* Destinations */}
            <div className="col-6 col-md-2">
              <h6 className={`fw-bold mb-3 ${philosopher.className}`}>Destinations</h6>
              <ul className={styles.footerList}>
                <li>
                  <Link href="/">AlUla Tours</Link>
                </li>
                <li>
                  <Link href="/">Riyadh Tours</Link>
                </li>
                <li>
                  <Link href="/">Jeddah Tours</Link>
                </li>
                <li>
                  <Link href="/">Red Sea</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="col-6 col-md-2">
              <h6 className={`fw-bold mb-3 ${philosopher.className}`}>Categories</h6>
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
            </div>

            {/* Support */}
            <div className="col-6 col-md-3">
              <h6 className={`fw-bold mb-3 ${philosopher.className}`}>Support</h6>
              <ul className={styles.footerList}>
                {/* <li><a href="#">Help Center</a></li>
              <li><a href="#">Cancellation Policy</a></li> */}
                <li>
                  <Link href="/terms-and-conditions">Terms and Conditions</Link>
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

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className="container d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 py-3">
            <p className="small text-secondary mb-0">
              © {new Date().getFullYear()} Rihlat. All rights reserved.
            </p>

            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook" className={styles.social}>
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className={styles.social}>
                <FaInstagram />
              </a>
              <a href="#" aria-label="TwitterX" className={styles.social}>
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* <footer className={styles.footerWrapper}>
      <div className={`container ${styles.footerContent}`}>
       
        <div className="row mb-5">
          <div className="col-lg-4 col-md-6 mb-4">
           
            <div className={styles.footerLogo}>
              <Image
                height={100}
                width={350}
                src="/images/logoo.png"
                alt="kashta"
                className="img-fluid"
              />
             
            </div>

            <p className={styles.text}>
              Travel, based in the Jeddah, is committed to helping pilgrims every
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

        
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className={styles.heading}>Contact Info</h5>
            <div className={styles.contactItem}>
              <div>
                <FaLocationPin />
              </div>
              <div>
                Jeddah, Saudia Arabia
              </div>
            </div>
            <div className={styles.contactItem}>
              <div>
                <FaPhone />
              </div>
              <div>
              
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
                
                <a
                  href="mailto:info@example.com"
                  className="text-decoration-none text-white"
                >
                  info@kashta.com
                </a>
              </div>
            </div>
          </div>

        
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
             
              <li>
                <Link href="/faqs" className="text-white">
                  <FaAngleRight /> Faqs
                </Link>
              </li>
            </ul>
          </div>
        </div>

      
        <hr />
       
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
    </footer> */}
    </>
  );
}
