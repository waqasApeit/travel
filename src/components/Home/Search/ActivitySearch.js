"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import styles from './search.module.css'
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
              // "Access-Control-Allow-Origin": "*",
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
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        {/* Destination */}
        <div className={styles.inputWrapper}>
          <FaMapMarkerAlt className={styles.icon} />
          <Select
            onChange={handleSelectChange}
            value={formData.name}
            placeholder="Where to?"
            data={destinations}
            searchable
            styles={{
              input: {
                border: 'none',
                '&:focus': {
                  outline: 'none'
                }
              }
            }}
          />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Date */}
        <div className={styles.inputWrapper}>
          <FaCalendarAlt className={styles.icon} />
          <DateInput
            clearable
            onChange={handleDateChange}
            value={formData.date}
            placeholder="When?"
            minDate={new Date()}
            styles={{
              input: {
                border: 'none',
                '&:focus': {
                  outline: 'none'
                }
              }
            }}
          />
        </div>

        {/* Search Button */}
        <button className={styles.searchBtn} onClick={HandleSubmit}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
