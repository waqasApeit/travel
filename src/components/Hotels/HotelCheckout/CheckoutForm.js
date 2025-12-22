"use client";

import React, { useState, useEffect } from "react";
import { Select } from "@mantine/core";
import { countryListLocal } from "@/util/CountryList"; // your country data
import BookingLoader from "@/components/Loader/BookingLoader";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { TiDeleteOutline } from "react-icons/ti";
import { BiCreditCard } from "react-icons/bi";
import { BsBank } from "react-icons/bs";
import { FaFaceGrinStars } from "react-icons/fa6";
import { GoCheckCircle } from "react-icons/go";
import Link from "next/link";
export default function CheckoutForm({ data }) {
    const [showLoader, setShowLoader] = useState(false);
    const [loaderError, setLoaderError] = useState("");
    const [otherGuestDetail, setOtherGuestDetail] = useState([]);
    const [otherGuestError, setOtherGuestError] = useState([]);
    const [confirmStatus, setConfirmStatus] = useState("pending");
    const [searchData, setSearchData] = useState({});
    const router = useRouter();
    useEffect(() => {
        const totals = data?.rooms ? data?.rooms.reduce(
            (acc, room) => {
                room.rates.forEach(rate => {
                    acc.adults += rate.adults || 0;
                    acc.children += rate.children || 0;
                });
                return acc;
            },
            { adults: 0, children: 0 }
        ) : [];
        const adjustedTotals = {
            ...totals,
            adults: Math.max(totals.adults - 1, 0),
        };
        setSearchData(adjustedTotals);
    }, [data]);
    // ---- Create country list array ----
    const countryOptions = countryListLocal.item.map((item) => ({
        label: item.name.common,
        value: item.name.common,
        code: item.cca3 === "USA"
          ? item.idd.root
          : item.idd.root + item.idd.suffixes[0],
    }));

    // ---- Form state ----
    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        phoneCode: "",
        phone: "",
        requests: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        terms: false,
    });

    // ---- Validation errors ----
    const [errors, setErrors] = useState({});

    // ---- Handle field change ----
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
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
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.country) newErrors.country = "Please select a country.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
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
        return Object.keys(newErrors).length === 0 && otherGuestErrors.every(err => Object.keys(err).length === 0);
    };
    // ---- Submit handler ----
    const handleCheckout = async () => {
        if (!validateForm()) return;
        setLoaderError("");
        setConfirmStatus("pending");
        setShowLoader(true);

        // Wait for first two steps (2 seconds each)
        await new Promise(resolve => setTimeout(resolve, 4000));
        const otherAdults = otherGuestDetail.filter(item => item.type === 'AD');
        const otherChilds = otherGuestDetail.filter(item => item.type === 'CH');
        // Now make the API call
        const request = {
            "provider": data?.provider,
            "holder_title": formData?.title,
            "holder_email": formData?.email,
            "checkIn": data?.check_in,
            "checkOut": data?.check_out,
            "holder_phone": formData?.phoneCode + formData?.phone,
            "holder_country": formData?.country,
            "remark": formData?.requests,
            "otherAdults": otherAdults,
            "otherChilds": otherChilds,
            "holder": {
                "name": formData.firstName,
                "surname": formData.lastName,
            },
            "rooms": data.rooms.map(item => ({
                code: item.code,
                name: item.name,
                status: item.status,
                rates: item.rates.map(rate => ({
                    rate_key: rate.rate_key,
                    rate_type: rate.rate_type,
                    adults: rate.adults,
                    children: rate.children,
                    rooms: rate.rooms,
                })),
            })),
            "clientReference": `ref_${Date.now()}`,
        };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/create-booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true', },
                body: JSON.stringify(request),
            });
            const response = await res.json();
            if (response?.success) {
                setConfirmStatus("success");
                setTimeout(() => {
                    setShowLoader(false);
                    router.push(`/hotels/voucher/${response?.data?.invoice_number}`);
                }, 1000);
            } else {
                setLoaderError(response?.error?.message || "Booking failed. Please try again.");
                setConfirmStatus("error");
                setTimeout(() => {
                    setShowLoader(false);
                    notifications.show({
                        title: 'Error',
                        message: response?.error?.message,
                        autoClose: 3500,
                        color: 'red'
                    })
                }, 1000);

            }
        } catch (err) {
            setLoaderError("A network error occurred. Please try again.");
            setConfirmStatus("error");
            setTimeout(() => setShowLoader(false), 1000);
        }
    };

    const handleGuestAdd = () => {
        const totalAllowed = searchData?.adults + searchData?.children;
        const currentAdults = otherGuestDetail.filter(g => g.type === 'AD').length;
        const currentChildren = otherGuestDetail.filter(g => g.type === 'CH').length;
        if (otherGuestDetail.length >= totalAllowed) {
            return;
        }
        setOtherGuestError([])
        if (currentAdults < searchData?.adults) {
            setOtherGuestDetail([...otherGuestDetail, { firstName: '', lastName: '', type: 'AD' }]);
        } else if (currentChildren < searchData?.children) {
            setOtherGuestDetail([...otherGuestDetail, { firstName: '', lastName: '', type: 'CH' }]);
        }

    };
    const handleGuestRemove = (index) => {
        const updatedGuests = otherGuestDetail.filter((_, i) => i !== index);
        setOtherGuestDetail(updatedGuests);
    };
    const handleGuestChange = (e, index) => {
        const { name, value } = e.target;
        const updatedGuests = [...otherGuestDetail];
        updatedGuests[index][name] = value;
        setOtherGuestDetail(updatedGuests);

        const updatedErrors = [...otherGuestError];
        if (updatedErrors[index]?.[name]) {
            updatedErrors[index][name] = "";
            setOtherGuestError(updatedErrors);
        }
    };
    const handleLoaderComplete = () => {

    }
    return (
        <div>
            {showLoader && (
                <BookingLoader
                    error={loaderError}
                    showLoader={showLoader}
                    onComplete={handleLoaderComplete}
                    confirmStatus={confirmStatus}
                />
            )}
            <div className="alert alert-warning" role="alert">
               <GoCheckCircle size={18}/> Almost done! Just fill in the required info
            </div>

            {/* Lead Guest Info */}
            <div className="rounded border mt-3 p-3">
                <h5 className="mb-3">Lead Guest Information</h5>

                <div className="row mb-4 g-3">
                    {/* Title */}
                    <div className="col-md-6">
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
                        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>

                    {/* First Name */}
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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

                    {/* Country */}
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <label className="form-label">Phone Number*</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light">
                                {formData.phoneCode || "+__"}
                            </span>
                            <input
                                type="tel"
                                name="phone"
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
                </div>

                <hr />
                <p className="text-muted small">
                    This information will be used for all booking confirmations and
                    communications. Ensure that the name matches travel documents.
                </p>
            </div>
            <div className="rounded border mt-3 p-3">
                {/* Other Guest Info */}
                <button onClick={handleGuestAdd} className="btn btn-primary btn-sm ">+ Add New Guest</button>
                {otherGuestDetail.map((item, index) => (
                    <div key={index} className="row my-4">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <h5>Guest {index + 2} {item.type === 'CH' && <span style={{ fontSize: '12px' }} class="small bg-secondary-subtle rounded px-1 py-1">Child</span>}</h5>
                            <TiDeleteOutline onClick={() => handleGuestRemove(index)} className="text-danger cursor-pointer" size={20} />
                        </div>
                        <div className="col-12 col-md-6">
                            <label>First Name</label>
                            <input type="text" name="firstName" onChange={(e) => handleGuestChange(e, index)} value={item.firstName} placeholder="First Name" className={`form-control ${otherGuestError[index]?.firstName ? "is-invalid" : ""} `} />
                            {otherGuestError[index]?.firstName && <div className="invalid-feedback">{otherGuestError[index]?.firstName}</div>}
                        </div>
                        <div className="col-12 col-md-6">
                            <label>Last Name</label>
                            <input type="text" name="lastName" onChange={(e) => handleGuestChange(e, index)} value={item.lastName} placeholder="Last Name" className={`form-control ${otherGuestError[index]?.lastName ? "is-invalid" : ""} `} />
                            {otherGuestError[index]?.lastName && <div className="invalid-feedback">{otherGuestError[index]?.lastName}</div>}
                        </div>
                    </div>
                ))}
            </div>
            {/* Special Requests */}
            <div className="rounded border mt-3 p-3">
                <h5>Special requests</h5>
                <p className="mt-3 small">
                    Special requests cannot be guaranteed – but the property will do its
                    best to meet your needs.
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
            {/* Payment */}
            <div className="rounded border mt-3 p-3">
                <h5 className="mb-3">Payment</h5>
                <div className="row g-3">
                    <div className="col-12">
                        <p className="small">Choose your payment method</p>
                        <ul class="nav nav-pills nav-fill g-2">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#"><BiCreditCard size={20}/> Debit/Credit Card</a>
                            </li>
                            <li class="nav-item ">
                                <a class="nav-link bg-body-secondary" href="#"><BsBank size={18}/> Bank Transfer</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                            placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && (
                            <div className="invalid-feedback">{errors.cardNumber}</div>
                        )}
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                            placeholder="MM/YY"
                        />
                        {errors.expiry && (
                            <div className="invalid-feedback">{errors.expiry}</div>
                        )}
                    </div>

                    <div className="col-md-3">
                        <label className="form-label">CVV</label>
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                            placeholder="123"
                        />
                        {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                    </div>
                </div>
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
                    I agree to the <Link href="/terms-and-conditions">terms and conditions</Link>.
                </label>
                {errors.terms && (
                    <div className="text-danger small mt-1">{errors.terms}</div>
                )}
            </div>

            {/* Submit */}
            <div className="d-grid mt-4">
                <button
                    onClick={handleCheckout}
                    type="button"
                    className="btn btn-primary"
                >
                    Confirm Booking
                    {/* {isLoading ? (
                        <div class="spinner-border spinner-border-sm text-light" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Confirm Booking'
                    )} */}
                </button>
            </div>
        </div>
    );
}

