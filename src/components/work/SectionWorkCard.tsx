"use client"
import { motion } from "motion/react"
import { useState } from "react"

const projects = [
    {
        name: "UPP",
        year: 2025,
        description: "We crafted a cinematic web experience for a Hollywood powerhouse.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/04/header-circle3.mp4"
    },
    {
        name: "Finura",
        year: 2025,
        description: "We crafted a cinematic web experience for a Hollywood powerhouse.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/04/header-circle3.mp4"
    },
    {
        name: "Bipsync",
        year: 2025,
        description: "We crafted a cinematic web experience for a Hollywood powerhouse.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/04/header-circle3.mp4"
    },
    {
        name: "Navarino",
        year: 2025,
        description: "We crafted a cinematic web experience for a Hollywood powerhouse.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/04/header-circle3.mp4"
    },
]

export default function SectionWorkCard() {
    return (
        <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            lg:gap-10
            pt-14
            lg:pt-20
        ">
            {projects.map((project) => (
                <WorkCard key={project.name} {...project} />
            ))}
        </div>
    )
}

function WorkCard({
    name,
    year,
    video,
    description,
    tags
}: {
    name: string,
    year: number,
    video: string,
    description: string,
    tags: string[]
}) {

    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="
                relative
                border
                border-black
                rounded-2xl
                lg:rounded-3xl
                bg-white
                overflow-hidden
                cursor-pointer
            "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* HEADER */}
            <div className="
                flex
                justify-between
                items-center
                py-4
                px-5
                sm:px-6
                lg:px-8
                text-base
                sm:text-lg
                lg:text-xl
            ">
                <h1>{name}</h1>
                <p>{year}</p>
            </div>

            {/* VIDEO */}
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

                {/* OVERLAY */}
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