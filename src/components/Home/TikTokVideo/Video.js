'use client'
import React from 'react';
import styles from './Video.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination , Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function Video() {
    return (
        <div>
            
            <section className={styles.VideoSection}>
                <div className={styles.overlay}></div>
                <div className="container text-center pt-5">
                    <h6 className={styles.videoSubtitle}>Our commitment to excellence and care</h6>
                    <h2 className={styles.videoTitle}>Watch Our Latest Videos</h2>
                    <div className={styles.videoNavButtons}>
                        <button className={`${styles.customprev} custom-prev`}><FaArrowLeft/></button>
                        <button className={`${styles.customnext} custom-next ms-2`}><FaArrowRight/></button>
                    </div>
                    <Swiper
                        modules={[Pagination , Navigation ]}
                        spaceBetween={0}
                        slidesPerView={4}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                          navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        breakpoints={{
                            576: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 4,
                            },
                        }}
                        className={`${styles.heroSwiper} videoSwiper`}
                    >
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/OkveyZTihgs?controls=1&modestbranding=1&rel=0&loop=1&playlist=OkveyZTihgs`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/2GfE30JbCSQ?controls=1&modestbranding=1&rel=0&loop=1&playlist=2GfE30JbCSQ`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/WBsO2Y9R8wM?controls=1&modestbranding=1&rel=0&loop=1&playlist=WBsO2Y9R8wM`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/13fMRz_eyxY?controls=1&modestbranding=1&rel=0&loop=1&playlist=13fMRz_eyxY`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/WBsO2Y9R8wM?controls=1&modestbranding=1&rel=0&loop=1&playlist=WBsO2Y9R8wM`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                        <SwiperSlide className={styles.heroSlide}>
                            <iframe
                                width="300"
                                height="500"
                                className='rounded'
                                src={`https://www.youtube.com/embed/13fMRz_eyxY?controls=1&modestbranding=1&rel=0&loop=1&playlist=13fMRz_eyxY`}
                                title="YouTube Shorts"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </div>
    );
}
