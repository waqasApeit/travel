"use client";

import React, { useState } from "react";
export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const currentYear = new Date().getFullYear();
  const islamicYear = currentYear - 579;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your interest! We will contact you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12 col-12 mt-2">
          <label className="form-label">First Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Last Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Email</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Country</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">City</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Number of Passengers</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6 col-sm-12 col-12  mt-2">
          <label className="form-label">Postal Code</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-12 col-sm-12 col-12  mt-2">
          <label className="form-label">Street Address</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Submit Interest
      </button>
    </form>
  );
}
