'use client'
import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import style from './style.module.css'
import { FaArrowUp } from "react-icons/fa";
import Lenis from 'lenis'
import { useEffect } from 'react'

// Export lenis instance to be controlled by modals
export let lenisInstance = null;

const ScrollTop = () => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            smooth: true,
            prevent: (node) => {
                // Prevent Lenis on Mantine modal and overlay elements
                return node.closest('.mantine-Modal-root') || 
                       node.closest('.mantine-Overlay-root') ||
                       node.closest('[role="dialog"]');
            },
        });

        lenisInstance = lenis; // Store instance globally

        // RAF loop
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy(); // Cleanup
            lenisInstance = null;
        };
    }, []);
    return (
        <ul className={style.smothscroll} >
            <li><AnchorLink href='#scrool'><i className="ti-arrow-up"><FaArrowUp/></i></AnchorLink></li>
        </ul>

    )
}

export default ScrollTop;
