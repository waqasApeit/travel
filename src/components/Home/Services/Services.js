'use client'
import React from 'react'
import style from './Services.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import moment from 'moment';
export default function Services() {
    const router = useRouter();
    const HotelListing = (cname) => {
        var lat ;
        var lng ;
        var code ;
        var location ;
        var country ;
        var city = '';
        if(cname === 'makkah'){
            lat = 21.4240968;
            lng = 39.81733639999999;
            code = 'SA';
            location = 'Makkah Saudi Arabia';
            country = 'Saudi Arabia';
            city = 'Makkah';
        }else if(cname === 'madinah'){
            lat = 24.4672132;
            lng = 39.6024496;
            code = 'SA';
            location = 'Madinah Saudi Arabia';
            country = 'Saudi Arabia';
            city = 'Madinah';
        }else if(cname === 'london'){
            lat = 51.5072178;
            lng = -0.1275862;
            code = 'GB';
            location = 'London, UK';
            country = 'United Kingdom';
            city = 'London';
        }else if(cname === 'dubai'){
            lat = 25.2048493;
            lng = 55.2707828;
            code = 'AE';
            location = 'Dubai - United Arab Emirates';
            country = 'United Arab Emirates';
            city = 'Dubai';
        }
        const queryParams = new URLSearchParams();
        queryParams.set('checkIn', moment().add(1, "days").format("YYYY-MM-DD"))
        queryParams.set('checkOut', moment().add(2, "days").format("YYYY-MM-DD"))
        queryParams.set('currency', 'GBP')
        queryParams.set('city', city)
        queryParams.set('lat', lat)
        queryParams.set('lng', lng)
        queryParams.set('code', code)
        queryParams.set('location', location)
        queryParams.set('country', country)
        const roomsArray = [
            {
                "adults": 2,
                "children": []
            }
        ]
        localStorage.setItem('searchRoomSelection', JSON.stringify(roomsArray));
        router.push(`/hotels?${queryParams.toString()}`);
    }
    return (
        <div className={style.serviceswrapper}>
            <div className='container'>
                <p className='text-muted h5 text-center'>Find the best hotels with premium stays</p>
                <h1 className={style.topheading}>Choose Your Next Destination</h1>
                <div className="row">
                    <div className="col-lg-3 mb-3">
                        <div className={style.packageBox} onClick={()=>HotelListing('makkah')}>
                            <Image
                                height={400}
                                width={300}
                                quality={100}
                                src="/images/home/makkah.jpg"
                                alt="Package Side"
                                className="object-fit-cover rounded-3"
                            />
                            <div className={style.packageBoxHeading}>
                                <h4 className='mb-0'>Makkah</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className={style.packageBox} onClick={()=>HotelListing('madinah')}>
                            <Image
                                height={400}
                                width={300}
                                quality={100}
                                src="/images/home/madinah.jpg"
                                alt="Package Side"
                                className="object-fit-cover rounded-3"
                            />
                            <div className={style.packageBoxHeading}>
                                <h4 className="mb-1">Madinah</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className={style.packageBox} onClick={()=>HotelListing('dubai')}>
                            <Image
                                height={400}
                                width={300}
                                quality={100}
                                src="/images/home/Dubai.png"
                                alt="Package Side"
                                className="object-fit-cover rounded-3"
                            />
                            <div className={style.packageBoxHeading}>
                                <h4 className='mb-0'>Dubai</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 mb-3">
                        <div className={style.packageBox} onClick={()=>HotelListing('london')}>
                            <Image
                                height={400}
                                width={300}
                                quality={100}
                                src="/images/home/london.jpg"
                                alt="Package Side"
                                className="object-fit-cover rounded-3"
                            />
                            <div className={style.packageBoxHeading}>
                                <h4 className='mb-0'>London</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
