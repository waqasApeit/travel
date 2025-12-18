"use client";
import React, { useEffect, useState } from "react";
import { RangeSlider } from "@mantine/core";
import { useHotelList } from "../HotelListingContext";

export default function PriceRange() {
  const { minPrice, maxPrice, resetPrice, setPriceRange } = useHotelList();
  const [selectedValues, setSelectedValues] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setSelectedValues([minPrice, maxPrice]);
  }, [minPrice, maxPrice , resetPrice]);

  const handleChange = (values) => {
    setSelectedValues(values);
    setPriceRange(values);
  };

  return (
    <div>
      <p className="small fw-bold">Your Budget</p>
      <RangeSlider
        className="mb-3"
        min={minPrice}
        max={maxPrice}
        value={selectedValues}
        onChange={handleChange}
        minRange={0.1}
        step={0.01}
        label={null}
      />
      <p>Min: {selectedValues[0]}</p>
      <p>Max: {selectedValues[1]}</p>
    </div>
  );
}
