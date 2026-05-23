import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10 px-6 lg:px-12 pt-16 pb-8">
      {/* Top Row: Logo + Email */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center w-14 h-14 border-[3px] border-white font-black text-xs leading-none uppercase tracking-widest text-center text-white">
          <span>INNO<br/>VAFY</span>
        </div>

        <a
          href="mailto:hello@innovafy.com"
          className="text-4xl md:text-6xl font-bold text-white hover:text-purple-400 transition-colors"
        >
          hello@innovafy.com
        </a>
      </div>

      {/* Middle Row: Social + Badges */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div className="flex gap-6 text-sm text-white/70">
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            LinkedIn <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Facebook <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Instagram <span className="text-[10px]">↗</span>
          </a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            Bluesky <span className="text-[10px]">↗</span>
          </a>
        </div>

        <div className="flex items-center gap-6 text-white/50 text-xs font-bold tracking-widest">
          <span>CLUTCH</span>
          <span>AWWWARDS</span>
        </div>
      </div>

      {/* Links Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
        <div className="flex gap-6 text-sm text-white/70">
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link>
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>

        <button className="border border-white/30 text-white text-sm px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
          Sign up to our newsletter
        </button>
      </div>

      {/* Bottom Row: Sectors + Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-8 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-white/50 text-xs mr-2">Our sectors :</span>
          {["Agencies", "SaaS and Tech", "B2B Transformation", "Healthcare", "Media & Entertainment", "Retail"].map(
            (sector) => (
              <span
                key={sector}
                className="text-white/60 text-xs border border-white/20 px-3 py-1 rounded-full hover:border-white/50 transition-colors cursor-pointer"
              >
                {sector}
              </span>
            )
          )}
        </div>

        <p className="text-white/40 text-xs">© Innovafy 2026</p>
      </div>
    </footer>
  );
}
