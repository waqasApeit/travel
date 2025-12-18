'use client'
import { useState } from "react";
import styles from "../ContactUs.module.css";
import { notifications } from "@mantine/notifications";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};
export default function Form() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // remove error on typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");
      const response = await res.json();
      notifications.show({
        title: 'Success',
        message: response?.Description,
        color: 'green',
      });
      setFormData(initialState);
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactform}>
      <form onSubmit={handleSubmit} className="php-email-form">
        <div className="row gy-4">

          {/* Name */}
          <div className="col-md-6">
            <label className="pb-2">Your Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="pb-2">Your Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          {/* Subject */}
          <div className="col-md-12">
            <label className="pb-2">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-control"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && <small className="text-danger">{errors.subject}</small>}
          </div>

          {/* Message */}
          <div className="col-md-12">
            <label className="pb-2">Message</label>
            <textarea
              name="message"
              rows="8"
              className="form-control"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <small className="text-danger">{errors.message}</small>}
          </div>

          {/* Success Message */}
          {errorMsg && (
            <div className="col-md-12 text-success text-center">
              {errorMsg}
            </div>
          )}

          {/* Button */}
          <div className="col-md-12 text-center">
            <button
              className="btn btn-success w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
