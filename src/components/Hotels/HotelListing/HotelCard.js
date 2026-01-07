"use client";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { useHotelList } from "./HotelListingContext";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import { FaHome, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { LiaAngleRightSolid } from "react-icons/lia";
import { ProviderCodeList } from "@/util/ProviderCodeList";
import { useQuery } from "@tanstack/react-query";
export default function HotelCard({ isLoading }) {
  const searchParams = useSearchParams();
  const { hotels } = useHotelList();
  const check_in = searchParams.get("checkIn");
  const check_out = searchParams.get("checkOut");
  const daysDiff = moment(check_out).diff(moment(check_in), "days");
  // const [hotelDetails, setHotelDetails] = useState({});

  const makingSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };
  //   useEffect(() => {
  //   if (hotels.length > 0) {
  //     const fetchDetails = async () => {
  //       for (const hotel of hotels) {
  //         try {
  //           const responses = await fetch(`https://proresearch-edwin-flashiest.ngrok-free.dev/api/hotel/basic/details`, {
  //             method: 'POST',
  //             cache: 'no-store',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'ngrok-skip-browser-warning': 'true',
  //             },
  //             body: JSON.stringify({ "provider": hotel.provider, "hotelId": hotel.id, "checkIn": check_in, "checkOut": check_out }),
  //           })
  //           const res = await responses.json();
  //           setHotelDetails(prev => ({
  //             ...prev,
  //             [res.data.hotel_code ? res.data.hotel_code : hotel.id ]: {
  //               images: Array.isArray(res.data.main_images) && res.data.main_images.length > 0 ? res.data.main_images[0].url || '' : '',
  //               address: res.data.address || '',
  //               facilities: res.data.facilities || []
  //             }
  //           }));
  //         } catch (err) {
  //           console.error("Error fetching hotel details:", err);
  //         }
  //       }
  //     };

  //     fetchDetails();
  //   }
  // }, [hotels]);

  const ProviderShortNames = (provider) => {
    if (!provider) return "";
    const providerFind = ProviderCodeList.find(
      (item) => item.name === provider.toLowerCase()
    );
    return providerFind?.code;
  };

  const SetRoomsData = (id) => {
    const selectedHotel = hotels.find((hotel) => hotel.id === id);
    if (selectedHotel) {
      localStorage.setItem(
        "roomSelection",
        JSON.stringify(selectedHotel.rooms)
      );
    }
  };
  // track image fallback state per hotel id
  const [imgFallbacks, setImgFallbacks] = useState({});

  // Normalize incoming image URLs to ensure they include a protocol; if not, return a safe placeholder
  const normalizeImageSrc = (raw) => {
    if (!raw) return "/images/hotelloadimg.jpg";
    // If already a data URL or local path, return as-is
    if (raw.startsWith("data:") || raw.startsWith("/")) return raw;
    // If absolute with protocol, return as-is
    if (/^https?:\/\//i.test(raw)) return raw;
    // If protocol-relative (//example.com/path) prefix with current protocol
    if (raw.startsWith("//")) {
      if (typeof window !== "undefined") return window.location.protocol + raw;
      return "https:" + raw;
    }
    // If looks like host/path (e.g. 127.0.0.1/...), prefix with http://
    return "http://" + raw.replace(/^\/+/, "");
  };

  const handleImageError = (hotelId) => {
    setImgFallbacks((prev) => ({ ...prev, [hotelId]: true }));
  };

  const fetchHotelDetails = async () => {
    const results = {};

    for (const hotel of hotels) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/basic/details`,
          {
            method: "POST",
              headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              provider: hotel.provider,
              hotelId: hotel.id,
              checkIn: check_in,
              checkOut: check_out,
            }),
          }
        );

        const res = await response.json();
        results[res.data.hotel_code ? res.data.hotel_code : hotel.id] = {
          images:
            Array.isArray(res.data.main_images) &&
            res.data.main_images.length > 0
              ? res.data.main_images[0].url || ""
              : "",
          address: res.data.address || "",
          facilities: res.data.facilities || [],
        };
      } catch (err) {
        console.error("Error fetching hotel details:", err);
      }
    }

    return results;
  };

  // -------------------------------
  // 🔹 Use React Query for caching and fetching
  // -------------------------------
  const { data: hotelDetails = {}, isFetching } = useQuery({
    queryKey: ["hotelDetails", hotels, check_in, check_out],
    queryFn: fetchHotelDetails,
    enabled: hotels.length > 0,
    cacheTime: 20 * 60 * 1000, // 20 minutes
    staleTime: 20 * 60 * 1000, // 20 minutes (data stays "fresh")
    refetchOnWindowFocus: false, // prevent refetching when switching tabs
    refetchOnMount: false,
  });

  return (
    <div className="container hotel-card">
      {hotels.length === 0 && isLoading === false && (
        <div className="alert alert-warning text-center" role="alert">
          <strong>No hotels</strong> found for the selected criteria. Please try
          adjusting your search.
          <br />
          <Link href="/">
            <button className="btn btn-success mt-2">
              <FaHome size={15} /> Go to Home
            </button>
          </Link>
        </div>
      )}
      <div className="row" id="top_hotel">
        {hotels.map((item, index) => (
          <div key={index} className="col-12 mb-4">
            <div className="card shadow-sm border-0">
              <div className="row g-0 position-relative">
                <div className="col-md-4 col-sm-12 col-12 position-relative">
                  <Image
                    src={
                      imgFallbacks[item?.id]
                        ? "/images/hotelloadimg.jpg"
                        : normalizeImageSrc(
                            hotelDetails[item?.id]?.images ||
                              "/images/hotelloadimg.jpg"
                          )
                    }
                    width={400}
                    height={250}
                    className="img-fluid rounded h-100 object-fit-cover"
                    alt={item.name}
                    quality={100}
                    placeholder="blur"
                    blurDataURL="/images/hotelloadimg.jpg"
                    onError={() => handleImageError(item?.id)}
                    unoptimized={true}
                  />
                  <div
                    className="position-absolute top-0 w-100 d-flex justify-content-between px-2 pt-2"
                    style={{ zIndex: 1 }}
                  >
                    {/* Left badge */}
                    <span className="badge bg-success">
                      {item?.rooms.length}{" "}
                      {item?.rooms.length > 1 ? "Rooms Left" : "Room Left"}
                    </span>

                    {/* Right badge */}
                    {item?.provider === "custom" && (
                      <span className="badge bg-success">TT</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 col-12">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div>
                        {/* {item?.metadata.category} */}
                        <div>
                          {item?.metadata?.stars ? (
                            !isNaN(item.metadata.stars) ? (
                              <>
                                {Array(Math.round(Number(item.metadata?.stars)))
                                  .fill(0)
                                  .map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className="text-warning me-1"
                                    />
                                  ))}
                              </>
                            ) : (
                              <span className="small fw-semibold">
                                {item.metadata.stars}
                              </span>
                            )
                          ) : (
                            <span className="text-muted small">No Rating</span>
                          )}
                        </div>
                      </div>
                      <span className="badge bg-secondary p-2 mt-2 mt-md-0">
                        {moment(check_in).format("ll")} <FaArrowRightLong />{" "}
                        {moment(check_out).format("ll")}
                      </span>
                    </div>
                    <h5 className="card-title mt-2 mb-1">{item.name}</h5>
                    {hotelDetails[item?.id] ? (
                      <p className="card-text small text-success mb-2">
                        <IoLocationSharp className="text-success" />
                        {hotelDetails[item?.id]?.address ||
                          "Address not available"}
                      </p>
                    ) : (
                      <p className="card-text small placeholder-glow text-success mb-2">
                        <IoLocationSharp className="text-success" />
                        <span className="placeholder rounded col-5"></span>
                      </p>
                    )}
                    {hotelDetails[item?.id] ? (
                      <div className="d-flex flex-wrap mb-2 justify-content-start">
                        {hotelDetails[item?.id]?.facilities
                          .slice(0, 7)
                          .map((amenity, i) => (
                            <span
                              className="badge bg-light text-dark border border-success me-2 mb-2 p-2"
                              key={i}
                            >
                              {amenity}
                            </span>
                          ))}
                      </div>
                    ) : (
                      <div className="d-flex placeholder-glow g-2 flex-wrap mb-2 justify-content-start">
                        <h4 className="placeholder col-2  border rounded border-success"></h4>
                        <h4 className="placeholder col-2  border rounded border-success"></h4>
                        <h4 className="placeholder col-3  border rounded border-success"></h4>
                        <h4 className="placeholder col-4  border rounded border-success"></h4>
                        <h4 className="placeholder col-3  border rounded border-success"></h4>
                        <h4 className="placeholder col-2  border rounded border-success"></h4>
                        <h4 className="placeholder col-2  border rounded border-success"></h4>
                        <h4 className="placeholder col-3  border rounded border-success"></h4>
                      </div>
                    )}

                    {/* <p className="text-center text-success small fst-italic mb-3">
                      {item?.cancellationPolicy}
                    </p> */}
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="mb-2 mb-md-0">
                        <small className="fw-bold d-block">
                          <PriceDisplay
                            price={item.metadata.min_price / daysDiff}
                            currency={item?.metadata.currency}
                          />{" "}
                          / Night
                        </small>
                        <small
                          className="text-muted d-block"
                          style={{ fontSize: "11px" }}
                        >
                          Vat and Taxes included
                        </small>
                      </div>
                      <div className="text-center">
                        <p className="fw-bold mb-0">
                          {/* From : <PriceDisplay price={item.metadata.min_price} currency={item?.metadata.currency} /> */}
                          {item?.currency} {item?.price}
                          <br />
                          <span
                            style={{ fontSize: "11px", fontWeight: "normal" }}
                            className="small"
                          >
                            Vat and Taxes included
                          </span>
                        </p>
                        <Link
                          target="_blank"
                          onClick={() => SetRoomsData(item.id)}
                          href={`/hotels/${makingSlug(item.name)}?id=${
                            item.id
                          }&code=${ProviderShortNames(item.provider)}`}
                        >
                          <button className="btn btn-success">
                            View Detail <LiaAngleRightSolid />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
