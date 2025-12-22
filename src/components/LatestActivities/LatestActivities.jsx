"use client";
import React, { useState, useEffect } from "react";
import { Skeleton, Group, Text } from "@mantine/core";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import styles from "./LatestExcursions.module.css";
import moment from "moment/moment";
import PriceDisplay from "../Currency/PriceDisplay";
import { FaLocationDot } from "react-icons/fa6";
function LatestActivities() {
  const [isLoading, setIsLoading] = useState(true);
  const [activityList, setActivityList] = useState([]);

  const date = moment().add(1, "day").format("YYYY-MM-DD");

  useEffect(() => {
    async function getActivities() {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          date,
        });

        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/api/activities/search?${params.toString()}`,
          {
            cache: "no-store",
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const response = await res.json();
        console.log("Activities Response:", response);

        if (response?.Success) {
          setActivityList(response.Content?.activities || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    if (date) {
      getActivities();
    }
  }, [date]);

  return (
    <>
      {isLoading ? (
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <Skeleton height={30} width={200} mx="auto" mb="sm" />
              <Skeleton height={20} width={400} mx="auto" />
            </div>
          </div>

          <div className="row">
            {[...Array(3)].map((_, ind) => (
              <div className="col-lg-4 col-md-6 mb-4" key={ind}>
                <div className={styles.card}>
                  <Skeleton height={200} className={styles.imageWrap} />
                  <div className={styles.cardBody}>
                    <Skeleton height={25} width="60%" mb="sm" />
                    <Skeleton height={20} width="40%" mb="sm" />
                    <Skeleton height={15} width="80%" mb="sm" />
                    <Skeleton height={15} width="90%" mb="sm" />
                    <div className={styles.cardFooter}>
                      <Skeleton height={30} width="50%" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : activityList.length > 0 ? (
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col text-center">
              <h2 className={styles.sectionTitle}>Latest Excursions</h2>
              <p className={styles.sectionDesc}>
                Discover our most popular and recently added excursions
              </p>
            </div>
          </div>

          <div className="row">
            {activityList.map((item, ind) => (
              <div className="col-lg-4 col-md-6 mb-4" key={ind}>
                <div className={styles.card}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={item?.featured_image}
                      alt={item.title}
                      width={400}
                      height={280}
                      className="w-100 h-auto"
                    />
                    <span className={styles.badge}>
                      Duration: {item?.activity_duration}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className="d-flex justify-content-between">
                      <h5>{item?.title}</h5>
                      <p>
                        {Array.from({ length: 5 }).map((_, index) => {
                          const rating = Number(item.rating_stars);
                          const fullStars = Math.floor(rating);
                          const hasHalfStar = rating - fullStars >= 0.5;

                          if (index < fullStars)
                            return (
                              <FaStar
                                key={index}
                                className="text-warning me-1"
                              />
                            );
                          if (index === fullStars && hasHalfStar)
                            return (
                              <FaStarHalfAlt
                                key={index}
                                className="text-warning me-1"
                              />
                            );
                          return (
                            <FaRegStar
                              key={index}
                              className="text-warning me-1"
                            />
                          );
                        })}
                      </p>
                    </div>
                    <small className="text-success">
                      <FaLocationDot /> {item?.address}
                    </small>
                    <p>{item?.content_text}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.price}>
                        From{" "}
                        <PriceDisplay
                          price={item?.sale_price}
                          currency={item?.currency_code}
                        />{" "}
                        <sub>pp</sub>
                      </span>
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
      ) : null}
    </>
  );
}

export default LatestActivities;
