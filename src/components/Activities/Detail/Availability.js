'use client'
import React, { useState, useMemo } from 'react'
import moment from 'moment'

export default function Availability({PackageDetail}) {
    const [showAll, setShowAll] = useState(false);

    // Generate available dates based on start_date, end_date, and open_hours
    const availableDates = useMemo(() => {
        if (!PackageDetail?.start_date || !PackageDetail?.end_date || !PackageDetail?.open_hours) {
            return [];
        }

        const dates = [];
        const startDate = moment(PackageDetail.start_date);
        const endDate = moment(PackageDetail.end_date);
        const openHours = PackageDetail.open_hours;

        // Iterate through each date from start to end
        let currentDate = startDate.clone();
        while (currentDate.isSameOrBefore(endDate)) {
            const dayName = currentDate.format('dddd').toLowerCase();
            const dayInfo = openHours[dayName];

            // Only include dates where the day is enabled
            if (dayInfo && dayInfo.enabled === "1") {
                dates.push({
                    date: currentDate.clone(),
                    dayName: currentDate.format('dddd'),
                    formattedDate: currentDate.format('DD-MM-YYYY'),
                    openTime: dayInfo.open,
                    closeTime: dayInfo.close
                });
            }

            currentDate.add(1, 'day');
        }

        return dates;
    }, [PackageDetail]);

    // Format time from 24hr to 12hr format
    const formatTime = (time) => {
        if (!time) return "";
        return moment(time, 'HH:mm').format('hh:mm A');
    };

    // Show only first 4 dates or all based on state
    const displayDates = showAll ? availableDates : availableDates.slice(0, 4);

    return (
        <div>
            <div className="available-dates rounded p-3 border">
                <h5 className="fw-bold mb-0">Availability</h5>
                <p className='small text-muted'>Check available dates and times</p>
                {availableDates.length === 0 ? (
                    <p className="text-muted">No available dates for this activity.</p>
                ) : (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Day of Week</th>
                                    <th scope="col">Open</th>
                                    <th scope="col">Close</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayDates.map((dateInfo, index) => (
                                    <tr key={index}>
                                        <td>{dateInfo.dayName} - {dateInfo.formattedDate}</td>
                                        <td>{formatTime(dateInfo.openTime)}</td>
                                        <td>{formatTime(dateInfo.closeTime)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {availableDates.length > 4 && (
                            <button 
                                className="btn btn-link p-0 m-0 text-center w-100"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Show Less' : 'View All'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
