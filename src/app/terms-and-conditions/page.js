import React from 'react'
import { Blockquote } from '@mantine/core';
import { FaAngleRight } from "react-icons/fa";
export default function page() {
    return (
        <>
              <section className="page-title-section contact-bg-page text-center d-flex align-items-center justify-content-center">
                    <div className="page-title-overlay"></div>
                    <div className="container">
                      <h1 className="text-white fw-bold">Terms and Conditions</h1>
                      <p>
                        Home <FaAngleRight /> Terms and Conditions
                      </p>
                    </div>
                  </section>
            <div className='container my-5'>
                <div className='hotel-checkout-top'>
                    <h2>Terms and Conditions</h2>
                </div>
                <p className='text-justify'>At Kashta Travels, we are committed to providing pilgrims with a safe, comfortable, and spiritually enriching journey. Our Hajj and Umrah packages are designed to simplify every step of your pilgrimage. These Terms and Conditions outline your rights, responsibilities, and our services to ensure a smooth and transparent experience.</p>
                <h4 className='mb-0'>Booking and Confirmation</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    When you book with Kashta Travels, your booking is confirmed once payment is received and acknowledgment is sent via email. We ask that all details you provide, including personal information, passport details, and travel preferences, are accurate and complete. Package availability is subject to change until confirmation is finalized.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Payment Policy</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    To secure your pilgrimage package, a deposit is required at the time of booking. Full payment must be completed before the travel date, as per the invoice and package requirements. Payments can be made via bank transfer, online portals, or other approved methods. Timely payments are crucial to ensure your travel arrangements and visa processing.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Cancellation and Refunds</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    We understand that travel plans can change. Cancellations must be communicated in writing. Refunds depend on the package type, timing, and airline or visa regulations. Some service fees or processing charges may apply. For Hajj and Umrah packages, early cancellations allow for higher refund percentages, while late cancellations may incur higher deductions. If you cancel your booking, any charges applied by third-party payment gateways will be the responsibility of the customer.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Changes to Packages</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Kashta Travels reserves the right to make changes to itineraries, hotels, flights, or ground services if operational circumstances require it. We will communicate any major changes promptly and work with you to minimize inconvenience. Minor adjustments may occur due to local regulations or service providers.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Responsibilities and Liability</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Pilgrims are responsible for ensuring passports, visas, vaccinations, and personal belongings are complete and accurate. Kashta Travels is not liable for delays, cancellations, or other circumstances outside our control, including airline changes, government regulations, or unforeseen events. We strongly recommend travel insurance to cover unexpected incidents.
                </Blockquote>

                <h4 className='mb-0 mt-4'>Travel Documents and Visa</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Every pilgrim must carry a valid passport and visa. Our team assists with visa processing, but approval is subject to Saudi government regulations. Any errors or delays in documentation that affect travel are the responsibility of the pilgrim.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Code of Conduct</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    To ensure a peaceful and respectful environment for all pilgrims, we request that everyone follows local laws, respects cultural norms, and observes proper behavior during travel and within holy sites. Disruptive behavior may lead to removal from services without refund.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Ziyarat and Religious Guidance</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Some of our packages include guided Ziyarat to important Islamic sites in Makkah and Madinah. Pilgrims are encouraged to follow guidance from our experienced staff for a fulfilling and organized spiritual experience.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Privacy and Data Protection</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    We respect your privacy. Personal information collected during booking is securely stored and used only to arrange your pilgrimage. Data will not be shared with third parties without your consent, except where required by law.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Governing Law</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    These Terms and Conditions are governed by the laws of the United Kingdom. Any disputes arising from your booking or travel arrangements will be resolved under UK jurisdiction.
                </Blockquote>
                <h4 className='mb-0 mt-4'>Your Journey, Our Commitment</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    At Kashta Travels, we are working to make your Hajj or Umrah experience meaningful and unforgettable. By following these Terms and Conditions, both pilgrims and our team can ensure a safe, organized, and spiritually rewarding journey.
                </Blockquote>
            </div>
        </>
    )
}
