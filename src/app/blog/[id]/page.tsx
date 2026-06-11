import CardBlog from "../../../components/blog/CardBlog";
import WorkCard from "../../../components/blog/WorkCard";

import Link from "next/link";


type Props = {
    params: Promise<{ id: string }>
}

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
]

const projects = [
    {
        name: "UPP",
        year: 2025,
        description: "We crafted a cinematic web experience for a Hollywood powerhouse.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/04/header-circle3.mp4"
    },
    {
        name: "The Goat Agency",
        year: 2025,
        description: "Influence everywhere: a future-ready website for The Goat Agency.",
        tags: ["Web design & development", "Agencies"],
        video: "https://kota-content.b-cdn.net/app/uploads/2025/08/GOAT-Hero.mp4"
    },
]

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;

    return (
        <main className="px-6 md:px-12 lg:px-20 xl:px-28 pt-24">
            <h1>Post {id}</h1>

            <section className="bg-black relative left-1/2 right-1/2 -mx-[50vw] w-screen  z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-24 lg:pt-32">
                <div className="display flex justify-between">
                    <h1 className="text-white text-7xl">Related articles</h1>
                    <Link href="/blog">
                        <button className="text-white text-xl border-white border-2 rounded-3xl px-3 py-1">View all articles</button>
                    </Link>
                </div>

                <div className="pt-10 text-white">
                    {/* grid */}
                    <div className="grid grid-cols-3 gap-8 cursor-pointer">
                        {posts.map((post) => (
                            <CardBlog
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                categories={post.categories}
                                image={post.image}

                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Related Projects */}
            <section className="bg-black relative left-1/2 right-1/2 -mx-[50vw] w-screen  z-10 px-6 md:px-12 lg:px-20 xl:px-28 pt-24 lg:pt-32">
                <div className="display flex justify-between">
                    <h1 className="text-white text-7xl">Related Projects</h1>
                    <Link href="/work">
                        <button className="text-white text-xl border-white border-2 rounded-3xl px-3 py-1">View all projects</button>
                    </Link>
                </div>

                <div className="pt-10 ">
                    {/* grid */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-white"
                    >
                        {projects.map((project) => (
                            <WorkCard
                                key={project.name}
                                {...project}
                            />
                        ))}
                    </div>
                </div>
            </section>


        </main>
    );
}