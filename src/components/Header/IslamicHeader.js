"use client";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./islamicheader.module.css";
import Link from "next/link";
import { FaPhoneAlt, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import {
  FaSun,
  FaMoon,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import CurrencySelector from "./CurrencySelector";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";

export default function IslamicHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.islamicHeaderOther}>
      <div className={`container ${styles.islamicHeaderContainer}`}>
        {/* Top Bar with Sunrise, Sunset, Location and Social Icons */}
        <div className={styles.islamicTopBar}>
          <div
            className={`${styles.islamicTopBarContent} container d-flex justify-content-between align-items-center`}
          >
            <div
              className={`${styles.islamicTopBarLeft} d-flex align-items-center gap-4`}
            >
              <div
                className={`${styles.islamicTopBarItem} d-none d-md-flex align-items-center gap-2`}
              >
                <a
                  href="tel:+921112223333"
                  className={`${styles.islamicTopBarItem} d-none d-md-flex align-items-center gap-2`}
                >
                  <FaPhoneAlt className={styles.islamicTopBarIcon} />
                  <span className={styles.islamicTopBarText}>
                    +92 111 222 33333
                  </span>
                </a>
              </div>
            </div>
            <div
              className={`${styles.islamicTopBarLeft} d-flex align-items-center gap-4`}
            >
              <div
                className={`${styles.islamicTopBarItem} d-none d-md-flex align-items-center gap-2`}
              >
                <FaLocationDot className={styles.islamicTopBarIcon} />
                <span className={styles.islamicTopBarText}>
                  jeddah, Saudia Arabia
                </span>
              </div>
            </div>
            <div
              className={`${styles.islamicTopBarRight} d-flex align-items-center gap-3`}
            >
              {/* <div className={`${styles.islamicTopBarItem} ${styles.islamicLocationItem} d-none d-lg-flex align-items-center gap-2`}>
                                <FaMapMarkerAlt className={styles.islamicTopBarIcon} />
                                <span className={styles.islamicTopBarText}>693a Stratford Road Birmingham B11 4DX, UK</span>
                            </div> */}
              <div className={`${styles.islamicSocialIcons} d-flex gap-2`}>
                <a href="" className={styles.islamicSocialLink}>
                  <FaFacebookF />
                </a>
                <a href="" className={styles.islamicSocialLink}>
                  <FaXTwitter />
                </a>
                <a href="" className={styles.islamicSocialLink}>
                  <FaLinkedinIn />
                </a>
                <a href="" className={styles.islamicSocialLink}>
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation Header */}
        <nav className={`${styles.islamicNavbar} navbar navbar-expand-lg`}>
          <div className="container">
            <Link
              className={`${styles.islamicNavbarBrand} navbar-brand`}
              href="/"
            >
              <div className={styles.islamicLogoWrapper}>
                <Image 
                                className={styles.islamicLogo} 
                                height={60} 
                                width={150} 
                                src='/images/logoo.png' 
                                alt="kashta" 
                                priority
                            />
                {/* <h1 className="fw-bold">Travel</h1> */}
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className={`${styles.islamicDesktopMenu} d-none d-lg-flex`}>
              <ul className={`${styles.islamicNavMenu} navbar-nav mb-0`}>
                <li className={`${styles.islamicNavItem} nav-item`}>
                  <Link
                    className={`${styles.islamicNavLink} nav-link ${
                      pathname === "/" ? styles.islamicNavLinkActive : ""
                    }`}
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                {/* <li className={`${styles.islamicNavItem} nav-item`}>
                                <Link 
                                    className={`${styles.islamicNavLink} nav-link ${pathname === '/packages' ? styles.islamicNavLinkActive : ''}`} 
                                    href="/packages"
                                >
                                    Packages
                                </Link>
                            </li> */}
                {/* <li className={`${styles.islamicNavItem} nav-item`}>
                                <Link 
                                    className={`${styles.islamicNavLink} nav-link ${pathname === '/hajj' ? styles.islamicNavLinkActive : ''}`} 
                                    href="/hajj"
                                >
                                    Hajj 2026
                                </Link>
                            </li> */}
                <li className={`${styles.islamicNavItem} nav-item`}>
                  <Link
                    className={`${styles.islamicNavLink} nav-link ${
                      pathname === "/about-us"
                        ? styles.islamicNavLinkActive
                        : ""
                    }`}
                    href="/about-us"
                  >
                    About us
                  </Link>
                </li>
                <li className={`${styles.islamicNavItem} nav-item`}>
                  <Link
                    className={`${styles.islamicNavLink} nav-link ${
                      pathname === "/activities"
                        ? styles.islamicNavLinkActive
                        : ""
                    }`}
                    href="/activities"
                  >
                    Excursions
                  </Link>
                </li>
                <li className={`${styles.islamicNavItem} nav-item`}>
                  <Link
                    className={`${styles.islamicNavLink} nav-link ${
                      pathname === "/contact-us"
                        ? styles.islamicNavLinkActive
                        : ""
                    }`}
                    href="/contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>

              <div
                className={`${styles.islamicNavActions} d-flex align-items-center gap-3`}
              >
                <a
                  href="tel:+9211122233333"
                  className={styles.islamicPhoneLink}
                >
                  <FaPhoneAlt className={styles.islamicPhoneIcon} />
                  <span className={styles.islamicPhoneText}>111 222 33333</span>
                </a>
                <CurrencySelector width="w-auto" />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`${styles.islamicMobileToggle}  d-lg-none`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div
          className={`${styles.islamicMobileMenu} ${
            isMobileMenuOpen ? styles.islamicMobileMenuOpen : ""
          }`}
        >
          <div className={styles.islamicMobileMenuHeader}>
            <Link
              className={styles.islamicMobileMenuLogo}
              href="/"
              onClick={closeMobileMenu}
            >
              <Image 
                            height={50} 
                            width={150} 
                            className="w-100"
                            src='/images/logoo.png' 
                            alt="Kashta"
                        />
              {/* <h1 className="fw-bold text-dark">Travel</h1> */}
            </Link>
            <button
              className={styles.islamicMobileMenuClose}
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <IoMdClose />
            </button>
          </div>

          <ul className={styles.islamicMobileMenuList}>
            <li className={styles.islamicMobileMenuItem}>
              <Link
                className={`${styles.islamicMobileMenuLink} ${
                  pathname === "/" ? styles.islamicMobileMenuLinkActive : ""
                }`}
                href="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            {/* <li className={styles.islamicMobileMenuItem}>
                        <Link 
                            className={`${styles.islamicMobileMenuLink} ${pathname === '/packages' ? styles.islamicMobileMenuLinkActive : ''}`} 
                            href="/packages"
                            onClick={closeMobileMenu}
                        >
                            Packages
                        </Link>
                    </li> */}
            {/* <li className={styles.islamicMobileMenuItem}>
                        <Link 
                            className={`${styles.islamicMobileMenuLink} ${pathname === '/hajj' ? styles.islamicMobileMenuLinkActive : ''}`} 
                            href="/hajj"
                            onClick={closeMobileMenu}
                        >
                            Hajj 2026
                        </Link>
                    </li> */}
            <li className={styles.islamicMobileMenuItem}>
              <Link
                className={`${styles.islamicMobileMenuLink} ${
                  pathname === "/about-us"
                    ? styles.islamicMobileMenuLinkActive
                    : ""
                }`}
                href="/about-us"
                onClick={closeMobileMenu}
              >
                About us
              </Link>
            </li>
            <li className={styles.islamicMobileMenuItem}>
              <Link
                className={`${styles.islamicMobileMenuLink} ${
                  pathname === "/activities"
                    ? styles.islamicMobileMenuLinkActive
                    : ""
                }`}
                href="/activities"
                onClick={closeMobileMenu}
              >
                Excursions
              </Link>
            </li>
            <li className={styles.islamicMobileMenuItem}>
              <Link
                className={`${styles.islamicMobileMenuLink} ${
                  pathname === "/contact-us"
                    ? styles.islamicMobileMenuLinkActive
                    : ""
                }`}
                href="/contact-us"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>

            <li className={styles.islamicMobileMenuItem}>
              <CurrencySelector width="w-100" />
            </li>
          </ul>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div
            className={styles.islamicMobileBackdrop}
            onClick={closeMobileMenu}
          ></div>
        )}
      </div>
    </div>
  );
}
