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
              Why Travelers Choose Kashta
            </h2>

            <div className={styles.whyChooseList}>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Carefully selected tours and activities led by licensed local guides</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Flexible booking options with free cancellation up to 24 hours before departure</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Dedicated customer support available before and during your trip</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Transparent pricing with a best-value guarantee</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Secure online payments with instant booking confirmation</span>
              </div>

              <div className={styles.whyChooseListItem}>
                <IoMdCheckmarkCircleOutline className={styles.whyChooseCheckIcon} />
                <span>Small-group and private experiences for comfort and personalization</span>
              </div>

            </div>

            <Link href="/activities" className={`btn btn-lg mt-4 text-light ${styles.exploreBtn}`}>
              Explore Activities
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
