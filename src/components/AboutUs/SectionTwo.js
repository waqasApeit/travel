import React from "react";
import styles from "./about.module.css";
import Image from "next/image";
import { CiFlag1 } from "react-icons/ci";
export default function SectionTwo() {
  return (
    // <div className={styles.sectionOneWrapper}>
    //     <div className='container'>
    //         <div className={styles.sectionTwoHeading}>
    //             <p className='text-muted'> Making every Hajj and Umrah journey meaningful and memorable</p>
    //             <h1 className='fw-bold'>Why Pilgrims Choose<br/> Al Hijaz Tours</h1>
    //         </div>
    //         <div className='row align-items-center mt-5'>
    //             <div className='col-lg-3 mb-3'>
    //                 <div className={styles.sectionTwoServices}>
    //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/service-icon-1.png" alt="Service" height={90} width={90} />
    //                     <h5 className='mt-3'>Pilgrimage Plans</h5>
    //                     <p className='text-muted'>Designed Umrah and Hajj trips for your comfort and needs.</p>
    //                 </div>
    //                 <div className={styles.sectionTwoServices}>
    //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/service-icon-2.png" alt="Service" height={90} width={90} />
    //                     <h5 className='mt-3'>Expert Guidance</h5>
    //                     <p className='text-muted'>Experienced guides for support and advice.</p>
    //                 </div>
    //             </div>
    //             <div className='col-lg-6 mb-3'>
    //                 <div className={styles.sectionTwoServicesImg}>
    //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/video-img.jpg" alt="Why Choose Us" height={700} width={600} className='img-fluid rounded' />
    //                 </div>
    //             </div>
    //             <div className='col-lg-3 mb-3'>
    //                 <div className={styles.sectionTwoServices}>
    //                    <Image src="https://winsfolio.net/html/ibadah/assets/img/service-icon-1.png" alt="Service" height={90} width={90} />
    //                     <h5 className='mt-3'>Travel Arrangements</h5>
    //                     <p className='text-muted'>Flights, hotels and transfers handled carefully.</p>
    //                 </div>
    //                 <div className={styles.sectionTwoServices}>
    //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/service-icon-2.png" alt="Service" height={90} width={90} />
    //                     <h5 className='mt-3'>Spiritual Experiences</h5>
    //                     <p className='text-muted'>Meaningful experiences that enrich your pilgrimage journey.</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <>
      <section className={`${styles.aboutUs} pb-6 pt-10`}>
        <div className="container">
          <div
            className={`${styles.sectionTitle} mb-6 w-50 mx-auto text-center`}
          >
            <h4 className="mb-1">Core Features</h4>
            <h2 className="mb-1">
              Find <span className="theme">Travel Perfection</span>
            </h2>
            <p>Convenient and Easy Tour Booking Process.</p>
          </div>

          <div className="why-us mt-5">
            <div className="why-us-box">
              <div className="row">
                {/** Card */}
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div
                    className={`${styles.whyUsItem} p-5 pt-6 pb-6 border rounded bg-white shadow`}
                  >
                    <div className={styles.whyUsContent}>
                      <h4>
                        <a href="about.html">Tell Us What You want To Do</a>
                      </h4>
                      <p className="mb-2">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa.
                      </p>
                      <p className={`${styles.reviewText} mb-0`}>
                        100+ Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div
                    className={`${styles.whyUsItem} p-5 pt-6 pb-6 border rounded bg-white shadow`}
                  >
                    <div className={styles.whyUsContent}>
                      <h4>
                        <a href="about.html">Share Your Travel Locations</a>
                      </h4>
                      <p className="mb-2">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa.
                      </p>
                      <p className={`${styles.reviewText} mb-0`}>
                        100+ Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div
                    className={`${styles.whyUsItem} p-5 pt-6 pb-6 border rounded bg-white shadow`}
                  >
                    <div className={styles.whyUsContent}>
                      <h4>
                        <a href="about.html">Share Your Travel Preference</a>
                      </h4>
                      <p className="mb-2">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa.
                      </p>
                      <p className={`${styles.reviewText} mb-0`}>
                        100+ Reviews
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
                  <div
                    className={`${styles.whyUsItem} p-5 pt-6 pb-6 border rounded bg-white shadow`}
                  >
                    <div className={styles.whyUsContent}>
                      <h4>
                        <a href="about.html"> 100% Trusted Tour Agency</a>
                      </h4>
                      <p className="mb-2">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa.
                      </p>
                      <p className={`${styles.reviewText} mb-0`}>
                        100+ Reviews
                      </p>
                    </div>
                  </div>
                </div>

                {/** Repeat for other cards (icons + text only) */}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.whiteOverlay}></div>
      </section>
    </>
  );
}
