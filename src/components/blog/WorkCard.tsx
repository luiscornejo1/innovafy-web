"use client"

import { motion } from "motion/react"
import { useState } from "react"

type WorkCardProps = {
    name: string
    year: number
    video: string
    description: string
    tags: string[]
}

export default function WorkCard({
    name,
    year,
    video,
    description,
    tags
}: WorkCardProps) {

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative border border-black rounded-2xl lg:rounded-3xl bg-white overflow-hidden cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex justify-between bg-black items-center py-4 px-5 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl">

                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 14.78 14.78"
                        className="w-4 h-4"
                    >
                        <defs>
                            <linearGradient
                                id="d"
                                x1="3.54"
                                x2="13.98"
                                y1="3.54"
                                y2="13.99"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset="0" stopColor="#7c41f3" />
                                <stop offset="1" stopColor="#ff6eff" />
                            </linearGradient>
                        </defs>

                        <path
                            fill="url(#d)"
                            d="M13.25 12.18L13.25 0.23 14.78 0.23 14.78 14.76 14.74 14.76 14.74 14.78 0.21 14.78 0.21 13.25 12.18 13.25 0 1.08 1.08 0 13.25 12.18z"
                        />
                    </svg>
                    <h1>{name}</h1>
                </div>
                <p>{year}</p>
            </div>

            <div className="relative">
                <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="
                        w-full
                        h-64
                        sm:h-80
                        lg:h-96
                        object-cover
                    "
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: hovered ? 1 : 0
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeOut"
                    }}
                    className="
                        absolute
                        inset-0
                        bg-black/80
                        flex
                        flex-col
                        justify-end
                        p-5
                        sm:p-6
                        lg:p-8
                    "
                >
                    <p className="
                        text-white
                        text-lg
                        sm:text-xl
                        lg:text-2xl
                        font-semibold
                        mb-4
                    ">
                        {description}
                    </p>

                    <div className="flex gap-3 flex-wrap">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="
                                    border
                                    border-white
                                    text-white
                                    text-xs
                                    sm:text-sm
                                    px-3
                                    sm:px-4
                                    py-2
                                    rounded-full
                                "
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}