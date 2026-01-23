"use client";
import styles from "../../invoice/[id]/invoice.module.css";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotelInvoiceLoader from "@/components/Loader/HotelInvoiceLoader";
import { toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import {
  FaFileInvoice,
  FaHome,
  FaPrint,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import Link from "next/link";
export default function Page() {
  const { id } = useParams();
  const ref = useRef();
  const [voucherDetail, setVoucherDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    setIsLoading(true);
    try {
      const responses = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/booking/${id}`,
        {
          method: "GET",
          headers: {
            // 'ngrok-skip-browser-warning': 'true',
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
        },
      );
      const res = await responses.json();
      setIsLoading(false);
      if (res.Success) {
        setVoucherDetail(res?.Content?.booking);
        // console.log("Voucher Details:", res?.Content);
      } else {
        setErrorMessage(res?.message);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching hotel details:", err);
    }
  };

  const handleDownload = async () => {
    const original = ref.current;
    if (!original) return;

    // Clone for consistent layout
    const clone = original.cloneNode(true);
    // Fix mobile responsive classes
    clone.querySelectorAll(`.${styles.invmobile100}`).forEach((elem) => {
      elem.classList.remove(styles.invmobile100);
      elem.style.width = "auto"; // Force desktop layout
    });
    // 🔹 Force desktop layout on clone before rendering to image
    clone.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });

    clone.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && src.startsWith("/_next/image")) {
        // Remove the wrapper URL so it points to actual static image
        const urlParams = new URLSearchParams(src.split("?")[1]);
        const actualSrc = urlParams.get("url");
        if (actualSrc) img.src = actualSrc;
      }
    });

    // Constrain header/footer images so they don't take excessive vertical space in the PDF
    clone.querySelectorAll("img").forEach((img) => {
      const src = (img.getAttribute("src") || "").toLowerCase();
      try {
        if (src.includes("/images/header.png")) {
          img.style.width = "1000px";
          img.style.maxWidth = "100%";
          img.style.height = "80px";
          img.style.objectFit = "contain";
          img.style.display = "block";
        }
        if (src.includes("/images/footer.png")) {
          img.style.width = "1000px";
          img.style.maxWidth = "100%";
          img.style.height = "90px";
          img.style.objectFit = "contain";
          img.style.display = "block";
          img.style.marginTop = "12px";
        }
      } catch (e) {
        // ignore
      }
    });

    // Increase capture width to improve text sharpness (approx A4 @ ~300 DPI with pixelRatio 2)
    Object.assign(clone.style, {
      width: "1240px",
      maxWidth: "1240px",
      position: "absolute",
      left: "0",
      top: "0",
      zIndex: "-1",
    });

    const content = clone.querySelector("#download_section");
    if (content) {
      content.querySelectorAll(".col-12").forEach((col) => {
        col.classList.remove("col-12");
        col.classList.add("col-6");
      });
    }
    document.body.appendChild(clone);

    try {
      // Higher pixelRatio boosts clarity; JPEG quality balances size vs. fidelity
      const dataUrl = await toJpeg(clone, {
        quality: 0.8,
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      const pdf = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: "a4",
        compressPdf: true,
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      // pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
      heightLeft -= pdfHeight;

      // Add extra pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          dataUrl,
          "JPEG",
          0,
          position,
          imgWidth,
          imgHeight,
          undefined,
          "FAST",
        );
        heightLeft -= pdfHeight;
      }

      pdf.save(`${voucherDetail?.booking_reference}-voucher.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      document.body.removeChild(clone);
    }
  };

  function capitalize(text) {
    if (!text) return "";
    const s = String(text);
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return (
    <div>
      <div className={styles.invoicecontainerwrap}>
        <div className="container py-4">
          <div className={`${styles.invoicecontainer} mx-auto`}>
            {isLoading ? (
              <div className="card border-0 shadow-lg">
                <div className="card-body">
                  <HotelInvoiceLoader />
                </div>
              </div>
            ) : (
              <main>
                <div
                  ref={ref}
                  id="voucher"
                  className={`${styles.invoiceCard} card border-0 shadow-lg`}
                >
                  <div>
                    <Image
                      src={voucherDetail?.client?.client_images?.header_image}
                      height={150}
                      width={1000}
                      className="w-100 h-auto"
                      quality={100}
                      alt="Invoice Header"
                    />
                    {/* <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-3">
                        <div className={styles.logoBox}>
                          <FaFileInvoice size={24} />
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold">TravelLux</h5>
                          <small className="text-white-50">PREMIUM BOOKINGS</small>
                        </div>
                      </div>
                      <div className="text-end">
                        <small className="d-block">support@travellux.com</small>
                        <small>+44 20 7946 0958</small>
                      </div>
                    </div> */}
                  </div>
                  <div className="card-body p-4">
                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <div className={styles.infoCard}>
                          <small className={styles.infoLabel}>VOUCHER NO</small>
                          <div className={styles.infoValue}>
                            {voucherDetail?.booking_reference}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className={styles.infoCard}>
                          <small className={styles.infoLabel}>
                            BOOKING DATE
                          </small>
                          <div className={styles.infoValue}>
                            {moment(Date(voucherDetail?.created_at)).format(
                              "DD-MM-YYYY",
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className={styles.infoCard}>
                          <small className={styles.infoLabel}>STATUS</small>
                          <div
                            className={`${styles.infoValue} ${styles.statusConfirmed}`}
                          >
                            {capitalize(voucherDetail?.booking_status)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h6 className={styles.sectionTitle}>Booked By</h6>
                      <div className="table-responsive">
                        <table className={`${styles.modernTable} table mb-0`}>
                          <thead>
                            <tr>
                              <th>NAME</th>
                              <th>CONTACT</th>
                              <th>GENDER</th>
                              <th>COUNTRY</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                {voucherDetail?.lead_title}{" "}
                                {voucherDetail?.lead_first_name}{" "}
                                {voucherDetail?.lead_last_name}
                              </td>
                              <td>
                                <div>Email: {voucherDetail?.lead_email}</div>
                                <div>Phone: {voucherDetail?.lead_phone}</div>
                              </td>
                              <td>{voucherDetail?.lead_gender}</td>
                              <td>{voucherDetail?.lead_country}</td>
                            </tr>
                            <tr className={styles.addressRow}>
                              <td colSpan={4}>
                                <strong>Address:</strong>{" "}
                                {voucherDetail?.lead_address}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {(voucherDetail?.other_passengers?.additional_adults
                      ?.length > 0 ||
                      voucherDetail?.other_passengers?.children_details
                        ?.length > 0 ||
                      voucherDetail?.other_passengers?.infants_details?.length >
                        0) && (
                      <div className="mb-4">
                        <h6 className={styles.sectionTitle}>
                          Additional Guests
                        </h6>
                        <div className="table-responsive">
                          <table className={`${styles.modernTable} table mb-0`}>
                            <thead>
                              <tr>
                                <th>NAME</th>
                                <th>GENDER</th>
                                <th>TYPE</th>
                              </tr>
                            </thead>
                            <tbody>
                              {voucherDetail?.other_passengers?.additional_adults.map(
                                (adult, index) => (
                                  <tr key={index}>
                                    <td>
                                      {adult.first_name} {adult.last_name}
                                    </td>
                                    <td>{adult.gender}</td>
                                    <td>Adult</td>
                                  </tr>
                                ),
                              )}
                              {voucherDetail?.other_passengers?.children_details.map(
                                (child, index) => (
                                  <tr key={index}>
                                    <td>
                                      {child.first_name} {child.last_name}
                                    </td>
                                    <td>{child.gender}</td>
                                    <td>Child</td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    <div className="mb-4">
                      <h6 className={styles.sectionTitle}>Activity Details</h6>
                      <div className={styles.activityCard}>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h6 className="mb-1 fw-bold">
                              {voucherDetail?.activity?.title}
                            </h6>
                            <small className="text-muted">
                              <FaLocationDot />{" "}
                              {voucherDetail?.activity?.address}
                            </small>
                          </div>
                          <div className="text-end">
                            <div className="mb-1">
                              {Array.from({ length: 5 }).map((_, index) => {
                                const rating = Number(
                                  voucherDetail?.activity?.rating_stars,
                                );
                                const fullStars = Math.floor(rating);
                                const hasHalfStar = rating - fullStars >= 0.5;

                                if (index < fullStars) {
                                  return (
                                    <FaStar
                                      key={index}
                                      className="text-danger me-1"
                                      size={14}
                                    />
                                  );
                                } else if (index === fullStars && hasHalfStar) {
                                  return (
                                    <FaStarHalfAlt
                                      key={index}
                                      className="text-danger me-1"
                                      size={14}
                                    />
                                  );
                                } else {
                                  return (
                                    <FaRegStar
                                      key={index}
                                      className="text-danger me-1"
                                      size={14}
                                    />
                                  );
                                }
                              })}
                            </div>
                            <small className="text-muted">
                              {voucherDetail?.activity?.rating_stars} / 5
                            </small>
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className={styles.activityInfoItem}>
                              <small className="text-muted">
                                CHECK IN DATE
                              </small>
                              <div className="fw-semibold">
                                {moment(voucherDetail?.travel_date).format(
                                  "DD-MM-YYYY",
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className={styles.activityInfoItem}>
                              <small className="text-muted">DURATION</small>
                              <div className="fw-semibold">
                                {voucherDetail?.activity?.activity_duration}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h6 className={styles.sectionTitle}>Traveler Details</h6>
                      <div className="table-responsive">
                        <table className={`${styles.modernTable} table mb-0`}>
                          <thead>
                            <tr>
                              <th>CATEGORY</th>
                              <th>QUANTITY</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Adults</td>
                              <td>{voucherDetail?.adults}</td>
                            </tr>
                            {voucherDetail?.children > 0 && (
                              <tr>
                                <td>Children</td>
                                <td>{voucherDetail?.children}</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {voucherDetail?.additional_services &&
                      voucherDetail?.additional_services.length > 0 && (
                        <div className="mb-4">
                          <h6 className={styles.sectionTitle}>
                            Additional Services
                          </h6>
                          <div className="table-responsive">
                            <table
                              className={`${styles.modernTable} table mb-0`}
                            >
                              <thead>
                                <tr>
                                  <th>NAME</th>
                                  <th>QUANTITY</th>
                                </tr>
                              </thead>
                              <tbody>
                                {voucherDetail?.additional_services.map(
                                  (item, index) => (
                                    <tr key={index}>
                                      <td>{item.name}</td>
                                      <td>{item.quantity}</td>
                                    </tr>
                                  ),
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    <div className={styles.footerNote}>
                      <small>
                        <strong>NOTE:</strong> This is a computer generated
                        voucher and does not require physical signature.
                      </small>
                    </div>
                    <div>
                      <Image
                        src={voucherDetail?.client?.client_images?.footer_image}
                        height={150}
                        width={1000}
                        className="w-100 h-auto"
                        quality={100}
                        alt="Invoice Footer"
                      />
                    </div>
                  </div>
                </div>
              </main>
            )}
            {!isLoading && !errorMessage && (
              <div className="d-flex flex-wrap gap-3 justify-content-center mt-4 pb-3 printActions">
                <button
                  className={`${styles.actionBtn} ${styles.printBtn}`}
                  onClick={() => window.print()}
                >
                  <FaPrint size={16} /> Print / Save
                </button>
                <Link
                  href={`/activities/invoice/${voucherDetail?.booking_reference}`}
                >
                  <button
                    className={`${styles.actionBtn} ${styles.voucherBtn}`}
                  >
                    <FaFileInvoice size={16} /> View Invoice
                  </button>
                </Link>
                <Link href="/">
                  <button className={`${styles.actionBtn} ${styles.homeBtn}`}>
                    <FaHome size={16} /> Go to Home
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
