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
              <h5 className={styles.faqheading}>How do I book a tour or experience?</h5>
              <p>
                Browse our carefully curated tours, select your preferred date and number of travelers, and click “Book Now.” You’ll receive instant confirmation by email.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>What is your cancellation policy?</h5>
              <p>
               We offer free cancellation up to 24 hours before most tours. After that, a 50% fee may apply. Please check individual tour policies for details.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>Are your tours suitable for families and children?</h5>
              <p>
                Yes! Many experiences are family-friendly. Each tour page provides age guidelines, safety information, and recommendations.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>Can you accommodate special requests?</h5>
              <p>
                Yes. Whether you have dietary requirements, accessibility needs, or other special considerations, contact us before booking — we’ll do our best to tailor your experience.
              </p>
            </div>  
            {/* <div className={styles.faqItem}>
              <h5 className={styles.faqheading}>Do you provide private or custom tours?</h5>
              <p>
                Absolutely. We specialize in private and personalized tours, ensuring a flexible itinerary that matches your interests, pace, and travel style.
              </p>
            </div>  */}
    </>
  )
}

export default Faqs
