"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import Clientbutton from "./Clientbutton";
import PriceDisplay from "@/components/Currency/PriceDisplay";

export default function TopHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopHotelsWithDetails = async () => {
      try {
        const request = {
          provider: "custom",
          checkIn: moment().add(1, "days").format("YYYY-MM-DD"),
          checkOut: moment().add(2, "days").format("YYYY-MM-DD"),
          rooms: [{ adults: 2, children: [] }],
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
          }
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
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                  },
                  body: JSON.stringify({
                    provider: hotel.provider,
                    hotelId: hotel.id,
                    checkIn,
                    checkOut,
                  }),
                }
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
                mainImage:
                  hotel.image || "/images/home/placeholder-hotel.jpg",
              };
            }
          })
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
  if (!hotels.length) return null;

  return (
    <div className="container section-gap">
      <p className="text-center mb-2 text-muted">
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
                  {Array(Math.floor(hotel.rating || 4))
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

                <Clientbutton hotel={hotel} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
