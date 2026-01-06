'use client';
import React, { useState, useEffect } from "react";
import GalleryImages from "@/components/Hotels/HotelDetail/GalleryImages";
import { FaLocationDot } from "react-icons/fa6";
import { ThemeIcon, Blockquote } from '@mantine/core';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RoomList from "@/components/Hotels/HotelDetail/RoomSelection/RoomList";
import { useSearchParams } from "next/navigation";
import { ProviderCodeList } from "@/util/ProviderCodeList";
import HotelDetailLoader from "@/components/Loader/HotelDetailLoader";
import { useQuery } from '@tanstack/react-query';

export default function Page() {
const searchParams = useSearchParams();
const HotelCode = searchParams.get("id");
const ProviderCode = searchParams.get("code");

const [isFetching, setIsFetching] = useState(true);
const [searchData, setSearchData] = useState(null);
const [hotelDetails, setHotelDetails] = useState(null);

// ✅ Load search data (client only)
useEffect(() => {
  const storedData = localStorage.getItem("HotelSearchData");
  if (storedData) {
    setSearchData(JSON.parse(storedData));
  }
}, []);

// ✅ Fetch hotel details ONLY when searchData is ready
useEffect(() => {
  if (!searchData || !HotelCode || !ProviderCode) return;

  fetchDetails();
}, [searchData, HotelCode, ProviderCode]);

const fetchDetails = async () => {
  setIsFetching(true);

  let storedRoomList = [];
  const roomDetails = localStorage.getItem("roomSelection");
  if (roomDetails) {
    storedRoomList = JSON.parse(roomDetails);
  }

  const providerfind = ProviderCodeList.find(
    item => item.code === ProviderCode
  );
  const hotelProviderName = providerfind?.name || "";

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/full/details`,
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        //   "ngrok-skip-browser-warning": "true",
        // },
        body: JSON.stringify({
          provider: hotelProviderName,
          hotelId: HotelCode,
          checkIn: searchData.check_in,
          checkOut: searchData.check_out,
          roomList: storedRoomList,
        }),
      }
    );

    const res = await response.json();

    if (res.success) {
      setHotelDetails({
        ...res.data,
        provider: res.provider,
      });
    }
  } catch (err) {
    console.error("Error fetching hotel details:", err);
  } finally {
    setIsFetching(false);
  }
};


  return (
    <div className="container my-5">
      {isFetching ? (
        <HotelDetailLoader />
      ) : (
        <div>
          <GalleryImages imageList={hotelDetails?.all_images || []} />
          <div className="card bg-light text-black p-3 mt-3">
            <h4 className="fw-bold mb-1">
              {hotelDetails?.hotel_name}
            </h4>
            <span className="text-success small">
              <FaLocationDot /> {hotelDetails?.address}
            </span>
            <Blockquote mt="xl">{hotelDetails?.description}</Blockquote>

            <div className="mt-4">
              <h5 className="fw-bold mb-1">Amenities</h5>
              <div className="row mt-4">
                {hotelDetails?.facilities?.map((item, index) => (
                  <div key={index} className="col-md-4 col-12 mb-2">
                    <ThemeIcon color="teal" size={24} radius="xl">
                      <IoMdCheckmarkCircleOutline size={16} />
                    </ThemeIcon>{" "}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <RoomList hotelDetail={hotelDetails} />
          <div className="mt-4">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src={`https://maps.google.com/maps?q=${hotelDetails?.coordinates?.latitude},${hotelDetails?.coordinates?.longitude}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              style={{ border: "0", borderRadius: "8px" }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
