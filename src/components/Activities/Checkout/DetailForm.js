"use client";
import React, { useState, useEffect } from "react";
import { countryListLocal } from "@/util/CountryList";
import { Select, Tooltip } from "@mantine/core";
import { TiDeleteOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import PackageBookingLoader from "@/components/Loader/PackageBookingLoader";
import { useCurrency } from "@/util/currency";
import { ConvertPrice } from "@/components/Currency/ConvertPrice";
import {
  IoCopyOutline,
  IoPersonAddOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { CiCircleCheck } from "react-icons/ci";
import Link from "next/link";
export default function DetailForm({ activityDetail }) {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { currency, rates } = useCurrency();
  const [totalPersons, setTotalPersons] = useState({ adults: 0, children: 0 });
  const [otherGuestDetail, setOtherGuestDetail] = useState([]);
  const [otherGuestError, setOtherGuestError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderError, setLoaderError] = useState("");
  const [confirmStatus, setConfirmStatus] = useState("pending"); // "pending" | "booking" | "payment" | "success" | "error"
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phoneCode: "",
    phone: "",
    requests: "",
    gender: "male",
    terms: false,
  });
  const [bookingOptionDetails, setBookingOptionDetails] = useState("");

  const bankInfo = {
    accountName: "Kashta Travels Ltd",
    accountNumber: "58516868",
    // iban: "GB29NWBK60161331926819",
    sortcode: "309950",
    // branch: "London Branch",
  };

  const copyToClipboard = async (text) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      notifications.show({
        title: "Copied",
        message: "Copied to clipboard",
        color: "teal",
      });
    } catch (err) {
      notifications.show({
        title: "Error",
        message: "Unable to copy",
        color: "red",
      });
    }
  };

  useEffect(() => {
    setTotalPersons({
      adults: Math.max((activityDetail?.adults || 0) - 1, 0),
      children: activityDetail?.children || 0,
    });
  }, [activityDetail]);
  const countryOptions = countryListLocal.item.map((item) => ({
    label: item.name.common,
    value: item.name.common,
    code:
      item.cca3 === "USA"
        ? item.idd.root
        : item.idd.root + item.idd.suffixes[0],
  }));
  // ---- Handle field change ----
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    // Allow only numbers for phone
    if (name === "phone") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : updatedValue,
    });

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // ---- Handle country selection ----
  const handleCountryChange = (value) => {
    const selected = countryOptions.find((c) => c.value === value);
    setFormData({
      ...formData,
      country: value,
      phoneCode: selected?.code || "",
    });

    if (errors.country) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.country;
        return updated;
      });
    }
  };

  // ---- Validation ----
  const validateForm = () => {
    const newErrors = {};
    const otherGuestErrors = [];
    if (!formData.title) newErrors.title = "Please select a title.";
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    if (!formData.country) newErrors.country = "Please select a country.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    // if (!formData.cardNumber) newErrors.cardNumber = "Card number is required.";
    // if (!formData.expiry) newErrors.expiry = "Expiry date is required.";
    // if (!formData.cvv) newErrors.cvv = "CVV is required.";
    if (!formData.terms) newErrors.terms = "You must agree to terms.";
    if (otherGuestDetail.length > 0) {
      otherGuestDetail.forEach((guest, index) => {
        const guestErrors = {};
        if (!guest.firstName.trim()) {
          guestErrors.firstName = "First name is required";
        }
        if (!guest.lastName.trim()) {
          guestErrors.lastName = "Last name is required";
        }
        otherGuestErrors[index] = guestErrors;
      });

      setOtherGuestError(otherGuestErrors);
    }
    setErrors(newErrors);
    return (
      Object.keys(newErrors).length === 0 &&
      otherGuestErrors.every((err) => Object.keys(err).length === 0)
    );
  };

  const handleGuestAdd = () => {
    const totalAllowed = totalPersons?.adults + totalPersons?.children;
    const currentAdults = otherGuestDetail.filter(
      (g) => g.type === "AD"
    ).length;
    const currentChildren = otherGuestDetail.filter(
      (g) => g.type === "CH"
    ).length;
    if (otherGuestDetail.length >= totalAllowed) {
      return;
    }
    setOtherGuestError([]);
    if (currentAdults < totalPersons?.adults) {
      setOtherGuestDetail([
        ...otherGuestDetail,
        { firstName: "", lastName: "", gender: "male", type: "AD" },
      ]);
    } else if (currentChildren < totalPersons?.children) {
      setOtherGuestDetail([
        ...otherGuestDetail,
        { firstName: "", lastName: "", gender: "male", type: "CH" },
      ]);
    }
  };
  const handleGuestRemove = (index) => {
    const updatedGuests = otherGuestDetail.filter((_, i) => i !== index);
    setOtherGuestDetail(updatedGuests);
  };
  const handleGuestChange = (e, index) => {
    let field = e.target.name;
    const value = e.target.value;

    // Normalize gender field
    if (field.startsWith("gender_")) {
      field = "gender";
    }

    const updatedGuests = [...otherGuestDetail];
    updatedGuests[index][field] = value;
    setOtherGuestDetail(updatedGuests);

    // Clear error if exists
    const updatedErrors = [...otherGuestError];
    if (updatedErrors[index]?.[field]) {
      updatedErrors[index][field] = "";
      setOtherGuestError(updatedErrors);
    }
  };
  // ---- Submit handler ----

  const handleCheckout = async () => {
    if (!validateForm()) return;
    setConfirmStatus("pending");
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setConfirmStatus("validate");
    var NewOtherPassenger = {};
    if (otherGuestDetail.length > 0) {
      NewOtherPassenger = convertPassengers(otherGuestDetail);
    }

    // Calculate currency conversion
    const packageCurrency = activityDetail?.currency || "GBP";
    const grandTotal = Number(activityDetail?.grand_total);

    let customerCurrency = currency;
    let customerExchangeRate = 1;
    let customerTotalAfterDiscount = grandTotal;

    // If currencies are different, convert the price
    if (
      currency !== packageCurrency &&
      rates[packageCurrency] &&
      rates[currency]
    ) {
      const conversion = ConvertPrice(
        grandTotal,
        packageCurrency,
        currency,
        rates
      );
      customerCurrency = conversion.newcurrency;
      customerTotalAfterDiscount = parseFloat(conversion.newprice);

      // Calculate exchange rate
      customerExchangeRate = rates[currency] / rates[packageCurrency];
    } else {
      // Same currency, use original values
      customerCurrency = packageCurrency;
      customerExchangeRate = 1;
      customerTotalAfterDiscount = grandTotal;
    }

    const request = {
      activity_id: activityDetail?.id,
      special_request: formData.requests,
      lead_title: formData?.title,
      lead_first_name: formData?.firstName,
      lead_last_name: formData?.lastName,
      lead_email: formData?.email,
      lead_address: formData?.address,
      lead_country: formData?.country,
      lead_phone_code: formData?.phoneCode,
      lead_phone: formData?.phone,
      lead_gender: formData?.gender,
      travel_date: activityDetail?.travel_date,
      adults: activityDetail?.adults,
      adult_price: (
        Number(activityDetail?.adults) * Number(activityDetail?.price_per_adult)
      ).toFixed(2),
      children: activityDetail?.children,
      child_price: (
        Number(activityDetail?.children) *
        Number(activityDetail?.price_per_child)
      ).toFixed(2),
      grand_total: grandTotal,
      other_passengers: NewOtherPassenger,
      customer_currency: customerCurrency,
      customer_exchange_rate: customerExchangeRate,
      customer_total: customerTotalAfterDiscount,
      additional_services: activityDetail?.selected_services || [],
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/booking`,
        {
          method: "POST",
           headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            },
          body: JSON.stringify(request),
        }
      );
      const response = await res.json();
      console.log("Booking Response:", response);
      if (response?.Success) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setConfirmStatus("reserve");
        // router.push(`/activities/voucher/${response?.Content?.booking?.booking_reference}`);
        await handlePayment(response?.Content);
      } else {
        setLoaderError(
          response?.error?.message || "Booking failed. Please try again."
        );
        setConfirmStatus("error");
        setTimeout(() => {
          setLoading(false);
          notifications.show({
            title: "Error",
            message: response?.error?.message,
            autoClose: 3500,
            color: "red",
          });
        }, 1000);
      }
    } catch (err) {
      setLoaderError("A network error occurred. Please try again.");
      setConfirmStatus("error");
      setTimeout(() => setLoading(false), 1000);
    }
  };
  const handlePayment = async (data) => {
    const domain = window.location.origin;
    const checkoutUrl = window.location;
    const request = {
      booking_reference: data?.booking?.booking_reference,
      success_url: `${domain}/activities/voucher/${data?.booking?.booking_reference}`,
      cancel_url: `${checkoutUrl}`,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/payment/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(request),
        }
      );
      const response = await res.json();
      if (response?.Success) {
        setConfirmStatus("payment");
        setTimeout(() => {
          setLoading(false);
          router.push(response?.Content?.checkout_url);
        }, 800);
      } else {
        setLoaderError(
          response?.error?.message || "Booking failed. Please try again."
        );
        setConfirmStatus("error");
        setTimeout(() => {
          setLoading(false);
          notifications.show({
            title: "Error",
            message: response?.error?.message,
            autoClose: 3500,
            color: "red",
          });
        }, 1000);
      }
    } catch (err) {
      setLoaderError("A network error occurred. Please try again.");
      setConfirmStatus("error");
      setTimeout(() => setLoading(false), 1000);
    }
  };
  const handleLoaderComplete = () => {};
  const convertPassengers = (list) => {
    const result = {
      additional_adults: [],
      children_details: [],
    };

    let adultIndex = 2; // adult count starts from 2
    let childIndex = 1; // child starts from 1

    list.forEach((item) => {
      const formatted = {
        index: null,
        gender: item.gender,
        last_name: item.lastName,
        first_name: item.firstName,
      };

      if (item.type === "AD") {
        formatted.index = adultIndex++;
        result.additional_adults.push(formatted);
      }

      if (item.type === "CH") {
        formatted.index = childIndex++;
        result.children_details.push(formatted);
      }
    });

    return result;
  };

  return (
    <div>
      {loading && (
        <PackageBookingLoader
          errorMessage={loaderError}
          showLoader={loading}
          onComplete={handleLoaderComplete}
          confirmStatus={confirmStatus}
          componentName="Activity"
        />
      )}
      {/* Lead Guest Info */}
      <div className="rounded border mt-3 p-3">
        <h5 className="mb-3">Lead Person Information</h5>

        <div className="row mb-4 g-3">
          {/* Title */}
          <div className="col-md-4">
            <label className="form-label">Title*</label>
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-select ${errors.title ? "is-invalid" : ""}`}
            >
              <option value="">Select</option>
              <option value="MR">Mr</option>
              <option value="MRS">Mrs</option>
              <option value="MISS">Miss</option>
              <option value="MS">Ms</option>
              <option value="DR">Dr</option>
            </select>
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          {/* First Name */}
          <div className="col-md-4">
            <label className="form-label">First Name*</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              placeholder="First Name"
              autoComplete="off"
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="col-md-4">
            <label className="form-label">Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              placeholder="Last Name"
              autoComplete="off"
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="you@example.com"
              autoComplete="off"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          {/* Address */}
          <div className="col-md-6">
            <label className="form-label">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              placeholder="House No. / Street / Area"
              autoComplete="off"
            />
            {errors.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
          </div>

          {/* Country */}
          <div className="col-md-4">
            <label className="form-label">Country*</label>
            <Select
              placeholder="Select Country"
              searchable
              data={countryOptions}
              value={formData.country}
              limit={50}
              onChange={handleCountryChange}
              className={errors.country ? "is-invalid" : ""}
            />
            {errors.country && (
              <div className="text-danger small mt-1">{errors.country}</div>
            )}
          </div>

          {/* Phone */}
          <div className="col-md-4">
            <label className="form-label">Phone Number*</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                {formData.phoneCode || "+__"}
              </span>
              <input
                type="text"
                name="phone"
                inputMode="numeric"
                pattern="[0-9]*"
                value={formData.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="123456789"
                autoComplete="off"
              />
            </div>
            {errors.phone && (
              <div className="invalid-feedback d-block">{errors.phone}</div>
            )}
          </div>

          {/* Gender */}
          <div className="col-md-4">
            <label className="form-label">Gender*</label>
            <div className="">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  checked={formData.gender === "male"}
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  id="leadRadio1"
                  value="male"
                />
                <label className="form-check-label" htmlFor="leadRadio1">
                  Male
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  checked={formData.gender === "female"}
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  id="leadRadio2"
                  value="female"
                />
                <label className="form-check-label" htmlFor="leadRadio2">
                  Female
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <p className="text-muted small">
          This information will be used for all booking confirmations and
          communications. Ensure that the name matches travel documents.
        </p>
      </div>
      <div className="rounded border mt-3 p-3">
        {/* Other Guest Info */}
        <button onClick={handleGuestAdd} className="btn btn-primary btn-sm ">
          + Add New Guest
        </button>
        {otherGuestDetail.map((item, index) => (
          <div key={index} className="row my-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <h5>
                Traveler {index + 2}{" "}
                {(item.type === "CH" || item.type === "IN") && (
                  <span
                    style={{ fontSize: "12px" }}
                    className="small bg-secondary-subtle rounded px-1 py-1"
                  >
                    {item.type === "CH" ? "Child" : "Infant"}
                  </span>
                )}
              </h5>
              <TiDeleteOutline
                onClick={() => handleGuestRemove(index)}
                className="text-danger cursor-pointer"
                size={20}
              />
            </div>
            <div className="col-12 col-md-4">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                onChange={(e) => handleGuestChange(e, index)}
                value={item.firstName}
                placeholder="First Name"
                className={`form-control ${
                  otherGuestError[index]?.firstName ? "is-invalid" : ""
                } `}
              />
              {otherGuestError[index]?.firstName && (
                <div className="invalid-feedback">
                  {otherGuestError[index]?.firstName}
                </div>
              )}
            </div>
            <div className="col-12 col-md-4">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                onChange={(e) => handleGuestChange(e, index)}
                value={item.lastName}
                placeholder="Last Name"
                className={`form-control ${
                  otherGuestError[index]?.lastName ? "is-invalid" : ""
                } `}
              />
              {otherGuestError[index]?.lastName && (
                <div className="invalid-feedback">
                  {otherGuestError[index]?.lastName}
                </div>
              )}
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Gender*</label>
              <div className="">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={item.gender === "male"}
                    type="radio"
                    onChange={(e) => handleGuestChange(e, index)}
                    name={`gender_${index}`}
                    id={`male_${index}`}
                    value="male"
                  />
                  <label className="form-check-label" htmlFor={`male_${index}`}>
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    checked={item.gender === "female"}
                    type="radio"
                    onChange={(e) => handleGuestChange(e, index)}
                    name={`gender_${index}`}
                    id={`female_${index}`}
                    value="female"
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`female${index}`}
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Special Requests */}
      <div className="rounded border mt-3 p-3">
        <h5>Special requests</h5>
        <p className="mt-3 small">
          Special requests cannot be guaranteed – we’ll do our best to fulfill
          them.
        </p>
        <p className="mb-0">Please write your requests in English (optional)</p>
        <textarea
          className="form-control w-100"
          rows={5}
          name="requests"
          value={formData.requests}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Terms */}
      <div className="form-check mt-4">
        <input
          className={`form-check-input ${errors.terms ? "is-invalid" : ""}`}
          type="checkbox"
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="terms">
          I agree to the{" "}
          <Link href="/terms-and-conditions" target="_blank">
            terms and conditions
          </Link>
          .
        </label>
        {errors.terms && (
          <div className="text-danger small mt-1">{errors.terms}</div>
        )}
      </div>
      <div className="bg-success-subtle rounded p-3 mt-3">
        <div className="text-success">
          <IoShieldCheckmarkOutline /> All transactions are encrypted and 100%
          safe.
        </div>
        <div className="text-success">
          <CiCircleCheck /> Your booking is confirmed immediately after payment.
        </div>
        <div className="text-success">
          <IoPersonAddOutline /> Join thousands of satisfied travelers who
          booked with us.
        </div>
        <div className="text-success">
          <BiSupport /> Our customer service is here to assist you anytime.
        </div>
      </div>
      {/* <div className="mt-3">
                <div className="border rounded p-3 bg-white shadow-sm">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 className="mb-0">Pay via Bank Transfer</h6>
                            <div className="small text-muted">Reserve now and transfer later. Your booking will be held until payment is received.</div>
                        </div>
                        <div>
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setBookingOptionDetails(bookingOptionDetails === 'bank' ? '' : 'bank')}>
                                {bookingOptionDetails === 'bank' ? 'Hide details' : 'Show details'}
                            </button>
                        </div>
                    </div>

                    {bookingOptionDetails === 'bank' && (
                        <div className="mt-3" >
                            <div className="row g-2 align-items-center">
                                <div className="col-12 col-md-6">
                                    <div className="small text-muted">Account Name</div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="fw-bold">{bankInfo.accountName}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="small text-muted">Account Number</div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="fw-bold">{bankInfo.accountNumber}</div>
                                        <Tooltip label="Copy to clipboard" withArrow>
                                            <div className=" ms-2 cursor-pointer" onClick={() => copyToClipboard(bankInfo.accountNumber)}><IoCopyOutline size={16} /></div>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mt-2">
                                    <div className="small text-muted">IBAN</div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="fw-bold">{bankInfo.iban}</div>
                                        <button type="button" className="btn btn-sm btn-outline-secondary ms-2" onClick={() => copyToClipboard(bankInfo.iban)}>Copy</button>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 mt-2">
                                    <div className="small text-muted">Sort Code</div>
                                    <div className="d-flex gap-2 align-items-center">
                                        <div className="fw-bold">{bankInfo.sortcode}</div>
                                         <Tooltip label="Copy to clipboard" withArrow>
                                            <div className=" ms-2 cursor-pointer" onClick={() => copyToClipboard(bankInfo.accountNumber)}><IoCopyOutline size={16} /></div>
                                        </Tooltip>
                                    </div>

                                </div>
                                <div className="col-12 mt-2">
                                    <div className="small text-muted">Note: Please include your booking reference in the payment description once you receive it on confirmation voucher.</div>
                                </div>
                                <div className="col-12 mt-3 d-flex justify-content-end">
                                    <button type="button" onClick={handleCheckout} className="btn btn-success" disabled={loading}>
                                        {loading ? 'Processing...' : 'Book with Bank Transfer'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div> */}
      <div className="mt-3">
        <div className="border rounded p-3 bg-white shadow-sm">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-0">Pay via Card</h6>
              <div className="small text-muted">
                Pay securely using your debit or credit card.
              </div>
            </div>
            {/* <div>
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setBookingOptionDetails(bookingOptionDetails === 'card' ? '' : 'card')}>
                                {bookingOptionDetails === 'card' ? 'Hide details' : 'Show details'}
                            </button>
                        </div> */}
          </div>
          {/* {bookingOptionDetails === 'card' && ( */}
          <div>
            <div className="small mt-3 text-muted">
              To complete your booking, you will need to enter the cardholder’s
              name as shown on the card, the card number, expiry date, and the
              CVC/CVV security code. In some cases, your bank may also request
              billing address verification for added security. All card details
              are encrypted and processed through a secure payment gateway to
              ensure your information remains safe.
            </div>
            <div className="col-12 mt-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-success"
                disabled={loading}
                onClick={handleCheckout}
              >
                {loading ? "Processing..." : "Book with Card"}
              </button>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>
      {/* Submit */}
      {/* <div className="d-grid mt-4">
                <button
                    onClick={handleCheckout}
                    type="button"
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading ? 'Processing...' : 'Confirm Booking'}

                </button>
            </div> */}
    </div>
  );
}
