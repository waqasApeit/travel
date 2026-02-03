import React, { useEffect, useMemo, useState } from "react";
import { MdChildFriendly } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { notifications } from "@mantine/notifications";
import { useHotelStore } from "@/components/Store/HotelStore";
import { useRouter } from "next/navigation";
import { Philosopher } from "next/font/google";
import moment from "moment";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function RoomSummery({ selectedRooms, roomList, detail }) {
  const { setAvailabilityData } = useHotelStore();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const SearchData = localStorage.getItem("searchRoomSelection");
    if (SearchData) {
      setSearch(JSON.parse(SearchData));
    }
  }, []);
  const { totalPrice, currency } = useMemo(() => {
    let total = 0;
    let currencySymbol = "";

    selectedRooms.forEach((selected) => {
      const room = roomList.find((r) => r.id === selected.roomId);
      if (room) {
        const rate = room.rates.find((rt) => rt.rate_key === selected.ratekey);
        if (rate) {
          currencySymbol = rate.currency || currencySymbol;
          total += Number(rate.price) * selected.qty;
        }
      }
    });

    return { totalPrice: total.toFixed(2), currency: currencySymbol };
  }, [selectedRooms, roomList]);

  const PreBooking = async () => {
    if (selectedRooms.length === 0) {
      notifications.show({
        autoClose: 3000,
        title: "Error",
        message: "Please select at least one room to proceed.",
        color: "red",
      });
      return;
    }
    if (detail?.provider === "custom") {
      if (!CheckCustomHotelRoomSelection()) {
        notifications.show({
          autoClose: 3000,
          title: "Incomplete Room Selection",
          message:
            "Not enough rooms for all guests. Please adjust your selection.",
          color: "red",
        });
        return;
      }
    }
    let searchData = {};
    const storedData = localStorage.getItem("HotelSearchData");
    if (storedData) {
      searchData = JSON.parse(storedData);
    }
    const request = {
      provider: detail?.provider,
      checkIn: searchData?.check_in,
      checkOut: searchData?.check_out,
      rooms: selectedRooms.map((item) => ({
        rateKey: item.ratekey,
        quantity: item.qty,
      })),
    };
    setIsLoading(true);
    try {
      const responses = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/check-rates`,
        {
          method: "POST",
          cache: "no-store",
          headers: {
            // 'ngrok-skip-browser-warning': 'true',
            "Content-Type": "application/json",
            //   "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(request),
        },
      );
      const res = await responses.json();
      setIsLoading(false);
      if (res.success) {
        res.data.provider = res.provider;
        res.data.address = detail?.address;
        setAvailabilityData(res.data);
        router.push("/hotels/checkout");
      } else {
        notifications.show({
          title: "Error",
          message: res?.error?.message,
          autoClose: 3500,
          color: "red",
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching hotel details:", err);
    }
  };
  const CheckCustomHotelRoomSelection = () => {
    const filteredRooms = roomList.filter((item) =>
      selectedRooms.some((room) => room?.roomId === item.id),
    );
    const totals = filteredRooms.reduce(
      (acc, item) => {
        item.rates.forEach((rate) => {
          if (selectedRooms.some((room) => room?.ratekey === rate.rate_key)) {
            const qty = selectedRooms.find(
              (room) => room?.ratekey === rate.rate_key,
            ).qty;
            const adult = rate.adults * qty;
            const child = rate.children * qty;
            acc.adults += adult || 0;
            acc.children += child || 0;
          }
        });
        return acc;
      },
      { adults: 0, children: 0 },
    );

    const roomTotal = search.reduce(
      (sum, item) => {
        sum.adults += item.adults || 0;
        sum.children += item.children.length || 0;
        return sum;
      },
      { adults: 0, children: 0 },
    );

    if (
      totals?.adults >= roomTotal?.adults &&
      totals?.children >= roomTotal?.children
    ) {
      return true;
    } else {
      return false;
    }
  };


   const nights =
    detail?.checkIn && detail?.checkOut
      ? moment(detail.checkOut).diff(moment(detail.checkIn), "days")
      : 0;
  return (
   <div className="card border sticky-top-div p-4 shadow-sm">
      <h5 className={`text-black fw-bold text-center ${philosopher.className} mb-3`}>
        Reservation Summary
      </h5>

      {/* Check-In / Check-Out / Nights */}
      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="fw-semibold">Check-In</div>
          <div>{detail?.checkIn}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="fw-semibold">Check-Out</div>
          <div>{detail?.checkOut}</div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="fw-semibold">No of Nights</div>
          <div>
            {nights} {nights > 1 ? "Nights" : "Night"}
          </div>
        </div>
      </div>

      {/* Room Selection */}
      {selectedRooms.length === 0 ? (
        <div className="text-center text-muted py-3 border rounded">
          No Room Selected.
        </div>
      ) : (
        <div>
          {roomList
            .filter((item) =>
              selectedRooms.some((room) => room?.roomId === item.id),
            )
            .map((item, index) => (
              <div key={index} className="mb-3 p-3 border rounded">
                {item?.rates
                  .filter((rate) =>
                    selectedRooms.some(
                      (room) => room?.ratekey === rate.rate_key,
                    ),
                  )
                  .map((rateItem, rateIndex) => (
                    <div key={rateIndex} className="mb-2">
                      <h6 className="mb-2">
                        {item.name} ({rateItem.board_name})
                      </h6>

                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div>
                          <IoPerson className="icon me-1" size={17} />
                          {Number(rateItem.adults) > 1 ? "Adults" : "Adult"}
                        </div>
                        <div>{rateItem.adults}</div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <div>
                          <MdChildFriendly className="icon me-1" size={15} />
                          {Number(rateItem.children) > 1 ? "Children" : "Child"}
                        </div>
                        <div>{rateItem.children}</div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <IoMdPricetag className="icon me-1" size={15} />
                          Price
                        </div>
                        <div>
                          {
                            selectedRooms.find(
                              (room) => room?.ratekey === rateItem.rate_key,
                            ).qty
                          }
                          *{" "}
                          <PriceDisplay
                            price={rateItem.price}
                            currency={rateItem?.currency}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ))}

          {/* Per Night & Total */}
          <div className="d-flex justify-content-between align-items-center fw-semibold py-2 border-top">
            <div>Per Night Price</div>
            <div>
              <PriceDisplay
                price={
                  nights
                    ? (totalPrice / nights).toFixed(2)
                    : totalPrice.toFixed(2)
                }
                currency={currency}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center fw-semibold py-2 border-bottom">
            <div>Total</div>
            <div>
              <PriceDisplay price={totalPrice} currency={currency} />
            </div>
          </div>

          <div className="text-center text-muted mt-2">
            <small>VAT and Taxes included</small>
          </div>
        </div>
      )}

      {/* Checkout Button */}
      <button
        disabled={isLoading}
        onClick={PreBooking}
        className="btn exploreBtn  w-100 mt-3 py-2"
      >
        {isLoading ? (
          <div
            className="spinner-border text-dark spinner-border-sm"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Proceed to Checkout"
        )}
      </button>
    </div>
  );
}
