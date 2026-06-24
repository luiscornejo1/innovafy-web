'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import React, { useRef, useState } from 'react';

interface MagneticProps {
    children: React.ReactElement;
    strength?: number;
}

export const Magnetic = ({ children, strength = 0.3 }: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const element = ref.current;
        if (!element) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = element.getBoundingClientRect();

        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="inline-block"
        >
            <motion.div
                style={{ x, y }}
            >
                {children}
            </motion.div>
        </div>
    );
};