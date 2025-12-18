import moment from "moment";
import Image from "next/image";
import { FaRegStar } from "react-icons/fa6";

async function getTopHotels() {
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
  return data.data?.hotels || [];
}

export default async function TopHotels() {
  const hotels = await getTopHotels();
console.log("Top Hotels:", hotels);
  // ✅ Hide section if no hotels
  if (!hotels.length) return null;

  return (
    <div className="container section-gap">
      <p className="text-center mb-2 text-muted">
        Experience Comfort, Luxury, and Exceptional Service
      </p>
      <h2 className="text-center fs-60">Explore Our Top Hotels</h2>

      <div className="row mt-5 m-0">
        {hotels.map((hotel, index) => (
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
                  src={hotel.image || "/images/home/placeholder-hotel.jpg"}
                  alt={hotel.name}
                />
                <div className="home-hotel-img-circle">{hotel?.location?.city}</div>
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
                    {hotel.currency} {hotel.price}
                  </b>
                  /per night
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
