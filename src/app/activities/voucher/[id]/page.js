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
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
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
        "FAST"
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
          "FAST"
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
        <div className={styles.invoicecontainer}>
          {isLoading ? (
            <div className={styles.themeholyinvoice}>
              <HotelInvoiceLoader />
            </div>
          ) : (
            <main className="text-black">
              <div ref={ref} id="voucher" className={styles.themeholyinvoice}>
                <Image
                  src={voucherDetail?.client?.header_image}
                  height={150}
                  width={1000}
                  className="w-100 h-auto"
                  quality={100}
                  alt="Invoice Header"
                />
                <div className={styles.downloadinner}>
                  <header className="themeholy-header header-layout1">
                    <div className="row gx-0 justify-content-between my-4">
                      <div className="col-6">
                        <div className={`${styles.infobox2} text-start`}>
                          <b className="text-black">Voucher No:</b> <br />
                          <span>{voucherDetail?.booking_reference}</span>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className={`${styles.infobox2} text-end`}>
                          <b className="text-black">Booking Date:</b> <br />
                          <span>
                            {moment(Date(voucherDetail?.created_at)).format(
                              "DD-MM-YYYY"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </header>
                  <h6 className="mb-2 text-black">Booked By</h6>
                  <table
                    className={`${styles.invoicetable} ${styles.tablestripe3} w-100`}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Status</th>
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
                          Email: {voucherDetail?.lead_email} <br /> Phone No:{" "}
                          {voucherDetail?.lead_phone}
                        </td>
                        <td> {voucherDetail?.lead_gender}</td>
                        <td> {voucherDetail?.lead_country}</td>
                        <td> {capitalize(voucherDetail?.booking_status)}</td>
                      </tr>
                      <tr className="border">
                        <td colSpan={5}>
                          <span className="text-black">Address:</span>{" "}
                          {voucherDetail?.lead_address}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {(voucherDetail?.other_passengers?.additional_adults?.length >
                    0 ||
                    voucherDetail?.additional_adults?.children_details?.length >
                      0 ||
                    voucherDetail?.additional_adults?.infants_details?.length >
                      0) && (
                    <div>
                      <h6 className="mb-2 text-black">Additional Guests</h6>
                      <table
                        className={`${styles.invoicetable} ${styles.tablestripe3} w-100`}
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Type</th>
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
                            )
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
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <h6 className="mb-2 text-black">Activity Details</h6>
                  <table
                    className={`${styles.invoicetable} ${styles.tablestripe3} w-100`}
                  >
                    <thead>
                      <tr>
                        <th colSpan={3}>
                          Name: {voucherDetail?.activity?.title}
                          <br />
                          <span className="text-muted">
                            <FaLocationDot /> {voucherDetail?.activity?.address}
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          Selected Date:{" "}
                          {moment(voucherDetail?.travel_date).format(
                            "DD-MM-YYYY"
                          )}
                        </td>
                        <td>
                          Duration: {voucherDetail?.activity?.activity_duration}
                        </td>
                        <td>
                          Rating: {voucherDetail?.activity?.rating_stars} star
                          <br />
                          <span className="ms-1">
                            {Array.from({ length: 5 }).map((_, index) => {
                              const rating = Number(
                                voucherDetail?.activity?.rating_stars
                              );
                              const fullStars = Math.floor(rating);
                              const hasHalfStar = rating - fullStars >= 0.5;

                              if (index < fullStars) {
                                // Full star
                                return (
                                  <FaStar
                                    key={index}
                                    className="text-warning me-1"
                                  />
                                );
                              } else if (index === fullStars && hasHalfStar) {
                                // Half star
                                return (
                                  <FaStarHalfAlt
                                    key={index}
                                    className="text-warning me-1"
                                  />
                                );
                              } else {
                                // Empty star
                                return (
                                  <FaRegStar
                                    key={index}
                                    className="text-warning me-1"
                                  />
                                );
                              }
                            })}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <h6 className="mb-2 text-black">Traveler Details</h6>
                    <table
                      className={`${styles.invoicetable} ${styles.tablestripe3} w-100`}
                    >
                      <thead>
                        <tr className="text-center">
                          <th>Name</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td>Adult{voucherDetail?.adults !== 1 ? "s" : ""}</td>
                          <td>{voucherDetail?.adults} </td>
                        </tr>
                        {voucherDetail?.children > 0 && (
                          <tr className="text-center">
                            <td>
                              Child{voucherDetail?.children !== 1 ? "ren" : ""}
                            </td>
                            <td>{voucherDetail?.children}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {voucherDetail?.additional_services &&
                    voucherDetail?.additional_services.length > 0 && (
                      <div>
                        <h6 className="mb-2 text-black">
                          Additional Services Details
                        </h6>
                        <table
                          className={`${styles.invoicetable} ${styles.tablestripe3} w-100`}
                        >
                          <thead>
                            <tr className="text-center">
                              <th>Name</th>
                              <th>Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {voucherDetail?.additional_services.map(
                              (item, index) => (
                                <tr className="text-center" key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.quantity}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  <p className={`${styles.invoicenote} mt-3 text-center mt-5`}>
                    <b className="text-black">NOTE: </b>This is computer
                    generated receipt and does not require physical signature.
                  </p>
                </div>
                <Image
                  src={voucherDetail?.client?.footer_image}
                  height={150}
                  width={1000}
                  className="w-100 h-auto"
                  quality={100}
                  alt="Invoice Footer"
                />
              </div>
            </main>
          )}
          {!isLoading && !errorMessage && (
            <div className="mt-2 text-center">
              <button className="btn btn-success mx-1" onClick={handleDownload}>
                <MdOutlineFileDownload /> Download PDF
              </button>
              <button
                className="btn btn-success mx-1"
                onClick={() => window.print()}
              >
                <FaPrint /> Print
              </button>
              <Link
                href={`/activities/invoice/${voucherDetail?.booking_reference}`}
              >
                <button className="btn btn-success mx-1">
                  <FaFileInvoice /> View Invoice
                </button>
              </Link>
              <Link href="/">
                <button className="btn btn-success mx-1">
                  <FaHome /> Go to Home
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
