"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";

import { ArrowButton } from "./ui/ArrowButton";
import { SectionHeading } from '../components/ui/SectionHeading';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const BACKGROUND_IMAGE = {
    src: "https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black.jpeg",
    srcSet: "https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-500x272.jpeg 500w, https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-768x418.jpeg 768w, https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-1400x762.jpeg 1400w, https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-1536x836.jpeg 1536w, https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-2000x1089.jpeg 2000w, https://kota-content.b-cdn.net/app/uploads/2024/05/Statistics-bg-black-2048x1115.jpeg 2048w"
};

const STATISTICS_DATA = [
    {
        logo: "https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Logo-White.svg",
        percentage: "67.6%",
        description: "aumento de las sesiones activas por usuario al cabo de un mes.",
        link: "/work/project-1",
        mainImage: {
            src: "https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Image.png",
            srcSet: "https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Image.png 1354w, https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Image-500x408.png 500w, https://kota-content.b-cdn.net/app/uploads/2025/04/Pison-Image-768x626.png 768w",
            alt: ""
        }
    },
    {
        logo: "https://kota-content.b-cdn.net/app/uploads/2025/04/DKA-Logo-White.svg",
        percentage: "70.8%",
        description: "aumento de las sesiones activas por usuario al cabo de un mes.",
        link: "/work/project-2",
        mainImage: {
            src: "https://kota-content.b-cdn.net/app/uploads/2025/04/DKA-Image.png",
            srcSet: "https://kota-content.b-cdn.net/app/uploads/2025/04/DKA-Image.png 1353w, https://kota-content.b-cdn.net/app/uploads/2025/04/DKA-Image-500x399.png 500w, https://kota-content.b-cdn.net/app/uploads/2025/04/DKA-Image-768x612.png 768w",
            alt: ""
        }
    },
    {
        logo: "https://kota-content.b-cdn.net/app/uploads/2025/04/Wogan-Logo-White.svg",
        percentage: "83.14%",
        description: "aumento de las sesiones activas por usuario al cabo de un mes.",
        link: "/work/project-3",
        mainImage: {
            src: "https://kota-content.b-cdn.net/app/uploads/2025/04/Wogan-Image.png",
            srcSet: "https://kota-content.b-cdn.net/app/uploads/2025/04/Wogan-Image.png 1354w, https://kota-content.b-cdn.net/app/uploads/2025/04/Wogan-Image-500x295.png 500w, https://kota-content.b-cdn.net/app/uploads/2025/04/Wogan-Image-768x453.png 768w",
            alt: ""
        }
    },
    {
        logo: "https://kota-content.b-cdn.net/app/uploads/2025/04/ISI-Logo-White.svg",
        percentage: "104.9%",
        description: "aumento de las sesiones activas por usuario al cabo de un mes.",
        link: "/work/project-3",
        mainImage: {
            src: "https://kota-content.b-cdn.net/app/uploads/2025/04/ISI-Image-WhiteOutline.png",
            srcSet: "https://kota-content.b-cdn.net/app/uploads/2025/04/ISI-Image-WhiteOutline.png 1361w, https://kota-content.b-cdn.net/app/uploads/2025/04/ISI-Image-WhiteOutline-500x397.png 500w, https://kota-content.b-cdn.net/app/uploads/2025/04/ISI-Image-WhiteOutline-768x610.png 768w",
            alt: ""
        }
    }
];

