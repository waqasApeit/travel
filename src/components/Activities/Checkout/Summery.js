import React from 'react'
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function Summery({ activityDetail }) {
  const totalPeople = Number(activityDetail?.adults || 0) + Number(activityDetail?.children || 0);
  return (
    <div>
      {(activityDetail?.cancellation_policy_text && activityDetail?.cancellation_policy_text !== null && activityDetail?.cancellation_policy_text !== '') && (
        <div className='alert alert-danger small mt-3'>
          <p className='fw-bold mb-2'>Cancellation Policy</p>
          {activityDetail?.cancellation_policy_text}
        </div>
      )}
      <div className='mt-3 border p-3 rounded shadow'>
        <h5 className={`mb-0 fw-bold ${philosopher.className}`}>Booking Summary</h5>
        <p className='small text-muted'>Review your selected activity, and traveler details.</p>
        <hr />
        <div className="small text-muted mb-1">Traveler Detail:</div>
        {activityDetail?.adults > 0 && (
          <div className="d-flex justify-content-between mb-1 small">
            <span>{activityDetail?.adults} Adult{activityDetail?.adults > 1 ? 's' : ''} × <PriceDisplay price={Number(activityDetail?.price_per_adult)} currency={activityDetail?.currency} /></span>
            <span ><PriceDisplay price={Number(activityDetail?.price_per_adult) * Number(activityDetail?.adults)} currency={activityDetail?.currency} /></span>
          </div>
        )}
        {activityDetail?.children > 0 && (
          <div className="d-flex justify-content-between mb-1 small">
            <span>{activityDetail?.children} Child{activityDetail?.children > 1 ? 'ren' : ''} × <PriceDisplay price={Number(activityDetail?.price_per_child)} currency={activityDetail?.currency} /></span>
            <span><PriceDisplay price={Number(activityDetail?.price_per_child) * Number(activityDetail?.children)} currency={activityDetail?.currency} /></span>
          </div>
        )}
        {(activityDetail?.selected_services && activityDetail?.selected_services.length > 0) && (
          <div>
            <hr />
            <div className="small text-muted mb-1">Additional Services:</div>
            {activityDetail?.selected_services.map((service, index) => {
              const serviceTotal = service.type === 'per_person'
                ? service.quantity  * Number(service.price)
                : Number(service.total);
              return (
                <div key={index} className="d-flex justify-content-between mb-1 small">
                  <span>{service.name} {service.type === 'per_person' && `(${service.quantity} × ${totalPeople} people)`}</span>
                  <span><PriceDisplay price={serviceTotal} currency={activityDetail?.currency} /></span>
                </div>
              );
            })}
          </div>
        )}
        <hr />
        {/* <div className='mt-2 d-flex  align-items-center justify-content-between'>
          Services Total: <span><PriceDisplay price={activityDetail?.services_total} currency={activityDetail?.currency} /></span>
        </div> */}
        <div className='mt-2 d-flex  align-items-center justify-content-between'>
          Traveler Total: <span><PriceDisplay price={activityDetail?.participants_total} currency={activityDetail?.currency} /></span>
        </div>
        <div className='mt-2 d-flex  align-items-center justify-content-between'>
          Sub Total: <span><PriceDisplay price={activityDetail?.grand_total} currency={activityDetail?.currency} /></span>
        </div>
        <hr />
        <div className='mt-2 d-flex h5 align-items-center justify-content-between'>
          Total: <span className='text-success'><PriceDisplay price={activityDetail?.grand_total} currency={activityDetail?.currency} /></span>
        </div>
        <div className='small text-end text-muted'>Inclusive of VAT and Taxes</div>
      </div>
    </div>
  )
}
