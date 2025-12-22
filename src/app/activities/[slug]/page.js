"use client";
import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { FcApproval } from "react-icons/fc";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import GalleryImages from "@/components/Activities/Detail/GalleryImages";
import "@mantine/dates/styles.css";
import WhatExpect from "@/components/Activities/Detail/WhatExpect";
import IncludedExcluded from "@/components/Activities/Detail/IncludedExcluded";
import Faqs from "@/components/Activities/Detail/Faqs";
import Availability from "@/components/Activities/Detail/Availability";
import Selection from "@/components/Activities/Detail/Selection";
import moment from "moment";
import { ThemeIcon } from "@mantine/core";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { usePathname } from "next/navigation";
import ActivityDetailLoader from "@/components/Loader/ActivityDetailLoader";

function ActivityDetail() {
  const [packageDetail, setPackageDetail] = React.useState({});
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
 useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const lastPart = pathname.split('/').filter(Boolean).pop();
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/${lastPart}`, { method: 'GET', cache: 'no-store', headers: { 'ngrok-skip-browser-warning': 'true' } });
        const response = await res.json();
        // console.log("Activity Detail", response)
        if (response.Success) {
          setPackageDetail(response?.Content?.activity || {});
          setIsLoading(false);
          // console.log("Activity Detail", PackageDetail)

        }
      } catch (error) {
        console.log("Error fetching activity detail:", error);
          setIsLoading(false);
      }

    };
    fetchData();
  }, [pathname]);

  const PackageDetail = packageDetail;
  
  if (isLoading) {
    return <ActivityDetailLoader />;
  }
  
  if (!PackageDetail || Object.keys(PackageDetail).length === 0) {
    return null;
  }

  return (
    <>
      {/* <section className="page-title-section activity-bg-page text-center d-flex align-items-center justify-content-center">
        <div className="page-title-overlay"></div>
        <div className="container">
          <h1 className="text-white fw-bold">Unforgettable Experiences Await</h1>
        </div>
      </section> */}

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8">
            <div className="carousal-images">
              <GalleryImages imageList={PackageDetail?.gallery_images || []} />
            </div>
            <section id="overview" className="mb-5 mt-4">
              <h3>{PackageDetail?.title}</h3>
              {Array.from({ length: 5 }).map((_, index) => {
                const rating = Number(PackageDetail?.rating_stars);
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
              <p className="card-text text-muted mb-2">
                <IoLocationSharp className="text-success" /> {PackageDetail?.address}
              </p>
              <div className="description">
                <div dangerouslySetInnerHTML={{ __html: PackageDetail?.content || "" }} />
              </div>
              <div className="row g-4">
                <div className="col-6 col-sm-6 col-md-4 d-flex">
                  <div className="me-2">
                    <div className=" bg-opacity-10 rounded-circle p-2">
                      <FcApproval />
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold small">Activity Rating</div>
                    <div className="text-muted small">{PackageDetail?.rating_stars} star</div>
                  </div>
                </div>{" "}
                <div className="col-6 col-sm-6 col-md-4 d-flex">
                  <div className="me-2">
                    <div className=" bg-opacity-10 rounded-circle p-2">
                      <FcApproval />
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold small">Duration</div>
                    <div className="text-muted small">{PackageDetail?.activity_duration}</div>
                  </div>
                </div>{" "}
                <div className="col-6 col-sm-6 col-md-4 d-flex">
                  <div className="me-2">
                    <div className=" bg-opacity-10 rounded-circle p-2">
                      <FcApproval />
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold small">Start Date</div>
                    <div className="text-muted small">{moment(PackageDetail?.start_date).format('DD-MM-YYYY')}</div>
                  </div>
                </div>
                <div className="col-6 col-sm-6 col-md-4 d-flex">
                  <div className="me-2">
                    <div className=" bg-opacity-10 rounded-circle p-2">
                      <FcApproval />
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold small">End Date</div>
                    <div className="text-muted small">{moment(PackageDetail?.end_date).format('DD-MM-YYYY')}</div>
                  </div>
                </div>{" "}
                <div className="col-6 col-sm-6 col-md-4 d-flex">
                  <div className="me-2">
                    <div className=" bg-opacity-10 rounded-circle p-2">
                      <FcApproval />
                    </div>
                  </div>
                  <div>
                    <div className="fw-bold small">Location</div>
                    <div className="text-muted small">{PackageDetail?.city}, {PackageDetail?.country}</div>
                  </div>
                </div>
              </div>
              {PackageDetail?.facilities && PackageDetail?.facilities.length > 0 && (
                <div className="mt-5">
                  <h5 className="mb-0">Facilities</h5>
                  <p className='small text-muted'>Explore the facilities included in this package.</p>
                  <div className="row mt-4">
                    {PackageDetail?.facilities?.map((item, index) => (
                      <div key={index} className="col-md-4 col-12 mb-2">
                        <ThemeIcon color="teal" size={24} radius="xl">
                          <IoMdCheckmarkCircleOutline size={16} />
                        </ThemeIcon>{" "}
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* What To Expect */}
            {(PackageDetail?.what_to_expect && PackageDetail?.what_to_expect.length > 0) &&
              <WhatExpect expectData={PackageDetail?.what_to_expect} />
            }
            {/* Included Excluded */}
            <IncludedExcluded included={PackageDetail?.included_items || ""} excluded={PackageDetail?.excluded_items || ""} />
            {/* Faqs Section */}
            {(PackageDetail?.faqs && PackageDetail?.faqs.length > 0) &&
              <Faqs faqsList={PackageDetail?.faqs || []} />
            }

          </div>
          <div className="col-md-4">
            {/* Availability Section */}
            <Availability PackageDetail={PackageDetail} />

            {/* Selection Section */}
            <Selection PackageDetail={PackageDetail} />

          </div>
        </div>
      </div>
    </>
  );
}

export default ActivityDetail;