export default function Statistics() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pushFactor, setPushFactor] = useState(5);

    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const updateFactor = () => setPushFactor(window.innerWidth < 770 ? 4 : 4.2);
        updateFactor();
        window.addEventListener("resize", updateFactor);
        return () => window.removeEventListener("resize", updateFactor);
    }, []);

    const handleNext = () => {
        if (currentIndex < STATISTICS_DATA.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const threshold = 50;
        const isButton = (event.target as HTMLElement).closest('a') !== null;
        if (isButton) return;

        if (info.offset.x > threshold) {
            if (currentIndex < STATISTICS_DATA.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            }
        } else if (info.offset.x < -threshold) {
            if (currentIndex > 0) {
                setCurrentIndex((prev) => prev - 1);
            }
        }
    };

    useGSAP(() => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 850px)", () => {
            const heading = sectionRef.current?.querySelector('.animate-heading');
            const cardsContainer = sectionRef.current?.querySelector('.animate-cards');

            if (heading && cardsContainer) {
                gsap.fromTo(heading,
                    { y: 0, opacity: 1, scale: 1 },
                    {
                        y: 220,
                        opacity: 0,
                        scale: 0.95,
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 30%", // El título y tarjetas suben estáticos. La animación espera hasta que el H2 llegue al 30% superior.
                            end: "top -20%", // Terminamos más arriba (fuera de la pantalla) para conservar exactamente la misma velocidad y fluidez.
                            scrub: true,
                        }
                    }
                );

                gsap.fromTo(cardsContainer,
                    { y: 40 },
                    {
                        y: -120,
                        scrollTrigger: {
                            trigger: heading,
                            start: "top 30%", // Debe coincidir
                            end: "top -20%", // Debe coincidir
                            scrub: true,
                        }
                    }
                );
            }
        });
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-black pt-[5rem] pb-[2.5rem] min-[850px]:pt-[10rem] min-[850px]:pb-[0] text-white z-10 relative overflow-x-clip w-full">
            <style>{`
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-rainbow {
                    animation: rainbow 3s ease-in-out infinite;
                }
                .dead-zone {
                    user-select: none;
                    -webkit-user-drag: none;
                }
            `}</style>

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" />

            <div className="animate-heading container mx-auto px-[7%] relative z-[1]">
                <SectionHeading line1="NUESTROS" line2="RESULTADOS" showIcon={false} />
            </div>

            <div className="mt-[0] relative w-full overflow-x-clip contain-paint py-[2rem] -my-[2rem] animate-leave  animate-cards z-[2]">
                <div className="relative box-border w-full mx-auto">

                    <div className="w-[82%] md:w-[85%] max-w-[1400px] min-[1920px]:max-w-[1800px] mx-auto relative grid items-stretch min-w-0">

                        {STATISTICS_DATA.map((item, index) => {
                            const isFront = index === currentIndex;
                            const isPast = index < currentIndex;
                            const offset = index - currentIndex;

                            let xPos = 0;
                            let scale = 1;
                            let opacity = 1;
                            let zIndex = isFront ? 50 : (isPast ? 60 - index : 40 - offset);

                            if (isPast) {
                                xPos = 150;
                                opacity = 1;
                                scale = 1;
                            } else if (!isFront) {
                                scale = 1 - (offset * 0.04);
                                xPos = -(offset * pushFactor);
                            }

                            return (
                                <motion.div
                                    key={index}
                                    className={`col-start-1 row-start-1 w-full cursor-grab active:cursor-grabbing dead-zone px-1 py-2 md:px-4 md:py-4 ${isFront ? 'pointer-events-auto' : 'pointer-events-none'}`}
                                    drag={isFront ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={{
                                        left: currentIndex > 0 ? 0.2 : 0,
                                        right: currentIndex < STATISTICS_DATA.length - 1 ? 0.2 : 0
                                    }}
                                    onDragEnd={isFront ? handleDragEnd : undefined}
                                    initial={false}
                                    animate={{
                                        x: `${xPos}%`,
                                        scale: scale,
                                        opacity: opacity,
                                        zIndex: zIndex
                                    }}
                                    transition={{
                                        type: "tween",
                                        ease: [0.32, 0.72, 0, 1],
                                        duration: 0.6
                                    }}
                                >
                                    <div className="border-2 border-white/40 w-full bg-black p-[1.5rem] pb-[6rem] min-h-[60vh] rounded-[10px_80px_10px_10px] md:rounded-[20px_200px_20px_20px] md:p-[4rem_5rem_2.5rem_4rem] lg:grid lg:grid-cols-12 lg:gap-[0.75rem] lg:items-center overflow-hidden relative pointer-events-none shadow-2xl shadow-black/80">
                                        <div className="absolute w-full h-full top-0 left-0 z-0 pointer-events-none">
                                            <img
                                                src={BACKGROUND_IMAGE.src}
                                                srcSet={BACKGROUND_IMAGE.srcSet}
                                                sizes="100vw"
                                                alt="Fondo de la tarjeta"
                                                loading="lazy"
                                                decoding="async"
                                                draggable="false"
                                                className="object-cover w-full h-full dead-zone"
                                            />
                                            {!isFront && (
                                                <div
                                                    className="absolute inset-0 bg-black transition-opacity duration-300"
                                                    style={{ opacity: isPast ? 0.66 : 0.33 }}
                                                />
                                            )}
                                        </div>

                                        <div className="flex flex-col items-start justify-center h-full relative z-10 lg:col-span-5 pointer-events-none">
                                            <figure className="m-0 mb-[1rem] md:mb-[2rem] lg:mb-[5rem] h-[60px] md:h-[100px] w-auto max-w-[150px] relative">
                                                <img
                                                    src={item.logo}
                                                    alt="Logo del cliente"
                                                    draggable="false"
                                                    className="h-full w-auto object-contain dead-zone"
                                                />
                                            </figure>

                                            <figure className="w-full block m-0 my-[0.5rem] max-w-[800px] lg:hidden relative z-10 aspect-video overflow-hidden pointer-events-none">
                                                <img
                                                    src={item.mainImage.src}
                                                    srcSet={item.mainImage.srcSet}
                                                    sizes="(max-width: 1023px) 100vw, 1px"
                                                    alt="Visual del proyecto móvil"
                                                    loading="lazy"
                                                    draggable="false"
                                                    className="object-contain w-full h-full absolute top-0 left-0 dead-zone"
                                                />
                                            </figure>

                                            <h3 className="text-[clamp(3.5rem,15vw,5rem)] font-dmsans font-normal leading-none tracking-[-0.02em] m-0 bg-[linear-gradient(90deg,#633cc9,#3b8392,#cb24cc)] bg-[length:200%_200%] bg-clip-text text-transparent inline-block md:text-[clamp(6rem,10vw,10rem)] mt-auto md:mt-auto animate-rainbow dead-zone">
                                                {item.percentage}
                                            </h3>

                                            <span className="text-[1.5rem] text-white font-dmsans font-normal block mb-[1.5rem] leading-[1.2] md:mb-[3rem] lg:text-[2.125rem] lg:mb-[7rem] dead-zone">
                                                {item.description}
                                            </span>

                                            <div
                                                className="mt-auto pointer-events-auto relative z-50 inline-block"
                                                onPointerDownCapture={(e) => e.stopPropagation()}
                                            >
                                                <ArrowButton text="View Project" href={item.link} variant="white" />
                                            </div>
                                        </div>

                                        <figure className="w-full h-[90%] m-0 hidden lg:block lg:col-span-7 relative z-10 pointer-events-none">
                                            <img
                                                src={item.mainImage.src}
                                                srcSet={item.mainImage.srcSet}
                                                sizes="(min-width: 1024px) 60vw, 1px"
                                                alt="Visual del proyecto"
                                                loading="lazy"
                                                decoding="async"
                                                draggable="false"
                                                className="object-contain w-full h-full absolute top-0 left-0 dead-zone"
                                            />
                                        </figure>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {currentIndex < STATISTICS_DATA.length - 1 && (
                            <div className="absolute bottom-[2rem] right-[1.5rem] md:bottom-[2.5rem] md:right-[3.5rem] z-[100] pointer-events-none">
                                <button
                                    onClick={handleNext}
                                    className="w-[45px] h-[45px] border-2 border-white bg-transparent text-white flex items-center justify-center rounded-full cursor-pointer pointer-events-auto group"
                                    aria-label="Siguiente tarjeta"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="currentColor"
                                        viewBox="0 0 256 256"
                                        className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]"
                                    >
                                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section >
    );
}