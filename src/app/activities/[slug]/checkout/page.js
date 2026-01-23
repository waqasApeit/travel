'use client'
import React, { act, useEffect, useState } from 'react'
import { useActivityStore } from '@/components/Store/ActivityStore';
import { LuCalendarCheck2 } from "react-icons/lu";
import { LuCalendarX2 } from "react-icons/lu";
import { TbShieldStar } from "react-icons/tb";
import moment from 'moment'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import Summery from '@/components/Activities/Checkout/Summery';
import DetailForm from '@/components/Activities/Checkout/DetailForm';
import { FaClockRotateLeft } from "react-icons/fa6";
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function page() {
    const { selectedActivity } = useActivityStore();
    const [activityDetail, setActivityDetail] = useState({});
    useEffect(() => {
        setActivityDetail(selectedActivity);
    }, [selectedActivity]);

    console.log(activityDetail)
    return (
        <div>
            <div className='container my-5'>
                <div className='hotel-checkout-top shadow'>
                    <h2 className={`fw-bold ${philosopher.className}`}>Review Your Booking</h2>
                </div>

                <div className='border rounded shadow p-3'>
                    <h4 className={`mb-0 fw-bold ${philosopher.className}`}>{activityDetail?.title}</h4>
                    <p className='text-muted'><FaLocationDot/> {activityDetail?.address}</p>
                    <div className='row mt-4 mb-3 text-center text-md-start justify-content-center align-items-center'>
                        <div className='col-md-3 col-12 col-sm-6 d-flex align-items-center gap-2 mb-2'>
                            <LuCalendarX2 className='text-success' />
                            <div>
                                <small className="text-muted d-block">Selected Date</small>
                                <span className="fw-semibold">{moment(activityDetail?.travel_date).format('ll')}</span>
                            </div>
                        </div>
                        <div className='col-md-3 col-12 col-sm-6 d-flex align-items-center gap-2 mb-2'>
                            <FaClockRotateLeft className='text-success' />
                            <div>
                                <small className="text-muted d-block">Duration</small>
                                <span className="fw-semibold">{activityDetail?.duration}</span>
                            </div>
                        </div>
                        <div className='col-md-3 col-12 col-sm-6 d-flex align-items-center gap-2 mb-2'>
                            <TbShieldStar className='text-success' />
                            <div>
                                <small className="text-muted d-block">Rating</small>
                                <span className="fw-semibold">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const rating = Number(activityDetail.rating_stars);
                                        const fullStars = Math.floor(rating);
                                        const hasHalfStar = rating - fullStars >= 0.5;

                                        if (index < fullStars) {
                                            // Full star
                                            return <FaStar key={index} className="text-danger me-1" />;
                                        } else if (index === fullStars && hasHalfStar) {
                                            // Half star
                                            return <FaStarHalfAlt key={index} className="text-danger me-1" />;
                                        } else {
                                            // Empty star
                                            return <FaRegStar key={index} className="text-danger me-1" />;
                                        }
                                    })}
                                </span>
                            </div>
                        </div>
                         <div className='col-md-3 col-12 col-sm-6 d-flex align-items-center gap-2 mb-2'>
                            <LuCalendarCheck2 className='text-success' />
                            <div>
                                <small className="text-muted d-block">City/Country</small>
                                <span className="fw-semibold">{activityDetail?.city}, {activityDetail?.country}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-md-8 col-12'>
                        <DetailForm activityDetail={activityDetail} />
                    </div>
                    <div className='col-md-4 col-12'>
                        <Summery activityDetail={activityDetail} />
                    </div>
                </div>

            </div>
        </div>
    )
}
