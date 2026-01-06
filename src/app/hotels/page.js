'use client'
import {useEffect, useState } from "react";
import { MdFilterListAlt } from "react-icons/md";
import SearchBar from '@/components/Hotels/HotelListing/Filters/SearchBar';
import HotelCard from '@/components/Hotels/HotelListing/HotelCard';
import PriceRange from '@/components/Hotels/HotelListing/Filters/PriceRange';
import SortOption from '@/components/Hotels/HotelListing/Filters/SortOption';
import StarFilter from '@/components/Hotels/HotelListing/Filters/StarFilter';
import MealType from '@/components/Hotels/HotelListing/Filters/MealType';
import ResetFilter from "@/components/Hotels/HotelListing/Filters/ResetFilter";
import { HotelListProvider } from '@/components/Hotels/HotelListing/HotelListingContext';
import HotelListingPaginations from '@/components/Hotels/HotelListing/HotelListingPaginations';
import HotelMap from '@/components/Hotels/HotelListing/HotelMap';
import { useSearchParams } from "next/navigation";
import HotelCardLoader from "@/components/Loader/HotelCardLoader";
import HotelModify from "@/components/Home/Search/ModifySearch/HotelModify";
import { useQuery } from '@tanstack/react-query';
export default function Page() {
    const [progress, setProgress] = useState(0);
    const searchParams = useSearchParams();
    const city = searchParams.get("city");
    const countryCode = searchParams.get("code");
    const currency = searchParams.get("currency");
    const check_in = searchParams.get("checkIn");
    const check_out = searchParams.get("checkOut");
    const lat = searchParams.get("lat");
    const long = searchParams.get("lng");
    const location = searchParams.get("location");
    const country = searchParams.get("country");
    const rooms = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('searchRoomSelection')) || [] : [];
    const queryParams = { city, countryCode, currency, check_in, check_out, lat, long, rooms, location, country};
    const { data: hotelsList = [], isLoading, isError, error } = useQuery({
        queryKey: ['hotels', queryParams],
        queryFn: fetchHotelsFn,
        enabled: !!city && !!check_in && !!check_out,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        cacheTime: 1000 * 60 * 20,
        staleTime: 20 * 60 * 1000
    });
    useEffect(() => {
        if (isLoading) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress(prev => (prev < 90 ? prev + 10 : prev));
            }, 600);
            return () => clearInterval(interval);
        } else {
            setProgress(100);
        }
    }, [isLoading]);
    return (
        <div>
            <HotelListProvider hotels={hotelsList}>
                <section className="page-title-section breadcrumHotel-bg text-center d-flex align-items-center justify-content-center">
                    <div className='page-title-overlay'></div>
                    <div className="container">
                        {isLoading ? (
                            <h1 className="text-white fw-bold">Searching Hotels...</h1>
                        ) : (
                            <h1 className="text-white fw-bold">
                                {hotelsList.length} {hotelsList.length > 1 ? 'Hotels' : 'Hotel'} Found
                            </h1>
                        )}
                    </div>
                </section>
                <div className="container search-box bg-light rounded p-2 position-relative " style={{ top: '-2em' }}>
                    <HotelModify />
                </div>

                <div className='container mt-2 mb-5'>
                    <div className='row'>
                        <div className='col-md-3 col-sm-12 col-12'>
                            <div className='filter_box rounded'>
                                <a className="d-flex justify-content-between fw-bold align-items-center" data-bs-toggle="collapse" href="#collapseFilters" aria-expanded="false" aria-controls="collapseFilters" id="filters_col_bt">
                                    Filters
                                    <MdFilterListAlt />
                                </a>
                                <div className='collapse show' id='collapseFilters'>
                                    <hr />
                                    <SearchBar />
                                    <hr />
                                    <SortOption />
                                    <hr />
                                    <PriceRange />
                                    <hr />
                                    <StarFilter />
                                    <hr />
                                    <MealType />
                                    <ResetFilter/>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-9 col-sm-12 col-12'>
                            {isLoading && (
                                <div className="mb-3">
                                    <div className='mb-2'>
                                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> Searching Hotels</div>
                                    <div className="progress" style={{ height: '5px' }}>
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            )}
                            {isLoading && <HotelCardLoader />}
                            {!isLoading && hotelsList.length > 0 && <HotelMap hotels={hotelsList} lat={lat} long={long} />}
                            <HotelCard isLoading={isLoading} />
                            <HotelListingPaginations />
                        </div>
                    </div>
                </div>
            </HotelListProvider>
        </div>
    )
}

async function fetchHotelsFn({ queryKey }) {
    const [, params] = queryKey; // queryKey = ['hotels', { ...params }]
    const { city, countryCode, currency, check_in, check_out, lat, long, rooms, location, country} = params;
    const searchData = { city, countryCode, currency, check_in, check_out, lat, long, location, country };
    localStorage.setItem('HotelSearchData', JSON.stringify(searchData));
    const request = {
        "checkIn": check_in,
        "checkOut": check_out,
        "destination": {
            "city": city,
            "latitude": lat,
            "longitude": long,
            "countryCode": countryCode
        },
        "currency": currency,
        "rooms": rooms
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotel/search`, {
        method: 'POST',
        cache: 'no-store',
        // headers: {
        //     'Content-Type': 'application/json',
        //     'ngrok-skip-browser-warning': 'true',
        //     "Access-Control-Allow-Origin": '*'
        // },
        body: JSON.stringify(request),
    });

    if (!res.ok) {
        throw new Error('Failed to fetch hotels');
    }

    const data = await res.json();
    if (!data.success ) {
        return [];
    }
    return data.data?.hotels || [];
}
