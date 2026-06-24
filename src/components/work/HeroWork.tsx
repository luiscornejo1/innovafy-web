"use client"
import { motion } from "motion/react"

export default function HeroWork() {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full"
        >
            {/* TOP */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
                
                {/* TEXT */}
                <div className="flex-1">
                    <h1 className="
                        text-4xl
                        sm:text-5xl
                        md:text-6xl
                        lg:text-7xl
                        xl:text-8xl
                        font-medium
                        leading-tight
                        lg:leading-none
                    ">
                        We are experts in bringing brands to life digitally.
                    </h1>
                </div>

                {/* CIRCLE */}
                <div className="
                    w-48 h-48
                    sm:w-64 sm:h-64
                    md:w-72 md:h-72
                    lg:w-96 lg:h-96
                    rounded-full
                    overflow-hidden
                    bg-gray-300
                    flex-shrink-0
                    mx-auto lg:mx-0
                ">
                </div>
            </div>

            {/* BOTTOM */}
            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-10
                pt-10
                lg:pt-2
            ">
                
                {/* WORK */}
                <div className="flex items-end">
                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        md:text-5xl
                        font-semibold
                        border-l
                        border-black
                        pl-5
                        sm:pl-8
                    ">
                        WORK
                    </h1>
                </div>

                {/* PARAGRAPH */}
                <div className="
                    w-full
                    lg:w-[80%]
                    pb-0
                    lg:pb-14
                ">
                    <p className="
                        text-lg
                        sm:text-xl
                        lg:text-2xl
                        leading-relaxed
                    ">
                        KOTA is a progressive and insightful
                        design agency, technically and creatively skilled to translate
                        your brand into its best digital self.
                    </p>
                </div>
            </div>
        </motion.section>
    )
}