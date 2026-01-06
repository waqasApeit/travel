"use client";
import React from "react";
import styles from "./HajjCountdown.module.css";
import Image from "next/image";
import {FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function HajjCountdown() {
  
  return (
    <div className={styles.hajjCountdownWrapper}>
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE 1 */}
          <div className="col-lg-6 col-12 mb-3">
            <div className={styles.hajjimgWrapper}>
              <Image
                src="/images/home/hajj.png"
                quality={100}
                alt="Hajj"
                className="w-100 object-fit-cover"
                width={600}
                height={600}
              />
            </div>
          </div>

          {/* COUNTDOWN */}
          <div className="col-lg-6 mb-3">
            <div className={styles.countdownTimerWrapper}>
              <h2 className="mb-3">Step Into Hajj 2026</h2>
              <p className="text-muted text-justify">We are pleased to offer our well-planned Hajj packages and trusted Hajj or Umrah services for Hajj 2026 (1447 AH). Kashta Travels partners with top Saudi companies to make sure that each pilgrim has a smooth, spiritually fulfilling, and unforgettable pilgrimage aligned with the Ministry of Hajj and Nusuk Portal guidelines.</p>
                <div className="text-center my-4">
                  <Image src='/images/home/nusk.png' alt="Nusuk Portal" className="h-auto" width={120} height={100} />
                  <Image src='/images/home/Travel2.png' alt="Nusuk Portal" className="h-auto" width={120} height={100} />
                  <Image src='/images/home/mcdc.png' alt="Nusuk Portal" className="h-auto" width={120} height={100} />
                  <Image src='/images/home/saudia.png' alt="Nusuk Portal" className="h-auto" width={120} height={100} />
                </div>
              <div className="d-flex justify-content-between align-items-center">
                <a href="https://chat.whatsapp.com/KxHdDufeefjJxW3nXjDVnV?mode=ems_wa_t" target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-warning px-3"><FaWhatsapp /> JOIN HAJJ WHATSAPP GROUP</button>
                </a>
                <a href="https://t.me/+tF5MQ2KCCCU1Y2Zk" target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-warning px-3"><FaTelegram /> JOIN HAJJ TELEGRAM CHANNEL</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
