import React from 'react'
import {Grid, GridCol } from '@mantine/core';
export default function HotelDetailLoader() {
    return (
        <div>
            <Grid grow gutter="xs">
                <GridCol span={{ base: 12, md: 12, lg: 6 }} className="position-relative">
                    <div
                        className="bg-light rounded w-100 placeholder-glow"
                        style={{ height: "15em" }}
                    >
                        <span className="placeholder col-12 h-100 rounded"></span>
                    </div>
                </GridCol>
                <GridCol span={{ base: 12, md: 12, lg: 6 }}>
                    <Grid grow gutter="xs">
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                        <GridCol span={{ base: 4, md: 4, lg: 4 }}>
                            <div
                                className="bg-light rounded w-100 placeholder-glow"
                                style={{ height: "7em" }}
                            >
                                <span className="placeholder col-12 h-100 rounded"></span>
                            </div>
                        </GridCol>
                    </Grid>
                </GridCol>
            </Grid>
            <div className="bg-light rounded w-100 mt-3 placeholder-glow"
                style={{ height: "15em" }}
            >
                <span className="placeholder bg-success col-12 h-100 rounded">
                </span>
               
            </div>
            <div className="bg-light rounded w-100 mt-3 placeholder-glow"
                style={{ height: "15em" }}
            >
                <span className="placeholder  col-12 h-100 rounded">
                </span>
               
            </div>
            <div className="bg-light rounded w-100 mt-3 placeholder-glow"
                style={{ height: "15em" }}
            >
                <span className="placeholder  col-12 h-100 rounded">
                </span>
               
            </div>
        </div>
    )
}
