"use client";
import { useState } from "react";
import styles from "../ContactUs.module.css";
import { notifications } from "@mantine/notifications";
import { FaPaperPlane } from "react-icons/fa";
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

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!res.ok) throw new Error("Failed to submit");
      const response = await res.json();
      notifications.show({
        title: "Success",
        message: response?.Description,
        color: "green",
      });
      setFormData(initialState);
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className={styles.iconPrimary}>
          <FaPaperPlane />
        </div>
        <h2 className={styles.heading}>Send Us a Message</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-sm-6">
            <label className={styles.label}>Your Name</label>
            <input
              type="text"
              className="form-control form-control"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          <div className="col-sm-6">
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              className="form-control form-control"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

          <div className="col-12">
            <label className={styles.label}>Subject</label>
            <input
              type="text"
              className="form-control form-control"
              placeholder="How can we help?"
              value={formData.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <small className="text-danger">{errors.subject}</small>
            )}
          </div>

          <div className="col-12">
            <label className={styles.label}>Your Message</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Tell us more about your inquiry..."
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && (
              <small className="text-danger">{errors.message}</small>
            )}
          </div>

          <div className="col-12">
            <button
              type="submit"
              className={`btn text-light btn-lg ${styles.exploreBtn}`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
