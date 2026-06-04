import Image from "next/image";

export default function HeroBlog() {
    return (
        <section className="text-9xl">
            <h1>
                News, insights, <br />& creative culture <br />from KOTA.
            </h1>

            <div className="w-full h-[850px] overflow-hidden mt-20 rounded-tr-[150px]">
                <img
                    src="https://kota-content.b-cdn.net/app/uploads/2024/02/blog-header.webp"
                    alt="descripción"
                    className="w-full h-full object-cover"
                />
            </div>

        </section>
    )
}