'use client'
import React from 'react'
import { FaArrowRight, FaGlobe, FaStar } from 'react-icons/fa'
import { FaUtensils } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { BiUser } from "react-icons/bi";
import { useHotelStore } from '@/components/Store/HotelStore';
import moment from 'moment';
import CheckoutForm from '@/components/Hotels/HotelCheckout/CheckoutForm';
import { FaLocationDot } from 'react-icons/fa6';
import { BsPatchCheck } from "react-icons/bs";
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function Page() {
  const { availabilityData } = useHotelStore();

  function getCancellationMessage(policyArr) {
    if (!Array.isArray(policyArr) || policyArr.length === 0) {
      return <div className="small text-danger">Non-refundable</div>;
    }

    const policy = policyArr[0]; // assuming only one policy
    const { amount, from } = policy;

    const dateObj = moment.utc(from);
    const now = moment.utc();


    if (dateObj.isAfter(now)) {
      return <div className="small text-success">Free cancellation until {moment.utc(dateObj).format('ll')}, {moment.utc(dateObj).format('LTS')}. After that, <PriceDisplay price={amount} currency={availabilityData?.currency} /> will be charged.</div>;
    } else {
      return <div className="small text-danger">Non-refundable</div>
    }
  }

  return (
    <div className='container my-5'>
      <div className='hotel-checkout-top shadow'>
        <h2 className={`fw-bold ${philosopher.className}`}>Review Your Booking</h2>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <div className='rounded shadow border mt-2'>
            <div className='p-3'>
              <div className='small text-warning'>
                {availabilityData?.stars && Array(Number(availabilityData?.stars)).fill(0).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <div className={`mt-2 fw-bold fs-5 ${philosopher.className}`}>{availabilityData?.hotel_name}</div>
              <div className='small text-success mt-1'> <FaLocationDot className='me-2' />{availabilityData?.address}</div>
            </div>
          </div>
          <div className='rounded shadow border mt-3 p-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <p className='small mb-1'>Check in</p>
                <span className='fw-bold'>{moment(availabilityData?.check_in).format('ll')}</span>
              </div>
              <FaArrowRight />
              <div>
                <p className='small mb-1'>Check Out</p>
                <span className='fw-bold'>{moment(availabilityData?.check_out).format('ll')}</span>
              </div>
            </div>
            <div className='mt-3 small fw-bold'>Total length of stay:</div>
            <div className='mt-1 small fw-bold'>{moment(availabilityData?.check_out).diff(moment(availabilityData?.check_in), 'days')} nights</div>
          </div>
          <div className='rounded hotel-detail-room-selection p-3  mt-3'>
            {availabilityData?.rooms && availabilityData?.rooms.map((item, index) => (
              <div key={index} className="rounded ">
                <h5 className={`mb-2 fw-bold ${philosopher.className}`}>{item.name}</h5>
                {item.rates.map((rate, idx) => (
                  <div key={idx}>
                    {idx > 0 && <hr />}
                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <FaUtensils className="me-2" />
                        <strong>Meal Type:</strong>
                      </span>
                      <span>{rate.board_name}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <HiOutlineUsers className="me-2" />
                        <strong>Room:</strong>
                      </span>
                      <span>{rate.rooms} Room</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <BiUser className="me-2" />
                        <strong>Adults:</strong>
                      </span>
                      <span>{rate.adults}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <span className="text-muted">
                        <BiUser className="me-2" />
                        <strong>Children:</strong>
                      </span>
                      <span>{rate.children}</span>
                    </div>
                    <div className="d-flex  justify-content-between mb-2">
                      <span className="text-muted">
                        <BiUser className="me-2" />
                        <strong>Price:</strong>
                      </span>
                      <span><PriceDisplay price={rate.price} currency={availabilityData?.currency} /></span>
                    </div>

                    {getCancellationMessage(rate?.cancellation_policies)}
                  </div>
                ))}
                <hr />
              </div>
            ))}
          </div>

          <div className='rounded shadow border mt-3 '>
            <div className='gray-simple  p-3'>
              <div className='fw-bold d-flex align-items-center justify-content-between'>
                <h4 className={`mb-0 fw-bold ${philosopher.className}`}>Price</h4>
                <h4 className='mb-0'><PriceDisplay price={availabilityData?.total_net} currency={availabilityData?.currency} /></h4>
              </div>
            </div>
          </div>
          <div className="rounded shadow border mt-3 p-3">
            <h5 className={`mb-3 fw-bold ${philosopher.className}`}>Good to know:</h5>
            <div>
              <BsPatchCheck className="text-success" /> Check-in and check-out times
              may vary depending on the hotel’s policy.
            </div>
            <div>
              <BsPatchCheck className="text-success" /> A valid ID or passport is
              required at check-in.
            </div>
            <div>
              <BsPatchCheck className="text-success" /> Additional charges may apply
              for extra guests or requests.
            </div>
            <div>
              <BsPatchCheck className="text-success" /> Please review the
              cancellation policy before booking.
            </div>
          </div>

        </div>
        <div className='col-md-8'>
          <CheckoutForm data={availabilityData} />
        </div>
      </div>
    </div>
  )
}
