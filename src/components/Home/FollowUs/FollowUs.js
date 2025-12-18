'use client'
import React from 'react'
import styles from './FolloeUs.module.css'
import { FaInstagram } from "react-icons/fa";
export default function FollowUs() {
     const instagramURL = "https://www.instagram.com/alhijaz.tours"; 
    return (
        <div className='container-fluid'>
            <div className={styles.followusWrapper}>
                <div className={styles.TopHeading}>
                    <span>Our Gallery</span>
                    <h2>Follow Us @alhijaz.tours</h2>
                </div>
                <div className='row w-100  justify-content-center align-items-center'>
                    <div className='col-lg-2  mb-3'>
                        <div className='position-relative'>
                            <div className={styles.imageWrapper}>
                                <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_1.jpg' alt='follow us image' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-2 mb-3'>
                        <div className='position-relative'>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_2.jpg' alt='follow us image' />
                            </div>
                        </div>
                        <div className='position-relative mt-3'>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_3.jpg' alt='follow us image' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 mb-3'>
                        <div className='position-relative'>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_4.jpg' alt='follow us image' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-2 mb-3'>
                        <div className='position-relative'>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_5.jpg' alt='follow us image' />
                            </div>
                        </div>
                        <div className='position-relative mt-3'>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_6.jpg' alt='follow us image' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-2 mb-3'>
                        <div className='position-relative '>
                            <div className={styles.imageWrapper}>
                                 <FaInstagram  onClick={() => window.open(instagramURL, "_blank")} className={styles.iconOverlay} />
                                <img src='https://html.themehour.net/tawba/demo/assets/img/gallery/gallery_1_7.jpg' alt='follow us image' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
