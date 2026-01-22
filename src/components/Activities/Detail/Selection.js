'use client'
import React, { useState, useMemo } from 'react'
import { BiCalendar } from "react-icons/bi";
import { DatePickerInput } from "@mantine/dates";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from 'moment';
import AdditionalServices from './AdditionalServices';
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { useActivityStore } from '@/components/Store/ActivityStore';
import { useRouter } from 'next/navigation';
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function Selection({ PackageDetail }) {
  const { setSelectedActivity } = useActivityStore();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [servicesTotal, setServicesTotal] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  // Calculate total people
  const totalPeople = adultCount + childCount;

  // Handle adult count change
  const handleAdultChange = (changeType) => {
    if (changeType === 'plus') {
      if (totalPeople < (PackageDetail?.max_people || 10)) {
        setAdultCount(adultCount + 1);
      }
    } else if (changeType === 'minus' && adultCount > 0) {
      setAdultCount(adultCount - 1);
    }
  };

  // Handle child count change
  const handleChildChange = (changeType) => {
    if (changeType === 'plus') {
      if (totalPeople < (PackageDetail?.max_people || 10)) {
        setChildCount(childCount + 1);
      }
    } else if (changeType === 'minus' && childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  // Calculate prices
  const adultPrice = adultCount * Number(PackageDetail?.sale_price || 0);
  const childPrice = childCount * Number(PackageDetail?.child_sale_price || 0);
  const participantsTotal = adultPrice + childPrice;

  // Calculate additional services total for per_person items
  const perPersonServicesTotal = useMemo(() => {
    return selectedServices
      .filter(service => service.type === 'per_person')
      .reduce((acc, service) => acc + (service.quantity  * Number(service.price)), 0);
  }, [selectedServices, totalPeople]);

  const perBookingServicesTotal = useMemo(() => {
    return selectedServices
      .filter(service => service.type === 'per_booking')
      .reduce((acc, service) => acc + Number(service.total), 0);
  }, [selectedServices]);

  const grandTotal = participantsTotal + perPersonServicesTotal + perBookingServicesTotal;

  // Check if minimum people requirement is met
  const minPeople = PackageDetail?.min_people || 1;
  const maxPeople = PackageDetail?.max_people || 10;
  const isValidPeopleCount = totalPeople >= minPeople && totalPeople <= maxPeople;

  // Function to check if a date should be disabled
  const shouldDisableDate = (date) => {
    if (!PackageDetail?.open_hours || !PackageDetail?.start_date || !PackageDetail?.end_date) {
      return true;
    }

    const checkDate = moment(date);
    const startDate = moment(PackageDetail.start_date);
    const endDate = moment(PackageDetail.end_date);

    // Disable dates outside the start_date and end_date range
    if (checkDate.isBefore(startDate, 'day') || checkDate.isAfter(endDate, 'day')) {
      return true;
    }

    // Get the day name (lowercase)
    const dayName = checkDate.format('dddd').toLowerCase();
    const dayInfo = PackageDetail.open_hours[dayName];

    // Disable if day is not enabled
    if (!dayInfo || dayInfo.enabled !== "1") {
      return true;
    }

    return false;
  };

  // Get min and max dates for the date picker
  const minDate = PackageDetail?.start_date ? new Date(PackageDetail.start_date) : null;
  const maxDate = PackageDetail?.end_date ? new Date(PackageDetail.end_date) : null;
  const HandleBookNow = () => {
    // Prepare selected activity data
    const activityData = {
      'id': PackageDetail?.id,
      'title': PackageDetail?.title,
      'address': PackageDetail?.address,
      'duration': PackageDetail?.activity_duration,
      'slug': PackageDetail?.slug,
      'travel_date': selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : null,
      'adults': adultCount,
      'children': childCount,
      'rating_stars': PackageDetail?.rating_stars,
      'participants_total': participantsTotal,
      'services_total': perPersonServicesTotal + perBookingServicesTotal,
      'grand_total': grandTotal,
      'selected_services': selectedServices,
      'currency': PackageDetail?.currency_code,
      'price_per_adult': PackageDetail?.sale_price,
      'price_per_child': PackageDetail?.child_sale_price,
      'ppserson_services_total': perPersonServicesTotal,
      'pb_services_total': perBookingServicesTotal,
      'city': PackageDetail?.city,
      'country': PackageDetail?.country,
      'cancellation_policy_text': PackageDetail?.cancellation_policy_text,
    };
    setSelectedActivity(activityData);
    router.push(`/activities/${PackageDetail.slug}/checkout`);
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title={<strong>Cancellation Policy</strong>}
      >
        {PackageDetail?.cancellation_policy_text || "No cancellation policy available."}
      </Modal>
      <div className="mt-3 border p-3 rounded">
        <h5 className={`mb-0 fw-bold ${philosopher.className}`}>Select Activity</h5>
        <p className='small text-muted'>Fill in activity, date, passenger count, etc.</p>

        {/* People Count Info */}
        <div className="alert alert-info small mb-3">
          <strong>Participant Requirements:</strong> Minimum {minPeople} - Maximum {maxPeople} people
        </div>

        {/* Start Date */}
        <div className="d-flex justify-content-between mb-2">
          <span className="">Start Date:</span>
          <span>{moment(PackageDetail?.start_date).format("DD-MM-YYYY")}</span>
        </div>

        {/* End Date */}
        <div className="d-flex justify-content-between mb-2">
          <span className="">End Date:</span>
          <span>{moment(PackageDetail?.end_date).format("DD-MM-YYYY")}</span>
        </div>

        {/* Travel Date Picker */}
        <div className="mb-3">
          <DatePickerInput
            value={selectedDate}
            onChange={setSelectedDate}
            valueFormat="DD-MM-YYYY"
            label="Travel Date"
            placeholder="Pick a date"
            className="w-100"
            clearable
            minDate={minDate}
            maxDate={maxDate}
            excludeDate={shouldDisableDate}
          />
        </div>

        {/* Adult Selection */}
        <div className='border p-2 rounded mb-2'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <label className="fw-bold">Adult</label>
            </div>
            <div className='text-end'>
              <div className='text-success mb-0'><PriceDisplay price={PackageDetail?.sale_price} currency={PackageDetail?.currency_code} /></div>
              <div className='small text-muted'>per person</div>
            </div>
          </div>
          <div className="quantity-box d-flex align-items-center justify-content-between mt-2">
            <button
              onClick={() => handleAdultChange('minus')}
              className="btn-qty minus"
              disabled={adultCount === 0}
            >−</button>
            <span className="qty-value">{adultCount}</span>
            <button
              onClick={() => handleAdultChange('plus')}
              className="btn-qty plus"
              disabled={totalPeople >= maxPeople}
            >+</button>
          </div>
        </div>

        {/* Child Selection */}
        {PackageDetail?.has_child_pricing === 1 && (
          <div className='border p-2 rounded mb-3'>
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <label className="fw-bold">Child</label>
              </div>
              <div className='text-end'>
                <div className='text-success mb-0'><PriceDisplay price={PackageDetail?.child_sale_price} currency={PackageDetail?.currency_code} /></div>
                <div className='small text-muted'>per person</div>
              </div>
            </div>
            <div className="quantity-box d-flex align-items-center justify-content-between mt-2">
              <button
                onClick={() => handleChildChange('minus')}
                className="btn-qty minus"
                disabled={childCount === 0}
              >−</button>
              <span className="qty-value">{childCount}</span>
              <button
                onClick={() => handleChildChange('plus')}
                className="btn-qty plus"
                disabled={totalPeople >= maxPeople}
              >+</button>
            </div>
          </div>
        )}

      </div>
      {PackageDetail?.additional_services && PackageDetail?.additional_services.length > 0 && (
        <AdditionalServices
          Services={PackageDetail?.additional_services || []}
          currency={PackageDetail?.currency_code}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          setServicesTotal={setServicesTotal}
        />
      )}
      <div className="mt-3 border p-3 rounded">
        {/* Booking Summary */}
        {totalPeople > 0 && (
          <div className="mb-3">
            <h5 className="mb-0">Booking Summary</h5>
            <p className='small text-muted'>Review your selected activity, date, and passenger details.</p>

            {/* Participants */}
            {adultCount > 0 && (
              <div className="d-flex justify-content-between mb-1 small">
                <span>{adultCount} Adult{adultCount > 1 ? 's' : ''} × <PriceDisplay price={PackageDetail?.sale_price} currency={PackageDetail?.currency_code} /></span>
                <span className="fw-bold"><PriceDisplay price={adultPrice} currency={PackageDetail?.currency_code} /></span>
              </div>
            )}
            {childCount > 0 && (
              <div className="d-flex justify-content-between mb-1 small">
                <span>{childCount} Child{childCount > 1 ? 'ren' : ''} × <PriceDisplay price={PackageDetail?.child_sale_price} currency={PackageDetail?.currency_code} /></span>
                <span className="fw-bold"><PriceDisplay price={childPrice} currency={PackageDetail?.currency_code} /></span>
              </div>
            )}

            {/* Additional Services */}
            {selectedServices.length > 0 && (
              <>
                <hr className="my-2" />
                <div className="small text-muted mb-1">Additional Services:</div>
                {selectedServices.map((service, index) => {
                  const serviceTotal = service.type === 'per_person'
                    ? service.quantity  * Number(service.price)
                    : Number(service.total);
                  return (
                    <div key={index} className="d-flex justify-content-between mb-1 small">
                      <span>{service.name} {service.type === 'per_person' && `(${service.quantity} × ${totalPeople} people)`}</span>
                      <span className="fw-bold"><PriceDisplay price={serviceTotal} currency={PackageDetail?.currency_code} /></span>
                    </div>
                  );
                })}
              </>
            )}

            <hr className="my-2" />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total Amount:</span>
              <span className="fw-bold text-success fs-5"><PriceDisplay price={grandTotal} currency={PackageDetail?.currency_code} /></span>
            </div>
          </div>
        )}
        {/* Validation Message */}
        {totalPeople > 0 && !isValidPeopleCount && (
          <div className="alert alert-warning small mb-3">
            {totalPeople < minPeople && `Please select at least ${minPeople} participant${minPeople > 1 ? 's' : ''}.`}
            {totalPeople > maxPeople && `Maximum ${maxPeople} participants allowed.`}
          </div>
        )}
        {/* Cancellation Policy Link */}
        <div
          className="d-flex align-items-center text-primary cursor-pointer mb-3"
          onClick={open}
          variant="default"
        >
          <BiCalendar className="me-2" />
          <small className="text-decoration-underline">
            Cancellation Policy
          </small>
        </div>

        {/* Book Now Button */}
        <button
          onClick={HandleBookNow}
          className="btn exploreBtn text-light w-100"
          disabled={!selectedDate || !isValidPeopleCount || totalPeople === 0}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  )
}
