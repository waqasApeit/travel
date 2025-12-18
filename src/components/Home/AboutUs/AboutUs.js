import React from 'react'
import './aboutus.css'
import Link from 'next/link';
import Image from 'next/image'
import { MdHealthAndSafety } from "react-icons/md";
import { IoMan } from "react-icons/io5";
export default function AboutUs() {
    return (
    <>
     <section className="about-one">
            <div className="container">
              <div className="row">
                <div
                  className="col-xl-6 col-lg-6 wow animate__fadeInLeft"
                  data-wow-delay="200ms"
                >
                  <div className="about-one__image ">
                    <div className="row">
                      <div className="col-md-5">
                        <div
                          className="about-one__image__one trevlo-tilt d-flex d-md-block gap-3"
                          data-tilt-options='{ "glare": false, "maxGlare": 0, "maxTilt": 3, "speed": 700, "scale": 1 }'
                        >
                          <img src='/images/home/about-1-1.ab752ecdb58d2c4cb178.jpg' alt="trevlo" />
                          <img src='/images/home/about-1-2.f91bde4cefe5ed09cf63.jpg' alt="trevlo" />
                         
                        </div>
                      </div>
                      <div className="col-md-7">
                        <div className="about-one__image__two">
                        
                          <div
                            className="trevlo-tilt"
                            data-tilt-options='{ "glare": false, "maxGlare": 0, "maxTilt": 5, "speed": 700, "scale": 1 }'
                          >
                            <img src='images/home/about-1-3.7765cfca97f837a53a2f.jpg' alt="trevlo" />
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-6 col-lg-6 wow animate__animated animate__fadeInRight"
                  data-wow-delay="200ms"
                >
                  <div className="about-one__content">
                    <div className="sec-title text-left">
                      <p className="sec-title__tagline">GET TO KNOW US</p>

                      <h2 className="sec-title__title">
                        Experience the World with Our Trevlo Company
                      </h2>
                    </div>
                    <p className="about-one__content__text">
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some
                    </p>
                    <div className="about-one__box">
                      <div className="about-one__box__icon">
                        <span className="icon-safety">
                          <MdHealthAndSafety />
                        </span>
                      </div>
                      <h3 className="about-one__box__title">
                        Safety First
                        <br /> Always
                      </h3>
                      <p className="about-one__box__text">
                       We follow strict safety standards 
                        <br />to give you peace of mind throughout your experience.
                      </p>
                    </div>
                    <div className="about-one__box">
                      <div className="about-one__box__icon">
                        <span className="icon-friendly-Guide">
                          <IoMan />
                        </span>
                      </div>
                      <h3 className="about-one__box__title">
                        Friendly
                        <br /> Guide
                      </h3>
                      <p className="about-one__box__text">
                       Helpful, knowledgeable, and friendly guidance 
                        <br /> at every step of your experience.
                      </p>
                    </div>
                    <Link href="/about-us" className="trevlo-btn">
                      <span>Discover More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          
    </>
    )
}
