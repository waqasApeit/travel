'use client'
import React from 'react'
import { useHotelList } from '../HotelListingContext'
import { Select } from '@mantine/core';
export default function SearchBar() {
    const { hotelNames, setSearch, search } = useHotelList();
    return (
        <div className='hotel-filter'>
            <p className='small fw-bold'>Search By Name</p>
            <Select
                value={search}
                onChange={(value)=>setSearch(value)}
                placeholder="Hotel name"
                data={hotelNames || null}
                searchable
                clearable
            />
        </div>
    )
}
