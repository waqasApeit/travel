import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import SectionOne from '@/components/AboutUs/SectionOne';
import SectionTwo from '@/components/AboutUs/SectionTwo';
import SectionThree from '@/components/AboutUs/SectionThree';
export default function page() {
    return (
        <div>
            <section className="page-title-section about-bg-page text-center d-flex align-items-center justify-content-center">
                 <div className='page-title-overlay'></div>
                <div className="container">
                    <h1 className="text-white fw-bold">About Us</h1>
                    <p>Home <FaAngleRight/> About us</p>
                </div>
            </section>
            <SectionThree/>
            <SectionTwo/>
            <SectionOne/>
        </div>
    )
}
