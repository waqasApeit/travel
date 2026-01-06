'use client'
import styles from "./Invoice.module.css";
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import HotelInvoiceLoader from "@/components/Loader/HotelInvoiceLoader";
import { PiPrinterThin } from "react-icons/pi";
import { PiDownloadSimpleThin } from "react-icons/pi";
import { Tooltip } from '@mantine/core';
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
export default function Page() {
    const { id } = useParams();
    const ref = useRef();
    const [voucherDetail, setVoucherDetail] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [clientDetail, setClientDetail] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
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
              "Access-Control-Allow-Origin": "*",
            },
                body: JSON.stringify({ 'invoice_number': id }),
            });
            const res = await responses.json();
            setIsLoading(false);
            if (res.success) {
                const duration = moment(res?.data?.check_out).diff(moment(res?.data?.check_in), 'days')
                res.data.nights = duration;
                setClientDetail(res?.data?.client);
                setVoucherDetail(res?.data);
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

        // Clone for consistent layout
        const clone = original.cloneNode(true);
        // Fix mobile responsive classes
        clone.querySelectorAll(`.${styles.invmobile100}`).forEach(elem => {
            elem.classList.remove(styles.invmobile100);
            elem.style.width = 'auto';  // Force desktop layout
        });
        // 🔹 Force desktop layout on clone before rendering to image
        clone.querySelectorAll("img").forEach(img => {
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

        Object.assign(clone.style, {
            width: "1000px",
            maxWidth: "1000px",
            position: "absolute",
            left: "0",
            top: "0",
            zIndex: "-1",
        });

        const content = clone.querySelector("#download_section");
        if (content) {
            content.querySelectorAll(".col-12").forEach(col => {
                    col.classList.remove("col-12");
                    col.classList.add("col-6");
            });
        }
        document.body.appendChild(clone);

        try {
            const dataUrl = await toPng(clone, { quality: 1, pixelRatio: 1.5, cacheBust: true });
            const pdf = new jsPDF("p", "pt", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(dataUrl);
            const imgWidth = pdfWidth;
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            // pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Add extra pages if needed
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(dataUrl, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`${voucherDetail?.invoice_number}.pdf`);
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally {
            document.body.removeChild(clone);
        }
    };

    return (
        <div>
            <div className={styles.invoicecontainerwrap}>
                <div className={styles.invoicecontainer}>
                    {isLoading ? (
                        <div className={styles.themeholyinvoice}>
                            <HotelInvoiceLoader />
                        </div>
                    ) : (
                        <main>
                            <div className={styles?.invoiceprintbutton}>
                                <Tooltip label='Download Invoice' color="blue">
                                    <div onClick={handleDownload} className="bg-primary-subtle cursor-pointer p-2 text-primary rounded"><PiDownloadSimpleThin size={25} /></div>
                                </Tooltip>
                                {/* <Tooltip label='Print Invoice' color="green">
                                    <div onClick={() => window.print()} className="bg-success-subtle cursor-pointer p-2 text-success rounded mt-2"><PiPrinterThin size={25} /></div>
                                </Tooltip> */}
                            </div>
                            <div ref={ref} id="voucher" className={styles.themeholyinvoice}>
                                <Image src={clientDetail?.header_image} height={150} width={1000} className="w-100 h-auto" quality={100} alt="Invoice Header" />
                                <div className={styles.downloadinner}>
                                    <header className="themeholy-header header-layout1">
                                        <div className={styles.headerbottom}>
                                            <div className="row align-items-center justify-content-between">
                                                <div className={`col-auto ${styles?.invmobile100} mb-2`}>
                                                    <div className={styles.headerbottomleft}>
                                                        <p><b className='text-black'>Guest Name : </b> {voucherDetail?.holder_details?.title} {voucherDetail?.holder_details?.name} {voucherDetail?.holder_details?.surname}</p>
                                                        <div className={styles.shape}></div>
                                                        <div className={styles.shape}></div>
                                                    </div>
                                                </div>
                                                <div className={`col-auto ${styles?.invmobile100}`}>
                                                    <div className={styles.headerbottomright}>
                                                        <div className={styles.shape}></div>
                                                        <div className={styles.shape}></div>
                                                        <p><b className='text-black'>Date: </b>{moment(voucherDetail?.created_at).format('LL')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </header>
                                    <div className="row justify-content-between">
                                        <div className="col-auto">
                                            <div className={styles.bookinginfo}>
                                                <p><b className='text-black'>Invoice No: </b> {voucherDetail?.invoice_number}</p>
                                                <p><b className='text-black'>HCN No: </b> </p>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className={styles.bookinginfo}>
                                                <p><b className='text-black'>Check In: </b> {moment(voucherDetail?.check_in).format('ll')}</p>
                                                <p><b className='text-black'>Check Out: </b> {moment(voucherDetail?.check_out).format('ll')}</p>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <div className={styles.bookinginfo}>
                                                <p><b className='text-black'>Duration: </b> {voucherDetail?.nights} {voucherDetail?.nights > 1 ? 'Nights' : 'Night'}</p>
                                                <p><b className='text-black'>Status: </b> {voucherDetail?.booking_status && voucherDetail?.booking_status.toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gx-0" id="download_section">
                                        <div className="col-12 col-md-6">
                                            <div className={`${styles.addressbox} ${styles.addressleft}`}>
                                                <b className='text-black'>Hosted Information:</b>
                                                <div>
                                                    {voucherDetail?.holder_details?.title} {voucherDetail?.holder_details?.name} {voucherDetail?.holder_details?.surname} <br />
                                                    Phone: {voucherDetail?.holder_details?.phone} <br />
                                                    Email: {voucherDetail?.holder_details?.email} <br />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className={`${styles.addressbox} ${styles.addressright}`}>
                                                <b className='text-black'>Hotel Details:</b>
                                                <div>
                                                    {voucherDetail?.hotel_details?.name} <br />
                                                    {voucherDetail?.hotel_details?.categoryName} <br />
                                                    {voucherDetail?.hotel_details?.destinationName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <table className={`${styles.invoicetable} w-100`}>
                                        <thead>
                                            <tr>
                                                <th>Description</th>
                                                <th>Rate</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voucherDetail?.rooms_details?.map((item, index) => (
                                                item?.rates?.map((rate, rateIndex) => (
                                                    <tr key={`${index}-${rateIndex}`}>
                                                        <td>{item.name}<br /><span className="small">{rate.boardName}</span></td>
                                                        <td>{rate?.rooms} Rooms x {voucherDetail?.nights} {voucherDetail?.nights > 1 ? 'Nights' : 'Night'} x {voucherDetail?.hotel_details?.currency} {item?.per_night_price}</td>
                                                        <td>
                                                            {voucherDetail?.hotel_details?.currency} {item?.booking_price}
                                                            {/* {rate.adults} {Number(rate.adults) > 1 ? 'Adults' : 'Adult'},
                                                            {' '}
                                                            {rate.children} {Number(rate.children) > 1 ? 'Children' : 'Child'} */}
                                                        </td>
                                                    </tr>
                                                ))
                                            ))}
                                            <tr>
                                                <td colspan="3">&nbsp;</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="row justify-content-between">
                                        <div className="col-auto mb-3">
                                            <div className="invoice-left">
                                                <b className='text-black'>Please Note:</b>
                                                <p className="mb-0">Amount payable is inclusive of central & state <br />
                                                    goods & services Tax act applicable slab rates. <br />
                                                    Please ask Hotel for invoice at the time of check-out.</p>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <table className={`${styles.totaltable} w-100`}>
                                                <tr>
                                                    <th className='text-black'>Sub Total:</th>
                                                    <td>{voucherDetail?.hotel_details?.currency} {voucherDetail?.pricing?.booking_amount}</td>
                                                </tr>
                                                <tr>
                                                    <th className='text-black'>Total:</th>
                                                    <td>{voucherDetail?.hotel_details?.currency} {voucherDetail?.pricing?.booking_amount}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <p className={`${styles.invoicenote} mt-3 text-center mt-5`}>
                                        <b className='text-black'>NOTE: </b>This is computer generated receipt and does not require physical signature.
                                    </p>
                                </div>
                                <Image src={clientDetail?.footer_image} height={150} width={1000} className="w-100 h-auto" quality={100} alt="Invoice Footer" />
                            </div>
                        </main>
                    )}
                     {!isLoading && !errorMessage && (
                                    <div className="mt-2 text-center">
                                        <Link href={`/hotels/voucher/${voucherDetail?.invoice_number}`}><button className="btn btn-success mx-1" ><FaFileInvoice /> View Voucher</button></Link>
                                    </div>
                                )}
                </div>
            </div>
        </div>
    )
}
