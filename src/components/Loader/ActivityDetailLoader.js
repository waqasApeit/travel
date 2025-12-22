"use client";

import styles from "./FlightSearchLoader.module.css";

export default function ActivityDetailLoader() {
    return (
        <div className={styles.loaderWrapper}>
            {/* Background Orbs */}
            <div className={styles.orb1}></div>
            <div className={styles.orb2}></div>

            {/* Content */}
            <div className={`text-center ${styles.content}`}>
                {/* Airplane + Rings */}
                <div className={styles.airplaneContainer}>
                    <div className={styles.outerRing}></div>
                    <div className={styles.middleRing}></div>


                    {/* <h4>Travel</h4> */}

                </div>

                {/* Title */}
                <h2 className={styles.title}>Loading Activity Details</h2>

                {/* Bouncing Dots */}
                <div className={`d-flex justify-content-center gap-2 ${styles.dotsRow}`}>
                    <div className={styles.dot1}></div>
                    <div className={styles.dot2}></div>
                    <div className={styles.dot3}></div>
                </div>
                {/* <div className={styles.bottomGlow}></div> */}
            </div>
        </div>
    );
}

