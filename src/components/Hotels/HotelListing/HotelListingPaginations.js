'use client';
import React, {useEffect} from 'react';
import { Pagination } from '@mantine/core';
import { useHotelList } from "./HotelListingContext";

export default function HotelListingPaginations() {
  const { currentPage, setCurrentPage, totalPages } = useHotelList();

  if (totalPages <= 1) return null; // ✅ hide if only one page
  useEffect(() => { 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  return (
    <div className=" d-flex justify-content-center align-items-center w-100 mt-4">
      <Pagination
        total={totalPages}             
        value={currentPage}             
        onChange={setCurrentPage}       
        size="md"                       
        radius="md"                     
        withEdges                       
      />
    </div>
  );
}
