'use client'
import React, { useState, useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { MdFilterListAlt } from "react-icons/md";
// import { Checkbox, RangeSlider } from "@mantine/core";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import Link from "next/link";
import ActivityListingLoader from "@/components/Loader/ActivityListingLoader";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { Spoiler } from '@mantine/core';
import ActivityPaggination from "./ActivityPaggination";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import Filter from "./Filter";
function Main() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activityResponse, setActivityResponse] = useState({});
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    async function getActivities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/search?${searchParams}`,
          { cache: 'no-store', 
             headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
           }
        );
        const response = await res.json();
        // console.log('Activities Response:', response);
        setIsLoading(false)
        if (response.Success) {
          // console.log(response);
          setActivityResponse(response?.Content);
          setActivityList(response?.Content?.activities)
        }
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }
    }
    getActivities();
  }, [searchParams]);
  return (
    <>
      <section className="page-title-section activity-bg-page text-center d-flex align-items-center justify-content-center">
        <div className="page-title-overlay"></div>
        <div className="container">
          <h1 className="text-white fw-bold">
            {isLoading ? 'Searching Activities...' : activityList.length > 0 ? `${activityList.length} ${activityList.length > 1 ? 'Activities' : 'Activity'} Found` : 'No Activities Found'}
          </h1>
        </div>
      </section>
      <div className="container my-5">
        <div className="row">

          <div className="col-xl-3 col-md-9 col-sm-12 col-12">
            <Filter />
          </div>
          <div className="col-xl-9 col-md-9 col-sm-12 col-12">
            <div className="container hotel-card">
              {isLoading ? (
                <ActivityListingLoader />
              ) : (
                <div className="row">
                  {activityList.map((item, index) => (
                    <div className="col-12 col-lg-12 mb-4" key={index}>
                      <div className="card shadow-sm border-0">
                        <div className="row g-0 position-relative">
                          {/* Hotel Image Section */}
                          <div className="col-md-4 position-relative">
                            <Image
                              src={item?.featured_image}
                              width={400}
                              height={250}
                              className="img-fluid rounded h-100 object-fit-cover"
                              alt={item.title}
                            />

                            <span
                              className="badge bg-success position-absolute top-0 end-0 m-2"
                              style={{ zIndex: 1 }}
                            >
                              Duration: {item?.activity_duration}
                            </span>
                          </div>

                          <div className="col-md-8">
                            <div className="card-body">
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div>
                                  {Array.from({ length: 5 }).map((_, index) => {
                                    const rating = Number(item.rating_stars);
                                    const fullStars = Math.floor(rating);
                                    const hasHalfStar = rating - fullStars >= 0.5;

                                    if (index < fullStars) {
                                      // Full star
                                      return <FaStar key={index} className="text-warning me-1" />;
                                    } else if (index === fullStars && hasHalfStar) {
                                      // Half star
                                      return <FaStarHalfAlt key={index} className="text-warning me-1" />;
                                    } else {
                                      // Empty star
                                      return <FaRegStar key={index} className="text-warning me-1" />;
                                    }
                                  })}
                                </div>
                                <span className="badge bg-secondary p-2 mt-2 mt-md-0">
                                  {moment(item.start_date).format("DD-MM-YYYY")} <FaArrowRightLong />{" "}
                                  {moment(item.end_date).format("DD-MM-YYYY")}
                                </span>
                              </div>

                              {/* Name & Address */}
                              <h5 className="card-title mt-2">{item.title}</h5>
                              <p className="card-text text-muted mb-2">
                                <IoLocationSharp className="text-success" />{" "}
                                {item.address}
                              </p>

                              {/* description*/}
                              <div className="">
                                <div className="bg-light text-dark  me-2 mb-2 p-2">
                                  <Spoiler className="mb-0" maxHeight={55}>{item?.content_text}</Spoiler>
                                </div>
                              </div>

                              {/* Price & Button */}
                              <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <div className="mb-2 mb-md-0">
                                  <span className="fw-bold">
                                    From <PriceDisplay price={item?.sale_price} currency={item?.currency_code} /> <sub>pp</sub>
                                  </span>

                                  <small
                                    className="text-muted d-block"
                                    style={{ fontSize: "11px" }}
                                  >
                                    Inclusive of VAT and Taxes
                                  </small>
                                </div>
                                <Link href={`/activities/${item.slug}`}>
                                  <button className="btn btn-success">
                                    View Details
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {activityResponse?.pagination?.total > 1 && (
            <ActivityPaggination pdata={activityResponse?.pagination} />
          )}
        </div>
      </div>
    </>
  );
}

export default Main;
