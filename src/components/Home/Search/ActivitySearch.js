"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import moment from "moment";
export default function ActivitySearch() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: null, date: null });
  const [destinations, setDestinations] = useState([]);
  const handleDateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      date: value,
    }));
  };
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  };
  useEffect(() => {
    GetDestinations();
  }, []);
  const GetDestinations = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/activities/destinations`,
        {
          method: "GET",
            headers: {
              // 'ngrok-skip-browser-warning': 'true',
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
        }
      );
      const data = await response.json();
      // console.log('Destinations data:', data);
      if (data.Success === true) {
        const NewList = data.Content.destinations.map((item) => ({
          id: item.id,
          value: item.city_slug,
          label: item.city,
        }));
        const uniqueList = [
          ...new Map(NewList.map((item) => [item.value, item])).values(),
        ];
        setDestinations(uniqueList);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations([]);
    }
  };
  const HandleSubmit = () => {
    if (formData.name === null) {
      notifications.show({
        title: "Error",
        message: "Please select a city",
        color: "red",
      });
      return;
    }
    if (formData.date === null) {
      notifications.show({
        title: "Error",
        message: "Please select a date",
        color: "red",
      });
      return;
    }
    const queryParams = new URLSearchParams();
    queryParams.append("city", formData.name);
    queryParams.append("date", moment(formData.date).format("YYYY-MM-DD"));
    router.push(`/activities?${queryParams.toString()}`);
  };

  console.log(destinations);

  return (
    <div>
      <div className="row ">
        <div className="col-md-4 my-1">
          <label htmlFor="selectcity" className="form-label fw-medium">
            Select City
          </label>
          <Select
            onChange={handleSelectChange}
            value={formData.name}
            placeholder="Select City"
            className="height-25 man-height"
            data={destinations}
            searchable
          />
        </div>
        <div className="col-md-4 my-1">
          <label htmlFor="selectcity" className="form-label fw-medium">
            Select Date
          </label>
          <DateInput
            clearable
            onChange={handleDateChange}
            value={formData.date}
            className="height-25 man-height"
            placeholder="Select Date"
            minDate={new Date()}
          />
        </div>
        <div className="col-md-4 mt-auto">
          <button
            className="btn btn-success mt-auto cursor-pointer bg-color w-100 height-25"
            onClick={HandleSubmit}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
