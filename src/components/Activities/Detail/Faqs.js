import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
} from "@mantine/core";
export default function Faqs({faqsList}) {
    return (
        <div>
            <section id="faqs" className="mb-5 mt-4">
                <h5 className="mb-0">FAQs</h5>
                <p className='small text-muted'>Frequently Asked Questions about the Experience</p>
                <hr />
                <Accordion variant="separated">
                    {faqsList.map((item, index) => (
                        <AccordionItem
                            value={`faq-${index}`}
                            key={index}
                        // className={classes?.item}
                        >
                            <AccordionControl>{item.title}</AccordionControl>
                            <AccordionPanel>{item.description}</AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}
