"use client";
import React, { useState, useEffect } from "react";
import { Philosopher } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import styles from "./SimilarActivity.module.css";

const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});

function SimilarActivity({ city, currentSlug }) {
  console.log(city);

  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilarActivities() {
      setIsLoading(true);
      try {
        const CITY = city ? city : "";
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities/search?city=${CITY}`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const response = await res.json();
        if (response.Success) {
          const allActivities = response?.Content?.activities || [];
          const filteredActivities = currentSlug
            ? allActivities.filter((activity) => activity.slug !== currentSlug)
            : allActivities;
          setActivities(filteredActivities.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching similar activities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSimilarActivities();
  }, [city, currentSlug]);

  if (isLoading) {
    return (
      <section id="similaractivity" className="mb-5 mt-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h5 className={`mb-2 fw-bold ${philosopher.className}`}>
                Similar Activities
              </h5>
              <p className="small text-muted mb-4">
                Explore more exciting experiences
              </p>
            </div>
          </div>
          <div className="row">
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-lg-4 col-md-6 mb-4">
                <div className={styles.skeletonCard}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonBody}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonText}></div>
                    <div className={styles.skeletonPrice}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!activities || activities.length === 0) {
    return null;
  }

  console.log(activities);

  return (
    <section id="similaractivity" className="mb-5 mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className={`mb-2 fw-bold ${philosopher.className}`}>
              Similar Activities
            </h4>
            <p className="small text-muted mb-4">
              Explore more exciting experiences
            </p>
          </div>
        </div>

        <div className="row">
          {activities.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={item?.featured_image}
                    alt={item?.title || "Activity"}
                    width={400}
                    height={280}
                    className="w-100 h-auto"
                  />
                  {item?.activity_duration && (
                    <span className={styles.badge}>
                      Duration: {item.activity_duration}
                    </span>
                  )}
                </div>

                <div className="d-flex align-items-center gap-1 text-muted small mt-2 ms-2">
                  <FaMapMarkerAlt size={12} />
                  <span>{item?.address}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className={philosopher.className}>
                      <Link
                        href={`/activities/${item.slug}`}
                        className="text-dark text-decoration-none"
                      >
                        {item?.title}
                      </Link>
                    </h5>
                    <div>
                      {Array.from({ length: 5 }).map((_, starIndex) => {
                        const rating = Number(item.rating_stars);
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating - fullStars >= 0.5;

                        if (starIndex < fullStars)
                          return (
                            <FaStar
                              key={starIndex}
                              className="text-danger me-1"
                              size={14}
                            />
                          );
                        if (starIndex === fullStars && hasHalfStar)
                          return (
                            <FaStarHalfAlt
                              key={starIndex}
                              className="text-danger me-1"
                              size={14}
                            />
                          );
                        return (
                          <FaRegStar
                            key={starIndex}
                            className="text-danger me-1"
                            size={14}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-2 mb-2">
                    <p className="text-muted small mb-0 two-line-text">
                      {item?.content_text}
                     
                    </p>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.price}>
                      From{" "}
                      <PriceDisplay
                        price={item?.sale_price}
                        currency={item?.currency_code}
                      />{" "}
                      <sub>pp</sub>
                    </span>
                  </div>

                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "11px" }}
                  >
                    Inclusive of VAT and Taxes
                  </small>

                  <div className="mt-3 w-100">
                    <Link
                      href={`/activities/${item.slug}`}
                      className={styles.btn}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
}

export default SimilarActivity;
