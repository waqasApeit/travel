import React from 'react'
import { useHotelList } from "../HotelListingContext";
export default function ResetFilter() {
    const {resetFilters} = useHotelList();
    return (
        <div className='text-end mt-3'>
            <p onClick={resetFilters} className='small text-primary cursor-pointer'>Reset filter ?</p>
        </div>
    )
}
