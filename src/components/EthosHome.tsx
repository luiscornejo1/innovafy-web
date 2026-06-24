"use client";

import React, { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface EthosItemProps {
    id: string;
    number: string;
    title: string;
    description: string;
    image: string;
}

const ethosData: EthosItemProps[] = [
    {
        id: "design",
        number: "01/",
        title: "Diseño con carácter.",
        description: "Creamos experiencias digitales inmersivas y centradas en la marca que sorprenden y dan resultados. De esas que llaman la atención, despiertan emociones y animan a la gente a actuar.",
        image: "https://kota-content.b-cdn.net/app/uploads/2023/11/bento3.jpg",
    },
    {
        id: "process",
        number: "02/",
        title: "Domina el proceso.",
        description: "Somos colaborativos, decididos y claros desde el principio. Sentirás el impulso. Sabrás dónde estás. Tendrás un equipo que sabe cuándo liderar y cuándo escuchar.",
        image: "https://kota-content.b-cdn.net/app/uploads/2023/11/creative-web-design.jpg",
    },
    {
        id: "flex",
        number: "03/",
        title: "Diseñado para adaptarse.",
        description: "Estamos listos para tu crecimiento. De hecho, estamos apostando por ello. Ya sea una nueva campaña, producto o pivot, nos aseguramos de que tu presencia digital esté configurada para adaptarse a ti.",
        image: "https://kota-content.b-cdn.net/app/uploads/2023/11/back-end.jpg",
    },
    {
        id: "convert",
        number: "04/",
        title: "Crea para convertir.",
        description: "Nos preocupamos por los detalles. Desde las visualizaciones de la marca hasta el flujo de experiencia del usuario, cada decisión es intencional—diseñada para impulsar la participación, generar conversiones y construir valor de marca.",
        image: "https://kota-content.b-cdn.net/app/uploads/2025/07/UPP-V2.png",
    },
];

const EthosBlock = ({
    item,
    index,
    hoveredIndex,
    setHoveredIndex,
}: {
    item: EthosItemProps;
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (idx: number | null) => void;
}) => {
    const blockRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const isHovered = hoveredIndex === index;

    const blockOpacity = hoveredIndex === null ? 0.5 : isHovered ? 1 : 0.3;

    const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        setHoveredIndex(index);
        if (!blockRef.current) return;

        const rect = blockRef.current.getBoundingClientRect();
        const startX = e.clientX - rect.left;
        const startY = e.clientY - rect.top;

        x.set(startX);
        y.set(startY);

        if (xSpring.jump) xSpring.jump(startX);
        if (ySpring.jump) ySpring.jump(startY);
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!blockRef.current) return;
        const rect = blockRef.current.getBoundingClientRect();

        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={blockRef}
            className="group relative flex flex-col border-b border-black/30 transition-colors duration-500 hover:border-black last:border-none [@media(min-width:850px)]:border-b-2 max-[849px]:!opacity-100"
            initial={false}
            animate={{ opacity: blockOpacity }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setHoveredIndex(null)}
            onMouseMove={handleMouseMove}
        >
            <div className="relative z-[5] grid py-[1.5rem] [@media(min-width:850px)]:grid-cols-[1fr_30%] [@media(min-width:850px)]:items-center [@media(min-width:850px)]:justify-between [@media(min-width:850px)]:gap-[20%] [@media(min-width:850px)]:py-[3.6rem]">

                <div className="relative z-[10] flex flex-col gap-1 text-black transition-colors duration-500">
                    <span className="text-[1rem] font-dmsans font-normal tracking-[calc(-20em/1000)] [@media(min-width:850px)]:text-[1.875rem]">
                        {item.number}
                    </span>

                    <h3 className="m-0 text-[clamp(2.5rem,7.1vw,7.5rem)] font-normal font-dmsans leading-[1.1] tracking-[calc(-0.02em)]">
                        {item.title}
                    </h3>
                </div>

                <motion.div
                    className="pointer-events-none z-[0] overflow-hidden rounded-[0.95rem] will-change-transform relative w-full my-4 max-[849px]:!opacity-100 max-[849px]:!scale-100 max-[849px]:!transform-none [@media(min-width:850px)]:absolute [@media(min-width:850px)]:left-0 [@media(min-width:850px)]:top-0 [@media(min-width:850px)]:my-0 [@media(min-width:850px)]:w-[30vw] min-[1920px]:min-w-[450px] [@media(min-width:850px)]:aspect-square"
                    style={{
                        x: xSpring,
                        y: ySpring,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="relative z-[10] m-0 w-full text-black font-dmsans transition-colors duration-100 text-[1.125rem] leading-[1.25] min-[500px]:text-[1.75rem] max-[849px]:!opacity-100 max-[849px]:mt-[1rem]"
                >
                    {item.description}
                </motion.p>
            </div>
        </motion.div>
    );
};

export default function EthosHome() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="relative z-[2] overflow-hidden pb-[4.5rem] [@media(min-width:769px)]:pb-[9.375rem]">
            <div className="mx-auto w-full max-w-[calc(1400px+15%)] px-[2%]">
                <h2 className="col-span-12 m-0 text-center text-[clamp(2rem,7.1vw,7.5rem)] font-dmsans font-normal leading-[1] tracking-[calc(-20em/1000)] max-[768px]:mb-[2rem] max-[768px]:text-[2.5rem]">
                    <span className="inline-block w-full">
                        Orientado a la marca.<br />
                        Construido estratégicamente.<br />
                    </span>
                </h2>

                <div className="col-span-12 mt-10 flex flex-col [@media(min-width:769px)]:mt-20">
                    {ethosData.map((item, index) => (
                        <EthosBlock
                            key={item.id}
                            item={item}
                            index={index}
                            hoveredIndex={hoveredIndex}
                            setHoveredIndex={setHoveredIndex}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}