'use client'
import React from 'react'
import { useHotelList } from '../HotelListingContext'
export default function SortOption() {
    const { sort, setSort } = useHotelList();
    return (
        <div>
            <p className='small fw-bold'>Order By</p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="form-select mt-2">
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A-Z</option>
            </select>
        </div>
    )
}
