"use client";
import styles from "./Voucher.module.css";
import {
    FaCalendarAlt,
    FaInfoCircle,
    FaFileInvoice,
    FaMoon
} from "react-icons/fa";
import moment from "moment";
import { MdOutlineFileDownload } from "react-icons/md";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotelVoucherLoader from "@/components/Loader/HotelVoucherLoader";
import { IoWarningOutline } from "react-icons/io5";
import QRCode from "react-qr-code";
import Link from "next/link";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
const Page = () => {
    const { id } = useParams();
    const ref = useRef();
    const [voucherDetail, setVoucherDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [clientDetail, setClientDetail] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [voucherUrl, setVoucherUrl] = useState("");
    useEffect(() => {
        if (typeof window !== "undefined") {
            const baseUrl = window.location.href; // dynamically get current domain
            setVoucherUrl(baseUrl);
        }
        fetchDetails();
    }, [id]);

    const fetchDetails = async () => {
        setIsLoading(true);
        try {
            const responses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/booking/details`, {
                method: 'POST',
                  headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
            //   "Access-Control-Allow-Origin": "*",
            },
                body: JSON.stringify({ 'invoice_number': id }),
            });
            const res = await responses.json();
            setIsLoading(false);
            if (res.success) {
                setVoucherDetail(res?.data);
                setClientDetail(res?.data?.client);
            } else {
                setErrorMessage(res?.message)
            }
        } catch (err) {
            setIsLoading(false);
            console.error("Error fetching hotel details:", err);
        }
    };


    const handleDownload = async () => {
        const original = ref.current;
        if (!original) return;

        // Create offscreen container
        const offscreen = document.createElement('div');
        Object.assign(offscreen.style, {
            position: 'fixed',
            top: '-9999px',
            left: '-9999px',
            width: '1000px',
            // visibility: 'hidden',
            pointerEvents: 'none',
            background: 'white',
            fontFamily: 'Arial, sans-serif', // Ensure font rendering
        });

        // Clone the invoice
        const clone = original.cloneNode(true);

        // Remove mobile classes
        clone.querySelectorAll(`.${styles.invmobile100}`).forEach(elem => {
            elem.classList.remove(styles.invmobile100);
            elem.style.width = 'auto';
        });

        // Force eager loading + fix Next/Image URLs
        clone.querySelectorAll("img").forEach(img => {
            img.loading = "eager";
            const src = img.getAttribute("src");
            if (src && src.startsWith("/_next/image")) {
                const urlParams = new URLSearchParams(src.split("?")[1]);
                const actualSrc = urlParams.get("url");
                if (actualSrc) img.src = actualSrc;
            }
        });

        // Fix column layout for PDF
        clone.querySelectorAll('.pdf-col-6').forEach(col => {
            if (col.classList.contains("col-12")) {
                col.classList.remove("col-12");
                col.classList.add("col-6");
            }
        });
        clone.querySelectorAll('.pdf-col-4').forEach(col => {
            if (col.classList.contains("col-12")) {
                col.classList.remove("col-12");
                col.classList.add("col-4");
            }
        });

        // Append clone to offscreen
        offscreen.appendChild(clone);
        document.body.appendChild(offscreen);

        try {
            // Wait for images to load
            await Promise.all(
                Array.from(clone.querySelectorAll("img")).map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );

            // Force layout recalculation
            clone.offsetHeight;

            // Capture the CLONE, not the container
            const dataUrl = await toPng(clone, {
                quality: 1,
                pixelRatio: 1.2,
                cacheBust: true,
                style: {
                    margin: 0,
                    padding: 0,
                },
            });

            // Generate PDF
            const pdf = new jsPDF("p", "pt", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const imgProps = pdf.getImageProperties(dataUrl);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`${voucherDetail.invoice_number}.pdf`);
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            if (offscreen.parentNode) {
                offscreen.parentNode.removeChild(offscreen);
            }
        }
    };
    return (
        <div className='py-5'>
            {isLoading ? (
                <div className={`container px-0 ${styles.confirmationWrapper}`}>
                    <div className="bg-white rounded shadow p-2">
                        <HotelVoucherLoader />
                    </div>
                </div>
            ) : (
                <div ref={ref} className={`container px-0 ${styles.confirmationWrapper}`}>
                    {/* Details Section */}
                    {errorMessage ? (
                        <div className="bg-white shadow text-center p-5 rounded">
                            <IoWarningOutline className="text-warning" size={120} />
                            <h5 className="mt-4">{errorMessage}</h5>
                        </div>
                    ) : (
                        <div>
                            <div className="bg-white shadow ">
                                <Image src={clientDetail?.header_image} height={150} width={1000} className="w-100 h-auto" quality={100} alt="Invoice Header" />
                                <div className={`${styles.header} text-black  px-3 my-2 position-relative`}>
                                    <div>
                                        <p className="mb-1 small opacity-75">CONFIRMATION NUMBER</p>
                                        <h4 className="fw-bold">{voucherDetail?.invoice_number}</h4>
                                        <p className="mb-0 small">Booking Status : {voucherDetail?.booking_status && voucherDetail?.booking_status.toUpperCase()}</p>
                                    </div>
                                    <div className={`${styles.qrIcon} position-absolute`}>
                                        <QRCode
                                            value={voucherUrl}
                                            size={75}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                        />
                                    </div>
                                </div>
                                <div className="row gy-4  p-4">
                                    {/* Guest Name */}
                                    <div className="col-12 col-md-6 pdf-col-6" >
                                        <h6 className="text-muted mb-1">GUEST NAME</h6>
                                        <h5 className="fw-semibold">{voucherDetail?.holder_details?.title} {voucherDetail?.holder_details?.name} {voucherDetail?.holder_details?.surname}</h5>
                                    </div>

                                    {/* Hotel */}
                                    <div className="col-12 col-md-6 pdf-col-6" >
                                        <h6 className="text-muted mb-1">HOTEL</h6>
                                        <h5 className="fw-semibold">{voucherDetail?.hotel_details?.name}</h5>
                                    </div>

                                    <div className="col-12 col-md-6 pdf-col-6" >
                                        <h6 className="text-muted mb-1">HCN No</h6>
                                        <h5 className="fw-semibold">------------</h5>
                                    </div>
                                    <div className="col-12 col-md-6 pdf-col-6" >
                                        <h6 className="text-muted mb-1">Booking Date</h6>
                                        <h5 className="fw-semibold">{moment(voucherDetail?.created_at).format('LL')}</h5>
                                    </div>

                                    {/* Check-in / Check-out */}
                                    <div className=" col-12 col-md-6 col-lg-4 pdf-col-4">
                                        <div className={`${styles.infoCard} d-flex flex-column`}>
                                            <FaCalendarAlt className="mb-2 text-warning" size={20} />
                                            <h6 className="fw-semibold mb-0">CHECK-IN</h6>
                                            <p className="mb-0">{moment(voucherDetail?.check_in).format('LL')}</p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 pdf-col-4">
                                        <div className={`${styles.infoCard} d-flex flex-column`}>
                                            <FaCalendarAlt className="mb-2 text-warning" size={20} />
                                            <h6 className="fw-semibold mb-0">CHECK-OUT</h6>
                                            <p className="mb-0">{moment(voucherDetail?.check_out).format('LL')}</p>
                                        </div>
                                    </div>

                                    {/* Guests & Nights */}
                                    <div className="col-12 col-md-6 col-lg-4 pdf-col-4">
                                        <div className={`${styles.infoCard} d-flex flex-column`}>
                                            <FaMoon className="mb-2 text-warning" size={20} />
                                            <h6 className="fw-semibold mb-0">NIGHTS</h6>
                                            <p className="mb-0">{moment(voucherDetail?.check_out).diff(moment(voucherDetail?.check_in), 'days')} {moment(voucherDetail?.check_out).diff(moment(voucherDetail?.check_in), 'days') > 1 ? 'Nights' : 'Night'}</p>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <h6>Room Details</h6>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Sr</th>
                                                    <th>Name/Type</th>
                                                    <th>Passenger</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {voucherDetail?.rooms_details?.map((item, index) => (
                                                    item?.rates?.map((rate, rateIndex) => (
                                                        <tr key={`${index}-${rateIndex}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name} | {rate.boardName}</td>
                                                            <td>
                                                                {rate.adults} {Number(rate.adults) > 1 ? 'Adults' : 'Adult'},
                                                                {' '}
                                                                {rate.children} {Number(rate.children) > 1 ? 'Children' : 'Child'}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Important Information */}
                                    <div className="col-12 mt-4">
                                        <div className={`${styles.infoBox} rounded p-3`}>
                                            <div className="d-flex align-items-center mb-2">
                                                <FaInfoCircle className="text-primary me-2" />
                                                <h6 className="fw-semibold mb-0">Important Information</h6>
                                            </div>
                                            <ul className="mb-0 small ps-4 text-muted">
                                                <li>Please arrive 15 minutes before check-in time</li>
                                                <li>Valid ID required at check-in</li>
                                                <li>Smoking is strictly prohibited in all indoor areas</li>
                                                <li>Pets are not allowed unless stated otherwise</li>
                                                <li>Visitors are allowed only with prior approval from the reception</li>
                                                <li>Loss or damage to hotel property may incur additional charges</li>
                                                <li>Wi-Fi access is available throughout the property</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center small bg-primary p-2  bg-opacity-25">
                                This voucher is valid only for the specified dates and guest. Please keep this confirmation for your records.
                            </div>
                            <Image src={clientDetail?.footer_image} height={150} width={1000} className="w-100 h-auto" quality={100} alt="Invoice Footer" />
                        </div>
                    )}
                </div>
            )}
            {!isLoading && !errorMessage && (
                <div className="mt-2 text-center">
                    <button className="btn btn-success mx-1" onClick={handleDownload}><MdOutlineFileDownload /> Download PDF</button>
                    <Link href={`/hotels/invoice/${voucherDetail?.invoice_number}`}><button className="btn btn-success mx-1" ><FaFileInvoice /> View Invoice</button></Link>
                </div>
            )}
        </div>
    );
};

export default Page;
