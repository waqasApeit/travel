import React from 'react'
import styles from '../ContactUs.module.css'
import { FaComments } from "react-icons/fa";
function Faqs() {
  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-4">
              <div className={styles.iconAccent}>
                <FaComments />
              </div>
              <h2 className={styles.heading}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>How do I book a tour?</h5>
              <p>
                Simply browse our tours, select your preferred date and number
                of travelers, and click “Book Now”. You’ll receive instant
                confirmation via email.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>What is your cancellation policy?</h5>
              <p>
                We offer free cancellation up to 24 hours before your scheduled
                tour. After that, a 50% fee applies. No-shows are non-refundable.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>Are your tours suitable for children?</h5>
              <p>
                Many of our tours are family-friendly! Check each tour’s
                description for age recommendations and requirements.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>What if I have special requirements?</h5>
              <p>
                Contact us before booking, and we’ll do our best to accommodate
                dietary restrictions, accessibility needs, or other special
                requests.
              </p>
            </div> 
    </>
  )
}

export default Faqs
