"use client";
import React, { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { Popover } from "@mantine/core";
import { FaMinus, FaPlus } from "react-icons/fa";
import Autocomplete from "react-google-autocomplete";
import { notifications } from "@mantine/notifications";
import { useRouter, useSearchParams } from "next/navigation";
export default function HotelModify() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childrenAges: [], errors: {} }
  ]);
  const [formData, setFormData] = useState({
    location: "",
    city: "",
    code: "",
    country: "",
    lat: null,
    lng: null,
    dateRange: [],
  })
  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0, childrenAges: [], errors: {} }]);
  };

  useEffect(() => {
    if (searchParams && searchParams.toString()) {
      const city = searchParams.get("city");
      const countryCode = searchParams.get("code");
      const check_in = searchParams.get("checkIn");
      const check_out = searchParams.get("checkOut");
      const lat = searchParams.get("lat");
      const long = searchParams.get("lng");
      const location = searchParams.get("location");
      const country = searchParams.get("country");
      setFormData({
        location: location,
        city: city,
        code: countryCode,
        country: country,
        lat: lat,
        lng: long,
        dateRange: [check_in, check_out],
      })
      const loc = document.getElementById('location');
      loc.value = location;
    } else {
      const data = localStorage.getItem('HotelSearchData');
      if (data) {
        const newData = JSON.parse(data);
        setFormData({
          location: newData?.location,
          city: newData?.city,
          code: newData?.countryCode,
          country: newData?.country,
          lat: newData?.lat,
          lng: newData?.long,
          dateRange: [newData?.check_in, newData?.check_out],
        })
        const loc = document.getElementById('location');
        loc.value = newData?.location;
      }
    }
    let RoomMap = []
    const roomData = localStorage.getItem('searchRoomSelection');
    if (roomData) {
      RoomMap = JSON.parse(roomData)
    }
    const formattedRooms = RoomMap.map(item => ({
      adults: item.adults,
      children: item.children.length, // count of children
      childrenAges: item.children.map(c => c.age),
      errors: {}
    }));
    setRooms(formattedRooms);
  }, [])
  const router = useRouter();
  const removeRoom = (index) => {
    if (rooms.length === 1) return;
    const updatedRooms = rooms.filter((_, i) => i !== index);
    setRooms(updatedRooms);
  };
  const handleRoomChange = (index, type, delta) => {
    const updatedRooms = [...rooms];
    if (type === "adults") {
      updatedRooms[index].adults = Math.max(1, updatedRooms[index].adults + delta);
    } else if (type === "children") {
      const newCount = Math.max(0, updatedRooms[index].children + delta);
      updatedRooms[index].children = newCount;
      updatedRooms[index].childrenAges = Array(newCount).fill(null);
      if (newCount === 0) {
        updatedRooms[index].errors = [];
      }
    }
    setRooms(updatedRooms);
  };
  const handleAgeChange = (roomIndex, ageIndex, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[ageIndex] = value;
    setRooms(updatedRooms);
  };
  const handleLocationChange = (e) => {
    setFormData((prev) => ({ ...prev, location: e.target.value }));
  }
  const totalAdults = rooms.reduce((sum, room) => sum + room.adults, 0);
  const totalChildren = rooms.reduce((sum, room) => sum + room.children, 0);

  const handlePlaceSelected = (place) => {
    if (!place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    let city = "";
    let country = "";
    let code = "";
    place.address_components.forEach((component) => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("country")) {
        country = component.long_name;
        code = component.short_name;
      }
    });

    setFormData((prev) => ({
      ...prev,
      location: place.formatted_address,
      lat,
      lng,
      city,
      code,
      country,
    }));
  };
  const handleDateChange = (value) => {
    let newValue = value;

    if (!value[0] && !value[1]) {
      newValue = [];
    }
    setFormData((prev) => ({
      ...prev,
      dateRange: newValue,
    }));
  };

  const validateForm = () => {
    // ✅ Check location
    if (!formData.location) {
      notifications.show({
        autoClose: 2000,
        title: "Error",
        message: "Location is required",
        color: "red",
      });
      return false;
    }

    // ✅ Check date range
    if (!formData.dateRange || formData.dateRange.length !== 2) {
      notifications.show({
        autoClose: 2000,
        title: "Error",
        message: "Please select check-in and check-out dates",
        color: "red",
      });
      return false;
    }

    // ✅ Check children ages for each room
    const updatedRooms = rooms.map((room) => {
      const roomErrors = {};
      if (room.children > 0) {
        const hasEmptyAge = room.childrenAges.some((age) => !age);
        if (hasEmptyAge) {
          roomErrors.childrenAges = "Please select age for all children";
        }
      }
      return { ...room, errors: roomErrors };
    });

    setRooms(updatedRooms);

    const hasRoomErrors = updatedRooms.some(
      (room) => Object.keys(room.errors).length > 0
    );

    if (hasRoomErrors) {
      notifications.show({
        autoClose: 2000,
        title: "Error",
        message: "Please select age for all children",
        color: "red",
      });
      setPopoverOpened(true);
      return false;
    }

    return true;
  };
  const SubmitForm = () => {
    if (!validateForm()) return;

    const roomsArray = rooms.map(room => ({
      adults: room.adults,
      children: room.childrenAges.map(age => ({ age: Number(age) }))
    }));
    const queryParams = new URLSearchParams();
    queryParams.set('checkIn', formData.dateRange[0])
    queryParams.set('checkOut', formData.dateRange[1])
    queryParams.set('currency', 'GBP')
    // Destination - flatten for readability
    queryParams.set('city', formData.city)
    queryParams.set('lat', formData.lat)
    queryParams.set('lng', formData.lng)
    queryParams.set('code', formData.code)
    queryParams.set('location', formData.location)
    queryParams.set('country', formData.country)
    localStorage.setItem('searchRoomSelection', JSON.stringify(roomsArray));
    router.push(`/hotels?${queryParams.toString()}`);
  };
 const ClosePopover = () => {
    // ✅ Check children ages for each room
    const updatedRooms = rooms.map((room) => {
      const roomErrors = {};
      if (room.children > 0) {
        const hasEmptyAge = room.childrenAges.some((age) => !age);
        if (hasEmptyAge) {
          roomErrors.childrenAges = "Please select age for all children";
        }
      }
      return { ...room, errors: roomErrors };
    });

    setRooms(updatedRooms);
    const hasRoomErrors = updatedRooms.some(
      (room) => Object.keys(room.errors).length > 0
    );
    if(hasRoomErrors){
      return ;
    }
    setPopoverOpened(false);
  }
  return (
    <div>
      <div className="row ">
        <div className="col-md-3 my-1">
          <Autocomplete id="location" onPlaceSelected={handlePlaceSelected} onChange={handleLocationChange} className="form-control height-25" placeholder="Location" apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            options={{
              types: ['establishment', 'geocode'],
              componentRestrictions: null
            }}
            language='en'
          />
        </div>
        <div className="col-md-3 my-1">
          <DatePickerInput clearable minDate={new Date()} valueFormat="DD-MM-YYYY" numberOfColumns={2} value={formData.dateRange} onChange={handleDateChange} placeholder="Pick dates range" className=" height-25" type="range" />
        </div>
        <div className="col-md-3 my-1">
          <Popover
            width={300}
            opened={popoverOpened}
            onChange={setPopoverOpened}
            position="bottom"
            withArrow
            shadow="md"
            styles={{
              dropdown: {
                maxHeight: 380,       // fixed height
                overflowY: "auto",    // enable scroll
              },
            }}
            clickOutsideEvents={["mouseup", "touchend"]}
          >
            <Popover.Target>
              <button
                onClick={() => setPopoverOpened((o) => !o)}
                className="btn btn-light person-selection w-100 height-25"
              >
                {totalAdults > 1 ? 'Adults' : 'Adult'}  {totalAdults} | {totalChildren > 1 ? 'Childs' : 'Child'}  {totalChildren} | {rooms.length > 1 ? 'Rooms' : 'Room'}  {rooms.length}
              </button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="p-2">
                {rooms.map((room, index) => (
                  <div key={index} className="mt-2">
                    <div className="d-flex justify-content-between  align-items-center">
                      <p className="small m-0">Room {index + 1}</p>
                      {index + 1 !== 1 && (
                        <button onClick={() => removeRoom(index)} className="btn btn-danger x-small btn-sm">
                          Delete
                        </button>
                      )}
                    </div>
                    <hr className="m-1" />
                    <div className="e484bb5b7a mt-2">
                      <div className="c5aae0350e">
                        <label className="small " >
                          Adults
                        </label>
                      </div>
                      <div className="e301a14002">
                        <div className="e301a14002">
                          <button onClick={() => handleRoomChange(index, "adults", -1)} className="adult-modal-btn" >
                            <FaMinus />
                          </button>
                          <span className="mx-2" aria-hidden="true">
                            {room.adults}
                          </span>
                          <button onClick={() => handleRoomChange(index, "adults", 1)} className="adult-modal-btn" >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="e484bb5b7a mt-2">
                      <div className="c5aae0350e">
                        <label className="small " >
                          Children
                        </label>
                      </div>
                      <div className="e301a14002">
                        <div className="e301a14002">
                          <button onClick={() => handleRoomChange(index, "children", -1)} className="adult-modal-btn" >
                            <FaMinus />
                          </button>
                          <span className="mx-2" aria-hidden="true">
                            {room.children}
                          </span>
                          <button onClick={() => handleRoomChange(index, "children", 1)} className="adult-modal-btn" >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mt-2 flex-wrap justify-content-between">
                      {room.childrenAges.map((age, ageIndex) => (
                        <div key={ageIndex} className="kids-age-select">
                          <select onChange={(e) => handleAgeChange(index, ageIndex, e.target.value)}
                            value={age} className="form-control border  form-control-sm">
                            <option value="">Age Needed</option>
                            {[...Array(16).keys()].map((n) => (
                              <option key={n + 1} value={n + 1}>
                                {n + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                    {room.errors.childrenAges && (
                      <p className="text-danger small mt-1">
                        {room.errors.childrenAges}
                      </p>
                    )}
                  </div>
                ))}
                <hr />
                <p onClick={addRoom} className="small cursor-pointer text-end mb-1 text-primary">+ Add Room</p>
                <button onClick={ClosePopover} type="button" className="btn  w-100 btn-outline-success">Done</button>
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        <div className="col-md-3 my-1">
          <button onClick={SubmitForm} className="btn btn-success bg-color w-100 height-25">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
