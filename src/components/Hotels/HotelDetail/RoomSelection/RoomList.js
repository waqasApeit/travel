'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import RoomSummery from './RoomSummery'
import { FaCheck } from 'react-icons/fa';
import { CiTrash } from "react-icons/ci";
import PriceDisplay from '@/components/Currency/PriceDisplay';
import moment from 'moment';
export default function RoomList({ hotelDetail }) {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [roomData, setRoomData] = useState(hotelDetail?.rooms || []);

    useEffect(() => {
        setRoomData(hotelDetail?.rooms || []);
    }, [hotelDetail])
    
    const handleSelectToggle = (roomid, selectedId) => {
        const isSelected = selectedRooms.find((r) => r.ratekey === selectedId);

        if (isSelected) {
            // Remove if already selected
            setSelectedRooms(selectedRooms.filter((r) => r.ratekey !== selectedId));
        } else {
            // Add if not selected
            setSelectedRooms([...selectedRooms, { roomId: roomid, ratekey: selectedId, qty: 1 }]);
        }
    };

    const handleQuantityChange = (rateKey, quantity) => {
        const updatedRooms = selectedRooms.map((room) => {
            if (room.ratekey === rateKey) {
                return { ...room, qty: quantity };
            }
            return room;
        });
        setSelectedRooms(updatedRooms);
    }
    const isRoomSelected = (selectedId) => {
        return selectedRooms.some((r) => r.ratekey === selectedId);
    };
    function getCancellationMessage(policyArr, currency) {
        if (!Array.isArray(policyArr) || policyArr.length === 0) {
            return <div className="small text-danger">Non-refundable</div>;
        }

        const policy = policyArr[0]; // assuming only one policy
        const { amount, from } = policy;

        const dateObj = moment.utc(from);
        const now = moment.utc();
        if (dateObj.isAfter(now)) {
            return <div className="small text-success">Free cancellation until {moment.utc(dateObj).format('ll')}, {moment.utc(dateObj).format('LTS')}. After that, <PriceDisplay price={amount} currency={currency} /> will be charged.</div>;
        } else {
           return <div className="small text-danger">Non-refundable</div>
        }
    }

    return (
        <>
            <div className='row mt-5'>
                <div className='col-12 col-md-8'>
                    {roomData.map((room, index) => (
                        <div key={index} className='border p-2 mb-3 rounded'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <h6>{room?.name}</h6>
                                    <Image className="object-fit-cover rounded  w-100" src={room?.images && room.images !== null && room.images.length > 0 ? room.images[0]?.url : '/images/noimage.png'} height={150} width={300} alt="Room image" />
                                    <div className="d-flex mt-2 flex-wrap mb-2  justify-content-start">
                                        {room?.amenities !== null && room?.amenities.slice(0, 10).map((facility, idx) => (
                                            <span key={idx} className="text-dark ms-1 small">
                                                <FaCheck className='text-success' size={12} /> {facility?.description?.content}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    {room?.rates.map((rate, idx) => (
                                        <div key={idx} className="my-2 p-2 rounded border room-bg-color">
                                            <div className="row">
                                                <div className="col-md-8 col-lg-8">
                                                    <h5 className="mb-0 font-size-16">{rate?.board_name}</h5>
                                                    <p className="small m-0 p-0">{Number(rate?.adults) > 1 ? 'Adults':'Adult' } {rate?.adults}  - {Number(rate?.children) > 1 ? 'Children':'Child' } {rate?.children}</p>
                                                    {getCancellationMessage(rate?.cancellation_policies, rate?.currency)}
                                                </div>
                                                <div className="col-md-4 col-lg-4 my-2 text-center d-flex justify-content-center align-items-center">
                                                    <div>
                                                        <h5 className="text-success mb-0"><PriceDisplay price={rate?.price} currency={rate?.currency} /></h5>
                                                        {/* <span className="small">Price For 4 Nights</span> */}
                                                        {isRoomSelected(rate?.rate_key) ? (
                                                            <div className='d-flex mt-2'>
                                                                <select onChange={(e) => handleQuantityChange(rate?.rate_key, e.target.value)} className='w-100 border'>
                                                                    {Array(Number(rate?.allotment)).fill(0).map((_, i) => (
                                                                        <option key={i} value={i + 1}>{i + 1}</option>
                                                                    ))}
                                                                </select>
                                                                <span onClick={() => handleSelectToggle(room?.id, rate?.rate_key)} className='bg-danger-subtle cursor-pointer ms-1 rounded p-1'><CiTrash className='text-danger' size={20} /></span>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => handleSelectToggle(room?.id, rate?.rate_key)} className='btn w-100 btn-success mt-2 btn-sm'>Reserve</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='col-12 col-md-4'>
                    <RoomSummery selectedRooms={selectedRooms} roomList={roomData}  detail={hotelDetail}/>
                </div>
            </div>
        </>
    )
}
