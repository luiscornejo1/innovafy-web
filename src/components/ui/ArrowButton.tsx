'use client';

import React from 'react';
import Link from 'next/link';
import { Magnetic } from './Magnetic';

interface ArrowButtonProps {
    text: string;
    variant?: 'dark' | 'white';
    direction?: 'forwards' | 'backwards';
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

export const ArrowButton = ({
    text,
    variant = 'dark',
    direction = 'forwards',
    href,
    onClick,
    className = '',
}: ArrowButtonProps) => {

    const isWhite = variant === 'white';
    const buttonColorClass = isWhite ? 'text-white' : 'text-black';
    const borderColorClass = isWhite ? 'border-white' : 'border-black';

    const renderInnerContent = () => (
        <>
            <span
                className={`absolute top-0 right-0 h-[38px] w-full rounded-full border pointer-events-none transition-all duration-200 ease-out 
                ${borderColorClass} 
                group-hover:w-[38px] 
                ${direction === 'forwards'
                        ? 'group-hover:-translate-x-[10px]'
                        : 'right-auto left-0 group-hover:translate-x-[10px]'
                    }
                `}
            />

            <span className={`flex items-center justify-start ${direction === 'backwards' ? 'flex-row-reverse' : ''}`}>

                <span
                    className={`inline-block transition-transform duration-300 ease-out 
                    ${direction === 'forwards' ? 'group-hover:-translate-x-[10px]' : 'group-hover:translate-x-[10px]'}`}
                >
                    {text}
                </span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 17.1 15.17"
                    className={`w-[14px] md:w-[14px] opacity-100 transition-transform duration-300 ease-out fill-current
                        ${direction === 'forwards'
                            ? 'ml-4 group-hover:-translate-x-[6px]'
                            : 'ml-0 mr-4 rotate-180 group-hover:translate-x-[6px]'
                        }
                    `}
                >
                    <path d="m17.1,7.58s-.01-.04-.01-.06c.01-.22-.06-.45-.24-.61L9.23.19c-.31-.27-.78-.24-1.06.07-.27.31-.24.78.07,1.06l6.26,5.52H.75c-.41,0-.75.34-.75.75s.34.75.75.75h13.74l-6.26,5.52c-.31.27-.34.75-.07,1.06.15.17.35.25.56.25.18,0,.35-.06.5-.19l7.62-6.72c.18-.16.25-.39.24-.61,0-.02.01-.04.01-.06Z" />
                </svg>
            </span>
        </>
    );

    const sharedClasses = `group inline-flex items-center justify-start bg-transparent max-width-100 cursor-pointer p-0 border-none outline-none relative no-underline whitespace-nowrap font-dmsans text-base md:text-[0.9rem] font-normal leading-none h-[38px] px-4 md:px-[1rem] ${buttonColorClass} ${className}`;

    if (href) {
        return (
            <Magnetic strength={0.3}>
                <Link href={href} className={sharedClasses}>
                    {renderInnerContent()}
                </Link>
            </Magnetic>
        );
    }

    return (
        <Magnetic strength={0.3}>
            <button onClick={onClick} className={sharedClasses}>
                {renderInnerContent()}
            </button>
        </Magnetic>
    );
};