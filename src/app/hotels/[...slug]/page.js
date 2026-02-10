'use client';
import React, { useState, useEffect } from "react";
import GalleryImages from "@/components/Hotels/HotelDetail/GalleryImages";
import { FaLocationDot } from "react-icons/fa6";
import { ThemeIcon, Blockquote, Modal, Button } from '@mantine/core';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RoomList from "@/components/Hotels/HotelDetail/RoomSelection/RoomList";
import { useSearchParams } from "next/navigation";
import { ProviderCodeList } from "@/util/ProviderCodeList";
import HotelDetailLoader from "@/components/Loader/HotelDetailLoader";
import { useQuery } from '@tanstack/react-query';
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function Page() {
  const searchParams = useSearchParams();
  const HotelCode = searchParams.get("id");
  const ProviderCode = searchParams.get("code");

  const [searchData, setSearchData] = useState({});
  const [hotelDetails, setHotelDetails] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [amenitiesModalOpen, setAmenitiesModalOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ Load search data safely from localStorage (client only)
  useEffect(() => {
    const storedData = localStorage.getItem('HotelSearchData');
    if (storedData) {
      setSearchData(JSON.parse(storedData));
      fetchDetails(JSON.parse(storedData))
    }
  }, [searchParams]);
  const decodeProvider = (encoded) => {
    let result = '';
    let buffer = '';

    for (const ch of encoded) {
      buffer += ch;
      const code = parseInt(buffer, 36);

      if (code >= 65 && code <= 130) { // valid char range
        result += String.fromCharCode(code - 3);
        buffer = '';
      }
    }
    return result;
  };
  const fetchDetails = async (searchNew) => {
    let storedRoomList = [];
    const roomDetails = localStorage.getItem('roomSelection');
    if (roomDetails) {
      storedRoomList = JSON.parse(roomDetails);
    }
    
    const hotelProviderName =decodeProvider(ProviderCode || '').toLowerCase();

    try {
      setIsFetching(true);
      const responses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/full/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          provider: hotelProviderName,
          hotelId: HotelCode,
          checkIn: searchNew?.check_in,
          checkOut: searchNew?.check_out,
          roomList: storedRoomList,
        }),
      });
      const res = await responses.json();
      setIsFetching(false);
      if (res.success) {
        res.data.provider = res.provider;
        setHotelDetails(res.data);
        // return res.data;
      }
      // return {};
    } catch (err) {
      console.error("Error fetching hotel details:", err);
      // return {};
      setIsFetching(false);
      setHotelDetails({});
    }
  };

  // ✅ Cache hotel details for 20 minutes and do NOT refetch unless expired
  // const { data: hotelDetails = {}, isFetching } = useQuery({
  //   queryKey: ['hotelDetails', HotelCode, ProviderCode],
  //   queryFn: fetchDetails,
  //   enabled: !!HotelCode && !!ProviderCode && !!searchData?.check_in,
  //   cacheTime: 5 * 60 * 1000, // 5 minutes
  //   staleTime: 5 * 60 * 1000, // data stays "fresh" for 5 minutes
  //   refetchOnWindowFocus: false, // don't refetch on tab switch
  //   refetchOnMount: false,
  // });

  return (
    <div className="container my-5">
      {isFetching ? (
        <HotelDetailLoader />
      ) : (
        <div>
          <GalleryImages imageList={hotelDetails?.all_images || []} />
          <div className="card bg-light text-black p-3 mt-3">
            <h4 className={`fw-bold mb-1 ${philosopher.className}`}>
              {hotelDetails?.hotel_name}
            </h4>
            <span className="text-success small">
              <FaLocationDot /> {hotelDetails?.address}
            </span>
            {/* <Blockquote mt="xl">{hotelDetails?.description}</Blockquote> */}
            <div className="p-4 mt-2 border rounded ">
              <h4 className={`fw-bold mb-1 ${philosopher.className}`}>Description</h4>
              {hotelDetails?.description}
            </div>

            <div className="mt-4">
              <h5 className={`fw-bold mb-1 ${philosopher.className}`}>Amenities</h5>
              <div className="row mt-4">
                {(isSmallScreen 
                  ? hotelDetails?.facilities?.slice(0, 3) 
                  : hotelDetails?.facilities
                )?.map((item, index) => {
                  return (
                    <div key={index} className="col-md-4 col-12 mb-2">
                      <ThemeIcon color="teal" size={24} radius="xl">
                        <IoMdCheckmarkCircleOutline size={16} />
                      </ThemeIcon>{" "}
                      {item}
                    </div>
                  );
                })}
              </div>
              {isSmallScreen && hotelDetails?.facilities?.length > 3 && (
                <Button 
                  variant="outline" 
                  color="teal" 
                  size="sm" 
                  mt="md"
                  onClick={() => setAmenitiesModalOpen(true)}
                >
                  Show All Amenities ({hotelDetails?.facilities?.length})
                </Button>
              )}
            </div>
          </div>

          {/* Amenities Modal */}
          <Modal
            opened={amenitiesModalOpen}
            onClose={() => setAmenitiesModalOpen(false)}
            title={<h5 className={`fw-bold ${philosopher.className}`}>All Amenities</h5>}
            size="lg"
            centered
          >
            <div className="row">
              {hotelDetails?.facilities?.map((item, index) => (
                <div key={index} className="col-12 mb-3">
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IoMdCheckmarkCircleOutline size={16} />
                  </ThemeIcon>{" "}
                  {item}
                </div>
              ))}
            </div>
          </Modal>

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
