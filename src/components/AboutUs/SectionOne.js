import React from 'react'
import styles from './about.module.css'
import Image from 'next/image'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Link from 'next/link';
export default function SectionOne() {
  return (
    <>
  <section className={styles.sectionSpacing}>
      <div className="container">
        <div className="row align-items-center gy-5">
          <div className="col-lg-6">
            <h2 className={`fw-bold ${styles.whyChooseHeading}`}>
              Why Travelers Choose Explore
            </h2>

            <div className={styles.whyChooseList}>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Handpicked tours with verified 4.5+ star ratings</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Flexible booking with free cancellation up to 24 hours</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>24/7 customer support in multiple languages</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Best price guarantee – we'll match any lower price</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Secure payments and instant booking confirmation</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Small group sizes for personalized experiences</span>
              </div>

            </div>

            <Link href="/tours" className={`btn btn-lg mt-4 text-light ${styles.exploreBtn}`}>
              Explore Tours
            </Link>
          </div>

          <div className="col-lg-6 position-relative">
            <div className={styles.whyChooseImageWrapper}>
              <Image
              src="/images/about2.jpg"  
            alt="Travel Experience"
                width={700}
            height={480}
            className="w-100 h-auto"
              />
            </div>
           
          </div>

        </div>
      </div>
    </section>
    </>
  )
}
