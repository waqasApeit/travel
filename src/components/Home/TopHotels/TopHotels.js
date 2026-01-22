"use client";
import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { ProviderCodeList } from "@/util/ProviderCodeList";
import { LiaAngleRightSolid } from "react-icons/lia"; // agar icon use karna hai
import Link from "next/link";
import { FaArrowRight, FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import styles from "./Tophotel.module.css";
import { Philosopher } from 'next/font/google';
const philosopher = Philosopher({
  subsets: ['latin'],
  weight: '700',
});
export default function TopHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    const getTopHotelsWithDetails = async () => {
      try {
        const request = {
          provider: "custom",
          checkIn: moment().add(1, "days").format("YYYY-MM-DD"),
          checkOut: moment().add(2, "days").format("YYYY-MM-DD"),
          rooms: [{ adults: 2, children: [] }],
        };
        setSearchData({
          provider: request.provider,
          check_in: request.checkIn,
          check_out: request.checkOut,
          rooms: request.rooms,
        });
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`,
          {
            method: "POST",
            headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              // "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(request),
          },
        );

        if (!res.ok) return setLoading(false);

        const data = await res.json();
        const hotelsList = data.data?.hotels || [];

        if (!hotelsList.length) return setLoading(false);

        const checkIn = request.checkIn;
        const checkOut = request.checkOut;

        const detailedHotels = await Promise.all(
          hotelsList.map(async (hotel) => {
            try {
              const detailRes = await fetch(
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
                    checkIn,
                    checkOut,
                  }),
                },
              );

              if (!detailRes.ok) {
                return {
                  ...hotel,
                  mainImage:
                    hotel.image || "/images/home/placeholder-hotel.jpg",
                };
              }

              const detailData = await detailRes.json();
              const mainImage =
                detailData.data?.main_images?.[0]?.url ||
                hotel.image ||
                "/images/home/placeholder-hotel.jpg";

              return {
                ...hotel,
                mainImage,
                address: detailData.data?.address || "",
                facilities: detailData.data?.facilities || [],
              };
            } catch {
              return {
                ...hotel,
                mainImage: hotel.image || "/images/home/placeholder-hotel.jpg",
              };
            }
          }),
        );

        setHotels(detailedHotels);
      } catch (error) {
        console.error("Hotel fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    getTopHotelsWithDetails();
  }, []);

  if (loading) return null;
  // if (!hotels.length) return null;

  const makingSlug = (name) => {
    return (
      name
        ?.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "") || ""
    );
  };

const ProviderShortNames = (encodedProvider) => {
    if (!encodedProvider) return '';
    const provider = encodeProvider(encodedProvider).toLowerCase();
    return provider;
  };

   const encodeProvider = (str) => {
    return [...str].map(c => (c.charCodeAt(0) + 3).toString(36)).join('');
  }

  const handleClick = (hotel) => {
    if (hotel?.rooms) {
      localStorage.setItem("roomSelection", JSON.stringify(hotel.rooms));
      localStorage.setItem("HotelSearchData", JSON.stringify(searchData));
      localStorage.setItem(
        "searchRoomSelection",
        JSON.stringify(searchData.rooms),
      );
    }
  };

  if (!hotels) return null;

  return (
    <>
      {/* <div className="container section-gap">
      <p className="text-center mb-2 sec-title__tagline">
        Experience Comfort, Luxury, and Exceptional Service
      </p>

      <h2 className="text-center fs-60">Explore Our Top Hotels</h2>

      <div className="row mt-5 m-0">
        {hotels.slice(0, 8).map((hotel, index) => (
          <div
            key={hotel.id || index}
            className="col-md-4 col-lg-3 col-sm-6 col-12 mt-2"
          >
            <div className="card h-100">
              <div className="position-relative">
                <Image
                  src={hotel.mainImage}
                  alt={hotel.name}
                  width={250}
                  height={250}
                  className="home-hotel-image w-100"
                  unoptimized
                />

                <div className="home-hotel-img-circle">
                  {hotel?.location?.city}
                </div>
              </div>

              <div className="px-2 py-3 mt-3 rounded gray-simple">
                <p className="mb-1">
                  {Array(Math.round(hotel?.metadata?.stars))
                    .fill(0)
                    .map((_, i) => (
                      <FaRegStar key={i} />
                    ))}
                </p>

                <h5 className="one-line-dot fw-bold mb-1">
                  <span className="small">{hotel.name}</span>
                </h5>

                <hr className="my-3" />

                <p className="small">
                  From:{" "}
                  <b>
                    <PriceDisplay
                      price={hotel.metadata?.min_price}
                      currency={hotel.metadata?.currency}
                    />
                  </b>{" "}
                  / per night
                </p>
                <Link
                  target="_blank"
                  onClick={() => handleClick(hotel)}
                  href={`/hotels/${makingSlug(hotel.name)}?id=${
                    hotel.id
                  }&code=${ProviderShortNames(hotel.provider)}`}
                  className="d-block mt-3"
                >
                  <button className="btn btn-success w-100">
                    View Detail <LiaAngleRightSolid />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div> */}

      <section className={`py-5 ${styles.section}`}>
        <div className="container">
          {/* Header */}
          <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mb-4">
            <div>
              <h2 className={`${philosopher.className} fw-bold mb-1`}>Top Hotels Around the Globe</h2>
              <p className="text-muted mb-0">
                Handpicked tours loved by travelers
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="row g-4">
            {hotels.slice(0, 8).map((hotel, index) => (
              <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={index}>
                <article className={styles.card}>
                  {/* Image */}
                  <div className={styles.imageWrapper}>
                    <Image
                      src={hotel.mainImage}
                      alt={hotel.name}
                      fill
                      className={styles.image}
                    />

                    <div className={styles.badges}>
                      <span className={styles.discount}>{hotel.provider === 'custom' && "K"}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    {/* Location */}
                    <div className="d-flex align-items-center gap-1 text-muted small mb-2">
                      <FaMapMarkerAlt size={12} />
                      <span>{hotel?.location?.city}</span>
                    </div>

                    {/* Title */}
                    <h6 className={` fw-semibold mb-2 ${styles.title}`}>
                      <Link
                  target="_blank"
                  onClick={() => handleClick(hotel)}
                  href={`/hotels/${makingSlug(hotel.name)}?id=${
                    hotel.id
                  }&code=${ProviderShortNames(hotel.provider)}`}
                  className={`d-block ${philosopher.className}`}
                >
                       {hotel.name}
                      </Link>
                    </h6>

                    {/* Rating */}
                    <div className="d-flex align-items-center gap-2 small mb-3">
                      <div className="d-flex align-items-center gap-1">
                        {Array(Math.round(hotel?.metadata?.stars))
                    .fill(0)
                    .map((_, i) => (
                      <FaStar key={i} className="text-danger" />
                    ))}
                        
                      </div>
                      
                    </div>

                    {/* Price */}
                    <div className="d-flex justify-content-between align-items-end pt-3 border-top">
                      <div>
                        <span className="text-muted small">From</span>{" "}
                        <span className="fw-bold fs-5 fw-bold"> <PriceDisplay
                      price={hotel.metadata?.min_price}
                      currency={hotel.metadata?.currency}
                    /></span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
