"use client";
import React from "react";
import Link from "next/link";
import { ProviderCodeList } from '@/util/ProviderCodeList';
import { LiaAngleRightSolid } from "react-icons/lia"; // agar icon use karna hai

function Clientbutton({ hotel }) {
  const makingSlug = (name) => {
    return name?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') || '';
  };

  const ProviderShortNames = (provider) => {
    if (!provider) return '';
    const providerFind = ProviderCodeList.find(item => item.name === provider.toLowerCase());
    return providerFind?.code || '';
  };

  const handleClick = () => {
    if (hotel?.rooms) {
      localStorage.setItem('roomSelection', JSON.stringify(hotel.rooms));
    }
  };

  if (!hotel) return null;

  return (
    <Link
      target="_blank"
      onClick={handleClick}
      href={`/hotels/${makingSlug(hotel.name)}?id=${hotel.id}&code=${ProviderShortNames(hotel.provider)}`}
      className="d-block mt-3"
    >
      <button className="btn btn-success w-100">
        View Detail <LiaAngleRightSolid />
      </button>
    </Link>
  );
}

export default Clientbutton;