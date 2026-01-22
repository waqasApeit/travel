import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import SectionOne from '@/components/AboutUs/SectionOne';
import SectionTwo from '@/components/AboutUs/SectionTwo';
import SectionThree from '@/components/AboutUs/SectionThree';
import Link from 'next/link';
import { Philosopher } from 'next/font/google';

const philosopher = Philosopher({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function page() {
    return (
        <div className={philosopher.className}>
            {/* <section className="page-title-section about-bg-page text-center d-flex align-items-center justify-content-center">
                 <div className='page-title-overlay'></div>
                <div className="container">
                    <h1 className="text-white fw-bold">About Us</h1>
                    <p><Link className='text-light' href='/'>Home</Link> <FaAngleRight/> About us</p>
                </div>
            </section> */}
            <SectionThree/>
            <SectionTwo/>
            <SectionOne/>
        </div>
    )
}
