'use client';

import React from 'react';

interface SectionHeadingProps {
    line1: string;
    line2: string;
    showIcon?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
    line1,
    line2,
    showIcon = false,
}) => {
    return (
        <h2 className={`relative col-span-12 m-0 flex flex-col font-dmsans text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,10.6vw,10rem)] transition-transform duration-500 ${!showIcon ? '-translate-x-[4vw] md:-translate-x-[8vw]' : ''}`}>
            <div className="relative block w-full shrink-0 overflow-visible">
                <span className="w-full">
                    <div className="w-full">
                        <span
                            className="col-span-12 m-0 flex flex-col text-[12vw] font-normal uppercase leading-[0.9] tracking-[-0.02em] min-[500px]:text-[clamp(3rem,9.6vw,9rem)]"
                            aria-label={line1}
                        >
                            <div className="relative block text-start" aria-hidden="true">
                                <div className="relative inline-block overflow-hidden">
                                    {line1.split('').map((char, index) => (
                                        <div
                                            key={index}
                                            className="relative inline-block translate-y-0 transform opacity-100"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </span>

                        <span
                            className="col-span-12 mb-0 flex w-full flex-col pl-[13.5%] text-[12vw] font-dmsans font-normal uppercase leading-[0.9] tracking-[-0.02em] md:mb-[10vh] min-[500px]:text-[clamp(3rem,9.6vw,9rem)]"
                            aria-label={line2}
                        >
                            <div className="relative block text-start" aria-hidden="true">
                                <div className="relative inline-block overflow-hidden">
                                    {line2.split('').map((char, index) => (
                                        <div
                                            key={index}
                                            className="relative inline-block translate-y-0 transform opacity-100"
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </span>

                    </div>
                </span>
            </div>

            {showIcon && (
                <div className="absolute bottom-0 right-0 flex h-full items-end justify-end">
                    <div className="relative flex h-[1.1ch] origin-center transition-transform md:bottom-[0vh] min-[850px]:rotate-[6.0207deg]">
                        <svg
                            className="h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 111.42 110.66"
                        >
                            <polygon
                                points="13.65 102.66 109.53 6.67 103.87 1.02 8 97 8 0 0 0 0 110.66 111.42 110.66 111.42 102.66 13.65 102.66"
                                fill="currentColor"
                            ></polygon>
                        </svg>
                    </div>
                </div>
            )}
        </h2>
    );
};