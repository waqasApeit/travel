import React from 'react'
import styles from './about.module.css';
import Image from 'next/image';
import { BiSupport } from "react-icons/bi";
import { LuPackage2 } from "react-icons/lu";
import { IoPricetagOutline } from "react-icons/io5";
export default function SectionThree() {
    return (
        // <div className={styles.sectionOneWrapper}>
        //     <div className='container'>
        //         <div>
        //             <p className='text-muted h5'>Committed to Supporting Pilgrims Every Step</p>
        //             <h1>The Journey of Kashta Travels</h1>
        //         </div>
        //         <div className='row mt-5'>
        //             <div className='col-lg-7'>
        //                 <div className={`position-relative ${styles.sectionThreeImgHeading}`}>
        //                     <h4><span>Established in</span> 2005</h4>
        //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/ibadat-islamic-1.jpg" alt="Image" height={450} width={600} quality={100} className="object-fit-cover w-100 rounded" />
        //                     <Image src="https://winsfolio.net/html/ibadah/assets/img/ibadat-islamic-2.jpg" alt="Image" height={300} width={300} className={`${styles.sectionThreeImg}`} />
        //                 </div>
        //             </div>
        //             <div className='col-lg-5'>
        //                 <div className={styles.sectionThreeContent}>
        //                     <h4>About Us</h4>
        //                     <p className='text-justify'>
        //                         Kashta Travels is one of the most trusted travel agencies that offers affordable Umrah package options from the UK. Our carefully designed umrah tours from the UK guarantee a convenient and spiritually fulfilling journey. With experienced umrah guides and easy-to-book websites through which you can explore packages without compromising quality and service.
        //                     </p>
        //                     <h4>Our Mission</h4>
        //                     <ul className="ps-0 ms-0">
        //                         <li>Make journeys that are memorable and lasting</li>
        //                         <li>Offer guidance at every stage of the journey</li>
        //                         <li>Make the reservation process easy and simple</li>
        //                         <li>Ensure comfort and safety throughout the journey</li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <>
      <div className="container mt-4">
  <div className={styles.aboutImageBox}>
    <div className="row d-flex align-items-center justify-content-between">
      
      <div className="col-lg-6 ps-4" data-aos="fade-up">
        <div className={`${styles.aboutContent} text-center text-lg-start`}>
          
          <h4 className="d-inline-block mb-0">Get To Know Us</h4>

          <h2 className={`${styles.borderB} mb-2 pb-1`}>
            Explore All Tour of the world with us.
          </h2>

          <p className={`${styles.borderB} mb-2 pb-5`}>
            At Kashta Travels, we believe travel is more than just visiting places —
            it’s about creating unforgettable experiences, embracing new cultures,
            and making memories that last a lifetime.
            <br />
            <br />
            From breathtaking landscapes and vibrant cities to hidden gems off the
            beaten path, our carefully designed tour packages are crafted to suit
            every traveler’s dream.
          </p>

          <div className={styles.aboutListing}>
            <ul className="d-flex justify-content-between list-unstyled">
              <li>
                <BiSupport /> Tour Guide
              </li>
              <li>
                <IoPricetagOutline /> Friendly Price
              </li>
              <li>
                <LuPackage2 /> Reliable Tour Package
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="col-lg-6 mb-4 pe-4">
        <div className={styles.aboutImage}>
          <Image
            src="/images/about/about1.png"
            alt="image"
            height={800}
            width={800}
            className="h-100 w-100"
          />
        </div>
      </div>

    </div>
  </div>
</div>
        </>
    )
}
