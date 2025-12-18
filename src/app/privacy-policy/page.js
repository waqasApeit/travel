import React from 'react'
import { Blockquote } from '@mantine/core';
export default function page() {
    return (
        <div>
            <div className='container my-5'>
                <div className='hotel-checkout-top'>
                    <h2>Privacy and Security Policy</h2>
                </div>
                <p className='text-justify'>Your privacy matters to us. At Al Hijaz Tours, we value your trust and take the protection of your personal information very seriously. This document explains the data we collect, how we use it, and the steps we take to safeguard your information.</p>

                <h4 className='mb-0'>Why We Collect or Process Your Personal Data?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    We cannot help you plan or book the perfect travel tours and services without your information. The main purpose of collecting personal details is to provide the requested tours or services, ensure you receive the best service, or for other purposes for which you have given your consent, except where otherwise required by law. Your data also helps us improve our services.
                </Blockquote>

                <h4 className='mb-0 mt-4'>When Do We Collect or Process Your Personal Data?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    We mainly collect information when you provide it directly, such as during registration, completing forms, sending emails, or requesting travel services. We also collect data from your device, like IP address, browser type, and language settings, to ensure a consistent user experience. Additionally, we use website analytics and cookies to enhance our services and provide the best possible experience.
                </Blockquote>

                <h4 className='mb-0 mt-4'>What Kinds of Information We Collect?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    We collect the following personal details:
                    <ul className='mt-3'>
                        <li>Reservation Details: Name, email, phone number, passport, and visa information.</li>
                        <li>Preferences: Nationality, interests, and special requests for meals, accommodation, etc.</li>
                        <li>Unique Identifiers: Username, account number.</li>
                        <li>Billing Information: Credit card details and billing address.</li>
                    </ul>
                </Blockquote>

                <h4 className='mb-0 mt-4'>How Do We Use Your Information?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    <ul>
                        <li>
                            Tailor-Made Trips: To design trips that match your preferences and needs.
                        </li>
                        <li>
                            Website Improvement: To enhance website offerings based on your feedback.
                        </li>
                        <li>
                            Customer Service: To respond effectively to service requests.
                        </li>
                        <li>
                            Transaction Processing: Your information is never sold, exchanged, or transferred without consent.
                        </li>
                        <li>
                            Legal Requirements: In certain cases, we may share data with governmental or other authorities if required by law.
                        </li>
                    </ul>
                </Blockquote>

                <h4 className='mb-0 mt-4'>How Do We Protect Your Information?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Your personal data will never be shared with third parties without consent, unless legally required. We have strict procedures in place to prevent unauthorized access, misuse, or loss of your data. Only authorized personnel and required service providers have access to personal information during the course of their work.
                </Blockquote>

                <h4 className='mb-0 mt-4'>Third-Party Responsibility and Your Responsibility</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Our website may contain links to other sites such as Facebook, YouTube, etc. When visiting these sites, your data is governed by their privacy policies. Al Hijaz Tours is not responsible for data protection on these sites.
                    <div className='mt-3'>
                        With your permission, we may share travel stories, images, and reviews on our website or social platforms. Once you submit this information, you agree it may be publicly viewed. If you share information about other people in your group, it is your responsibility to ensure they are aware and have accepted our privacy policy.
                    </div>
                </Blockquote>

                <h4 className='mb-0 mt-4'>How to Contact Us?</h4>
                <Blockquote color="darkgreen" className='mt-2' mt="xl">
                    Your privacy is crucial to us. If you have any questions or concerns about our privacy practices, please contact us at: <a href='mailto:info@travel.com' className='text-decoration-none fw-bold '>info@travel.com</a>
                </Blockquote>
            </div>
        </div>
    )
}
