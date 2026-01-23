"use client";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { Accordion } from "@mantine/core";
import { Philosopher } from "next/font/google";
const philosopher = Philosopher({
  subsets: ["latin"],
  weight: "400",
});
export default function page() {
  return (
    <div>
      {/* <section className="page-title-section breadcrum-bg text-center d-flex align-items-center justify-content-center">
        <div className="page-title-overlay"></div>
        <div className="container">
          <h1 className="text-white fw-bold">FAQs</h1>
          <p>
            Home <FaAngleRight /> FAQs
          </p>
        </div>
      </section> */}
      <div className="container my-5 ">
        <div className='hotel-checkout-top'>
                    <h2 className={`fw-bold text-center ${philosopher.className}`}>Frequently Asked Questions</h2>
                </div>
        {/* <h3 className={`mb-3 fw-bold text-center ${philosopher.className}`}>Frequently Asked Questions</h3> */}
        <p className={`text-justify ${philosopher.className}`}>
          There are a lot of questions that come up when you plan your Hotel or Excursions trip. AtTravels Tours, we've put together a list of the most
          common questions to help pilgrims learn more about our services,
          packages, and travel advice. Check out these frequently asked
          questions to make your spiritual journey easy, informed, and
          enjoyable.
        </p>
        <div className="mt-4 faq-accordion">
          <Accordion defaultValue="q1" radius="md" transitionDuration={300}>
            <Accordion.Item value="q1">
              <Accordion.Control className={`${philosopher.className}`}>
                What services do you offer for hotels and excursions?
              </Accordion.Control>
              <Accordion.Panel>
                We provide complete hotel booking and excursion services,
                including accommodation reservations, sightseeing tours, guided
                excursions, transportation arrangements, and customized travel
                experiences to ensure a comfortable and memorable trip.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q2">
              <Accordion.Control className={`${philosopher.className}`}>
                When should I book my hotel or excursion package?
              </Accordion.Control>
              <Accordion.Panel>
                We recommend booking your hotel and excursions in advance to
                secure the best rates, preferred room categories, and guaranteed
                availability, especially during peak travel seasons.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q3">
              <Accordion.Control className={`${philosopher.className}`}>
                Can I customize my hotel stay or excursion itinerary?
              </Accordion.Control>
              <Accordion.Panel>
                Yes, all our hotel stays and excursion plans can be customized
                according to your preferences, travel dates, budget, and
                interests to create a personalized travel experience.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q4">
              <Accordion.Control className={`${philosopher.className}`}>
                Is it possible to upgrade my hotel after booking?
              </Accordion.Control>
              <Accordion.Panel>
                Yes, hotel upgrades are possible after booking, subject to
                availability. Our team will assist you in selecting alternative
                options that match your comfort level and budget.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q5">
              <Accordion.Control className={`${philosopher.className}`}>
                Do you provide transportation for excursions?
              </Accordion.Control>
              <Accordion.Panel>
                Yes, we offer complete transportation services for excursions,
                including airport transfers, city tours, intercity travel, and
                local sightseeing transport for a hassle-free journey.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q6">
              <Accordion.Control className={`${philosopher.className}`}>
                Are excursions suitable for families and children?
              </Accordion.Control>
              <Accordion.Panel>
                Absolutely. Our excursions are family-friendly, and we also
                offer special activities suitable for children, ensuring a safe
                and enjoyable experience for all age groups.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q7">
              <Accordion.Control className={`${philosopher.className}`}>
                What type of excursions do you offer?
              </Accordion.Control>
              <Accordion.Panel>
                We offer a wide range of excursions including city tours,
                cultural experiences, historical site visits, adventure
                activities, nature trips, and guided sightseeing tours,
                depending on the destination.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q8">
              <Accordion.Control className={`${philosopher.className}`}>
                What should I know before booking an excursion?
              </Accordion.Control>
              <Accordion.Panel>
                Before booking, you should review the itinerary, duration,
                inclusions, physical requirements, and weather conditions. Our
                team provides full guidance to help you choose the right
                excursion.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q9">
              <Accordion.Control className={`${philosopher.className}`}>
                Do your packages include hotel accommodations?
              </Accordion.Control>
              <Accordion.Panel>
                Yes, our packages include carefully selected hotels located in
                convenient areas. You can choose from standard, deluxe, or
                premium accommodations based on your preference.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="q10">
              <Accordion.Control className={`${philosopher.className}`}>
                What is the booking process for hotels and excursions?
              </Accordion.Control>
              <Accordion.Panel>
                Booking is simple. You can reserve your hotel or excursion
                through our website, by phone, or by visiting our office. Our
                travel experts will guide you through each step for a smooth
                booking experience.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
