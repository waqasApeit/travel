import React from 'react'
import styles from './IslamPillers.module.css'
import { FaBus, FaHeadphones, FaHotel, FaKaaba } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { VscWorkspaceTrusted } from "react-icons/vsc";

export default function IslamPillers() {
    return (
        <div>
            <section className={styles.pillarsSection}>
                <div className={styles.overlay}></div>

                <div className="container text-center py-5">

                    <h6 className={styles.pillarsSubtitle}>Our Commitment to Excellence and Care</h6>
                    <h2 className={styles.pillarsTitle}>Why Pilgrims Trust Us</h2>

                    <div className={`row justify-content-center mt-5 ${styles.pillarsRow}`}>

                        <div className="col-lg-2 col-md-3 col-6 mb-4">
                            <div className={styles.pillarItem}>
                                <div className={styles.pillarCircle}>
                                    <VscWorkspaceTrusted size={40}/>
                                </div>
                                <h5 className={styles.pillarTitle}>Trusted Agency</h5>
                                <p className={styles.pillarText}>(Certified)</p>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-6 mb-4">
                            <div className={styles.pillarItem}>
                                <div className={styles.pillarCircle}>
                                    <FaHotel size={40}/>
                                </div>
                                <h5 className={styles.pillarTitle}>Premium Hotels</h5>
                                <p className={styles.pillarText}>(Comfort)</p>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-6 mb-4">
                            <div className={styles.pillarItem}>
                                <div className={styles.pillarCircle}>
                                    <IoMdPerson size={40}/>
                                </div>
                                <h5 className={styles.pillarTitle}>Expert Guidance</h5>
                                <p className={styles.pillarText}>(Support)</p>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-6 mb-4">
                            <div className={styles.pillarItem}>
                                <div className={styles.pillarCircle}>
                                    <FaBus size={40}/>
                                </div>
                                <h5 className={styles.pillarTitle}>Clear Pricing</h5>
                                <p className={styles.pillarText}>(Honesty)</p>
                            </div>
                        </div>

                        <div className="col-lg-2 col-md-3 col-6 mb-4">
                            <div className={styles.pillarItem}>
                                <div className={styles.pillarCircle}>
                                    <FaHeadphones size={40}/>
                                </div>
                                <h5 className={styles.pillarTitle}>Customer Support</h5>
                                <p className={styles.pillarText}>(24/7)</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}
