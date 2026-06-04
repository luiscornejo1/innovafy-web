"use client"
import CardBlog from "../../components/blog/CardBlog";
import { useState } from "react";

const posts = [
    {
        id: 1,
        title: "How to choose the right brand design agency in 2026",
        categories: ["Expertise", "Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/06/best-brand-design-agency-2026-768x432.png",
    },
    {
        id: 2,
        title: "AI Search, zero-click SEO and Google's May update",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/06/Zero-click-AI-SEO-May-2026-2-768x432.png",
    },
    {
        id: 3,
        title: "Does llms.txt actually matter? Here's what's hype,whhat's useful, and what to fix first.",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/04/llms-txt-1-768x432.png",
    },
    {
        id: 4,
        title: "Creative inspiration:Digital worlds we'd happily get lost in",
        categories: ["Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/03/immersive-websites-2026-768x432.png",
    },
    {
        id: 5,
        title: "How to find a brand voice that doesn't sound loke everyone else",
        categories: ["Expertise", "Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/03/tov-1-768x432.png",
    },
    {
        id: 6,
        title: "Making room for brand: how to balance performance and creativity in your marketing",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/03/balancing-768x432.png",
    },
    {
        id: 7,
        title: "Strong websites start with sharper brand positioning",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/02/Brssnd-first-web-design-768x432.png",
    },
    {
        id: 8,
        title: "How bad UX can kill even the most beautiful website.",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/02/UX-1-768x432.png",
    },
    {
        id: 9,
        title: "5 finance brands that ditched 'corporate' design and won",
        categories: ["Expertise", "Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/01/finance-branding-1-768x432.png",
    },
    {
        id: 10,
        title: "Questions you should ask before hiring a web agency.",
        categories: ["Expertise"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/01/questions-768x432.png",
    },
    {
        id: 11,
        title: "Most brands don't have a design problem - they have a decision problem.",
        categories: ["Expertise", "Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2026/01/Decisions-768x432.png",
    },
    {
        id: 12,
        title: "The joy of a weird idea well executed",
        categories: ["Expertise", "Inspiration"],
        image: "https://kota-content.b-cdn.net/app/uploads/2025/11/07-UPP-MainCTA-768x432.jpg",
    },
]

const categories = ["All articles", "Culture", "Expertise", "Inspiration", "Our Work"]

export default function CategoriesBlog() {
    const [active, setActive] = useState("All articles")

    const filtered = active === "All articles"
        ? posts
        : posts.filter(p => p.categories.includes(active))

    return (
        <section>
            {/* filtros */}
            <div className="flex gap-5 my-16">
                {categories.map((cat) => (
                    <p
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`py-1 px-3 rounded-3xl text-2xl cursor-pointer border-2 border-black transition-colors duration-300
                            ${active === cat ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                    >
                        {cat}
                    </p>
                ))}
            </div>

            {/* grid */}
            <div className="grid grid-cols-3 gap-8 cursor-pointer">
                {filtered.map((post) => (
                    <CardBlog
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        categories={post.categories}
                        image={post.image}
                    />
                ))}
            </div>
        </section>
    )
}