import React from 'react'
import styles from './about.module.css'
import Image from 'next/image'
import { FiArrowUpRight } from "react-icons/fi";
import Link from 'next/link';
export default function SectionOne() {
  return (
    // <div className={styles.sectionOneWrapper}>
    //     <div className='container'>
    //         <div className={styles.sectionOneInner}>
    //             <h2 className={styles.sectionOneHeading}>Join Us on Your Journey</h2>
    //             <p className={styles.sectionOnePara}>At Kashta Travels, we are dedicated to providing each pilgrim with compassionate care and comfort.<br/> Explore our Hajj or Umrah packages to book easily and have a memorable pilgrimage experience.</p>
    //             <div  className={styles.sectionOneImgWrapper}>
    //                 <Image src="/images/about/img1.jpg" alt="Mission Image" height={100} width={100} />
    //                 <Image src="/images/about/img2.jpg" alt="Mission Image" height={100} width={100} />
    //                 <Image src="/images/about/img3.jpg" alt="Mission Image" height={100} width={100} />
    //                 <Image src="/images/about/img4.jpg" alt="Mission Image" height={100} width={100} />
    //             </div>
    //         </div>
    //     </div>
    // </div>
    <>

<section className={styles.wrapper}>
  <div className="container">
    <div className="row align-items-center">

      {/* LEFT CONTENT */}
      <div className="col-lg-6 mb-4 mb-lg-0">
        <h2 className={styles.heading}>
          Travel With Confidence <br />
          Top Reasons To Choose <br />
          Our Agency
        </h2>

        <p className={styles.description}>
          We work closely with our clients to understand challenges and
          objectives, providing customized solutions to enhance efficiency,
          boost profitability, and foster sustainable growth.
        </p>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <h3>3k+</h3>
            <span>Popular Destination</span>
          </div>

          <div className={styles.statItem}>
            <h3>9m+</h3>
            <span>Satisfied Clients</span>
          </div>
        </div>

        <Link href="/" className={`bg-color ${styles.ctaBtn}`}>
          Explore Destinations <FiArrowUpRight />
        </Link>
      </div>

      {/* RIGHT IMAGE */}
      <div className="col-lg-6">
        <div className={styles.imageWrap}>
          <Image
            src="/images/about2.jpg"   // replace with your image path
            alt="Travel Experience"
            width={700}
            height={480}
            className="w-100 h-auto"
            priority
          />
        </div>
      </div>

    </div>
  </div>
</section>

    </>
  )
}
