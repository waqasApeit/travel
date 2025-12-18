"use client";

import React, { useEffect, useState } from "react";
import styles from "./FlightSearchLoader.module.css";

export default function FlightListingFullLoader() {
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


                    <svg
                        className={styles.airplane}
                        viewBox="0 0 32 32"
                        width="30px" height="30px"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffffbe"
                    >
                        <path d="M9.123 30.464l-1.33-6.268-6.318-1.397 1.291-2.475 5.785-0.316c0.297-0.386 0.96-1.234 1.374-1.648l5.271-5.271-10.989-5.388 2.782-2.782 13.932 2.444 4.933-4.933c0.585-0.585 1.496-0.894 2.634-0.894 0.776 0 1.395 0.143 1.421 0.149l0.3 0.070 0.089 0.295c0.469 1.55 0.187 3.298-0.67 4.155l-4.956 4.956 2.434 13.875-2.782 2.782-5.367-10.945-4.923 4.924c-0.518 0.517-1.623 1.536-2.033 1.912l-0.431 5.425-2.449 1.329zM3.065 22.059l5.63 1.244 1.176 5.544 0.685-0.372 0.418-5.268 0.155-0.142c0.016-0.014 1.542-1.409 2.153-2.020l5.978-5.979 5.367 10.945 1.334-1.335-2.434-13.876 5.349-5.348c0.464-0.464 0.745-1.598 0.484-2.783-0.216-0.032-0.526-0.066-0.87-0.066-0.593 0-1.399 0.101-1.881 0.582l-5.325 5.325-13.933-2.444-1.335 1.334 10.989 5.388-6.326 6.326c-0.483 0.482-1.418 1.722-1.428 1.734l-0.149 0.198-5.672 0.31-0.366 0.702z" />
                    </svg>

                </div>

                {/* Title */}
                <h2 className={styles.title}>Searching Flights</h2>

                {/* Bouncing Dots */}
                <div className={`d-flex justify-content-center gap-2 ${styles.dotsRow}`}>
                    <div className={styles.dot1}></div>
                    <div className={styles.dot2}></div>
                    <div className={styles.dot3}></div>
                </div>

                {/* Messages */}
                <div className="mt-3">
                    <LoadingMessage />
                </div>

                <p className={styles.subtitle}>Finding the best deals for you</p>

                <div className={styles.bottomGlow}></div>
            </div>
        </div>
    );
}

function LoadingMessage() {
    const messages = [
        "Comparing airlines...",
        "Checking prices...",
        "Finding routes...",
        "Almost there..."
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return <div className={styles.message}>{messages[index]}</div>;
}
