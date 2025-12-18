import moment from "moment";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";
import Clientbutton from "./Clientbutton";

async function getTopHotelsWithDetails() {
  // Step 1: Pehle search API se top hotels list fetch karo
  const request = {
    provider: "custom",
    checkIn: moment().add(1, "days").format("YYYY-MM-DD"),
    checkOut: moment().add(1, "days").add(2, "days").format("YYYY-MM-DD"),
    rooms: [
      {
        adults: 2,
        children: [],
      },
    ],
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  );

  if (!res.ok) return [];

  const data = await res.json();
  const hotels = data.data?.hotels || [];

  if (hotels.length === 0) return [];

  // Step 2: Har hotel ke liye details (images) fetch karo
  const checkIn = moment().add(1, "days").format("YYYY-MM-DD");
  const checkOut = moment().add(3, "days").format("YYYY-MM-DD");

  const hotelDetailsPromises = hotels.map(async (hotel) => {
    try {
      const detailRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/basic/details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true", // agar ngrok use kar rahe ho
          },
          body: JSON.stringify({
            provider: hotel.provider,
            hotelId: hotel.id,
            checkIn,
            checkOut,
          }),
        }
      );

      if (!detailRes.ok) return { ...hotel, mainImage: null };

      const detailData = await detailRes.json();

      // Main image nikaalo
      const mainImage =
        detailData.data?.main_images &&
        Array.isArray(detailData.data.main_images) &&
        detailData.data.main_images.length > 0
          ? detailData.data.main_images[0].url
          : null;

      return {
        ...hotel,
        mainImage: mainImage || hotel.image || "/images/home/placeholder-hotel.jpg",
        address: detailData.data?.address || "",
        facilities: detailData.data?.facilities || [],
      };
    } catch (err) {
      console.error(`Error fetching details for hotel ${hotel.id}:`, err);
      return {
        ...hotel,
        mainImage: hotel.image || "/images/home/placeholder-hotel.jpg",
      };
    }
  });

  // Sab promises resolve hone ka wait karo
  const hotelsWithDetails = await Promise.all(hotelDetailsPromises);

  return hotelsWithDetails;
}

export default async function TopHotels() {
  const hotels = await getTopHotelsWithDetails();

  console.log("Top Hotels with Details:", hotels);

  // Agar koi hotel na mile to section hide kar do
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
            className="col-md-4 col-lg-3 col-12 col-sm-6 mt-2"
          >
            <div className="card h-100">
              <div className="position-relative">
                <Image
                  className="home-hotel-image w-100"
                  height={250}
                  width={250}
                  src={hotel.mainImage} // Yahan real image use ho rahi hai
                  alt={hotel.name}
                  unoptimized // Agar external URL hai to Next.js optimization off kar do
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
                  From :{" "}
                  <b>
                    {hotel.metadata?.currency} {hotel.metadata?.min_price}
                  </b>{" "}
                  /per night
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