import React, { useEffect, useMemo, useState } from 'react'
import { MdChildFriendly } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { IoMdPricetag } from "react-icons/io";
import PriceDisplay from '@/components/Currency/PriceDisplay';
import { notifications } from '@mantine/notifications';
import { useHotelStore } from '@/components/Store/HotelStore';
import { useRouter } from 'next/navigation';
import { Philosopher } from "next/font/google";
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
        const SearchData = localStorage.getItem('searchRoomSelection');
        if (SearchData) {
            setSearch(JSON.parse(SearchData));
        }
    }, []);
    const { totalPrice, currency } = useMemo(() => {
        let total = 0;
        let currencySymbol = '';

        selectedRooms.forEach(selected => {
            const room = roomList.find(r => r.id === selected.roomId);
            if (room) {
                const rate = room.rates.find(rt => rt.rate_key === selected.ratekey);
                if (rate) {
                    currencySymbol = rate.currency || currencySymbol;
                    total += (Number(rate.price) * selected.qty);
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
            })
            return;
        }
        if (detail?.provider === 'custom') {
            if (!CheckCustomHotelRoomSelection()) {
                notifications.show({
                    autoClose: 3000,
                    title: "Incomplete Room Selection",
                    message: "Not enough rooms for all guests. Please adjust your selection.",
                    color: "red",
                })
                return;
            }
        }
        let searchData = {};
        const storedData = localStorage.getItem('HotelSearchData');
        if (storedData) {
            searchData = JSON.parse(storedData);
        }
        const request = {
            "provider": detail?.provider,
            "checkIn": searchData?.check_in,
            "checkOut": searchData?.check_out,
            "rooms": selectedRooms.map(item => ({
                "rateKey": item.ratekey,
                "quantity": item.qty,
            }))
        }
        setIsLoading(true);
        try {
            const responses = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/check-rates`, {
                method: 'POST',
                cache: 'no-store',
                 headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
            //   "Access-Control-Allow-Origin": "*",
            },
                body: JSON.stringify(request),
            })
            const res = await responses.json();
            setIsLoading(false);
            if (res.success) {
                res.data.provider = res.provider;
                res.data.address = detail?.address;
                setAvailabilityData(res.data);
                router.push('/hotels/checkout');
            } else {
                notifications.show({
                    title: 'Error',
                    message: res?.error?.message,
                    autoClose: 3500,
                    color: 'red'
                })
            }
        } catch (err) {
            setIsLoading(false);
            console.error("Error fetching hotel details:", err);
        }

    };
    const CheckCustomHotelRoomSelection = () => {
        const filteredRooms = roomList.filter(item =>
            selectedRooms.some(room => room?.roomId === item.id)
        );
        const totals = filteredRooms.reduce(
            (acc, item) => {
                item.rates.forEach(rate => {
                    if (selectedRooms.some(room => room?.ratekey === rate.rate_key)) {
                        const qty = selectedRooms.find(room => room?.ratekey === rate.rate_key).qty;
                        const adult = rate.adults * qty;
                        const child = rate.children * qty;
                        acc.adults += adult || 0;
                        acc.children += child || 0;
                    }
                });
                return acc;
            },
            { adults: 0, children: 0 }
        );

        const roomTotal = search.reduce((sum, item) => {
            sum.adults += item.adults || 0;
            sum.children += item.children.length || 0;
            return sum;
        }, { adults: 0, children: 0 });

        if (totals?.adults >= roomTotal?.adults && totals?.children >= roomTotal?.children) {
            return true;
        } else {
            return false;
        }
    };
    return (
        <div className="card border sticky-top-div p-3">
            <h5 className={`fw-bold ${philosopher.className}`}>Reservation Summary</h5>
            {selectedRooms.length === 0 ? (
                <div className="hotel-detail-room-selection text-center">No Room Selected.</div>
            ) : (
                <div>
                    {roomList.filter(item => selectedRooms.some(room => room?.roomId === item.id)).map((item, index) => (
                        <div key={index}>
                            {item?.rates.filter(rate => selectedRooms.some(room => room?.ratekey === rate.rate_key)).map((rateItem, rateIndex) => (
                                <div key={rateIndex} className="hotel-detail-room-selection">
                                    <h6>{item.name} ({rateItem.board_name})</h6>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><IoPerson className='icon' size={17} /> {Number(rateItem.adults) > 1 ? 'Adults' : 'Adult'} </div>
                                        <div>{rateItem.adults}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><MdChildFriendly className='icon' size={15} /> {Number(rateItem.children) > 1 ? 'Children' : 'Child'}</div>
                                        <div>{rateItem.children}</div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div><IoMdPricetag className='icon' size={15} /> Price</div>
                                        <div>{selectedRooms.find(room => room?.ratekey === rateItem.rate_key).qty}*<PriceDisplay price={rateItem.price} currency={rateItem?.currency} /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="d-flex my-2 fw-bold justify-content-between align-items-center">
                        <div>Total</div>
                        <div><PriceDisplay price={totalPrice} currency={currency} /></div>
                    </div>
                </div>
            )
            }

            <button disabled={isLoading} onClick={PreBooking} className="btn text-light exploreBtn w-100">
                {isLoading ? (
                    <div className="spinner-border text-light spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    'Proceed to checkout'
                )}

            </button>
        </div >
    )
}
