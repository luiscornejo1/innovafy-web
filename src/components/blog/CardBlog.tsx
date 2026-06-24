import Link from "next/link"

type CardBlogProps = {
    id: number
    title: string
    categories: string[]
    image: string
}

export default function CardBlog({ id, title, categories, image }: CardBlogProps) {
    return (
        <Link href={`/blog/${id}`}>
            <div className="pb-5">
                <div className="relative w-full h-60 overflow-hidden rounded-2xl">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        {categories.map((cat) => (
                            <span key={cat} className="bg-black text-white text-sm px-3 py-1 rounded-full">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
                <h3 className="mt-3 text-xl font-medium">{title}</h3>
            </div>
        </Link>
    )
}