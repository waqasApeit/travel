'use client'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionControl,
    AccordionPanel,
} from "@mantine/core";
export default function WhatExpect({expectData}) {
    return (
        <div>
            <section id="expectation" className="mb-5 mt-4">
                <h5 className="mb-0">What to Expect</h5>
                <p className='small text-muted'>What You Can Expect During the Experience</p>
                <hr />

                <Accordion variant="separated">
                    {expectData.map((item , index) => (
                        <AccordionItem
                            key={index+1}
                            // className={classes?.item}
                            value={`item-${index+1}`}
                        >
                            <AccordionControl>{item.title}</AccordionControl>
                            <AccordionPanel>{item.content}</AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </div>
    )
}
