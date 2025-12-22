"use client";
import { useEffect } from "react";
import { createContext, useContext, useState, useMemo } from "react";
const HotelListContext = createContext();
import { ConvertPrice } from "@/components/Currency/ConvertPrice";
import { useCurrency } from "@/util/currency";
export function HotelListProvider({ children, hotels }) {
    const [convertedHotels, setConvertedHotels] = useState([]);
    const [search, setSearch] = useState(null);
    const { currency, rates } = useCurrency();
    const [star, setStar] = useState([]);
    const [hotelNames, setHotelNames] = useState([]);
    const [sort, setSort] = useState("price-asc");
    const [meal, setMeal] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [resetPrice, setResetPrice] = useState(0);
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        if (hotels && hotels.length > 0) {
            const hotelListNew = hotels.map((item) => {
                const { newcurrency, newprice } = ConvertPrice(item.metadata?.min_price, item.metadata?.currency, currency, rates);
                return {
                    ...item,
                    'currency': newcurrency,
                    'price': newprice,
                };
            });
            const prices = hotelListNew.map((h) => h?.price);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            setMinPrice(min);
            setMaxPrice(max);
            setPriceRange([min, max]);
            const hotelNames = [...new Set(hotelListNew.map((h) => h.name))];
            setHotelNames(hotelNames);
            setConvertedHotels(hotelListNew);
        } else {
            setConvertedHotels([]);
        }
    }, [hotels, rates, currency]);

    const resetFilters = () => {
        setSearch(null);
        setStar([]);
        setMeal([]);
        setSort("price-asc");
        setPriceRange([minPrice, maxPrice]);
        setResetPrice(resetPrice + 1);
        setCurrentPage(1);
    };


    const filteredHotels = useMemo(() => {
        let result = [...convertedHotels];

        // Search
        if (search !== null) {
            result = result.filter((h) =>
                h.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Price
        result = result.filter(
            (h) => h.price >= priceRange[0] && h.price <= priceRange[1]
        );

        // Star Rating
        if (star.length > 0) {
            result = result.filter((h) => {
                const starValue = Math.round(Number(h.metadata?.stars));
                const isNumericStar = !isNaN(starValue) && starValue >= 1 && starValue <= 5;

                // If star includes 0 → allow hotels with non-numeric or out-of-range star values
                if (star.includes(0) && (!isNumericStar)) {
                    return true;
                }

                // Otherwise, normal 1–5 filtering
                return star.includes(starValue);
            });
        }


        // Meal
        if (meal.length > 0) {
            result = result.filter((h) =>
                h.rooms?.some((room) =>
                    room.rates?.some((rate) =>
                        meal.includes(rate.board_name.toLowerCase())
                    )
                )
            );
        }

        // Sort
        if (sort === "price-asc") result.sort((a, b) => a?.price - b?.price);
        if (sort === "price-desc") result.sort((a, b) => b?.price - a?.price);
        if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));

        return result;
    }, [convertedHotels, search, priceRange, star, meal, sort]);

    const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
    const paginatedHotels = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredHotels.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredHotels, currentPage]);
    return (
        <HotelListContext.Provider
            value={{
                hotels: paginatedHotels,
                totalHotels: filteredHotels.length,
                setSearch,
                setPriceRange,
                setStar,
                setSort,
                setMeal,
                totalPages,
                currentPage,
                setCurrentPage,
                itemsPerPage,
                minPrice,
                maxPrice,
                sort,
                star,
                meal,
                search,
                priceRange,
                hotelNames,
                resetPrice,
                resetFilters,
            }}
        >
            {children}
        </HotelListContext.Provider>
    );
}

export function useHotelList() {
    return useContext(HotelListContext);
}
