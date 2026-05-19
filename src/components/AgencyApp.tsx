"use client";

import "lazysizes";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import gsap from "gsap";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Menu,
  Minus,
  Plus,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ThreeBackground from "./ThreeBackground";

export default function AgencyApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const gsapScope = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!menuOpen) {
      setServicesOpen(false);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!gsapScope.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".gsap-fade", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, gsapScope);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Web Design",
      icon: "01",
      description: "Creative web design that converts visitors into customers",
      subServices: [
        "Creative Web Design",
        "E-commerce Design",
        "UX/UI Design",
        "Responsive Design",
      ],
    },
    {
      title: "Branding",
      icon: "02",
      description: "Strategic brand identity that resonates with your audience",
      subServices: [
        "Brand Strategy",
        "Logo Design",
        "Brand Guidelines",
        "Rebranding",
      ],
    },
    {
      title: "Digital Marketing",
      icon: "03",
      description: "Data-driven marketing that delivers measurable results",
      subServices: ["SEO Strategy", "Content Marketing", "Social Media", "PPC Campaigns"],
    },
  ];

  const projects = [
    {
      title: "E-commerce Revolution",
      client: "RetailCo",
      sector: "Retail",
      metric: "83% increase in sales",
    },
    {
      title: "Brand Transformation",
      client: "TechStart",
      sector: "B2B Tech",
      metric: "67% rise in engagement",
    },
    {
      title: "Digital Experience",
      client: "FinanceApp",
      sector: "Finance",
      metric: "2.5x conversion rate",
    },
    {
      title: "Creative Platform",
      client: "AgencyPro",
      sector: "Agencies",
      metric: "92% user satisfaction",
    },
  ];

  const testimonials = [
    {
      quote:
        "INNOVAFY transformed our digital presence completely. The results speak for themselves.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      result: "67.6% rise in engaged sessions",
    },
    {
      quote:
        "Working with INNOVAFY was seamless. They understood our vision and exceeded expectations.",
      author: "Michael Chen",
      role: "Marketing Director, RetailCo",
      result: "83.14% increase in sales",
    },
    {
      quote:
        "The strategic approach INNOVAFY brought to our branding was exactly what we needed.",
      author: "Emma Wilson",
      role: "Founder, FinanceApp",
      result: "2.5x conversion improvement",
    },
  ];

  const faqs = [
    {
      question: "What is your design process?",
      answer:
        "Our design process is collaborative and iterative. We start with discovery and strategy, move into creative concepts, then refine based on your feedback until we achieve the perfect result.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Project timelines vary based on scope. A typical website project takes 8-12 weeks, while branding projects range from 6-10 weeks. We'll provide a detailed timeline during our initial consultation.",
    },
    {
      question: "Do you offer post-launch support?",
      answer:
        "Yes! We offer SiteCare, our comprehensive post-launch support service. This includes updates, maintenance, security monitoring, and ongoing optimization to ensure your digital presence continues to perform.",
    },
    {
      question: "What industries do you work with?",
      answer:
        "We work across various sectors including B2B tech, retail, e-commerce, agencies, finance, and more. Our strategic approach adapts to your specific industry needs and audience.",
    },
  ];

  const philosophy = [
    { number: "01", title: "Strategy First", description: "Every project begins with deep strategic thinking" },
    { number: "02", title: "Design with Guts", description: "Bold creative that stands out and performs" },
    { number: "03", title: "Built to Convert", description: "User experience optimized for results" },
    { number: "04", title: "Measured Success", description: "Data-driven approach to continuous improvement" },
  ];

  const clientLogos = [
    { name: "Nova Labs", src: "https://dummyimage.com/220x90/0f172a/ffffff&text=Nova+Labs" },
    { name: "Orbit", src: "https://dummyimage.com/220x90/111827/ffffff&text=Orbit" },
    { name: "Vertex", src: "https://dummyimage.com/220x90/1f2937/ffffff&text=Vertex" },
    { name: "Lumen", src: "https://dummyimage.com/220x90/111827/ffffff&text=Lumen" },
    { name: "Pulse", src: "https://dummyimage.com/220x90/0f172a/ffffff&text=Pulse" },
    { name: "Apex", src: "https://dummyimage.com/220x90/1f2937/ffffff&text=Apex" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              INNOVAFY
            </Link>

            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.03 }} className="hidden sm:inline-flex">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium"
                >
                  Hire us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.button
                onClick={() => setMenuOpen((prev) => !prev)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-full border border-neutral-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-6 right-6 z-50 w-[280px] sm:w-[320px] bg-white text-neutral-900 rounded-3xl shadow-2xl p-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-4 text-lg font-semibold">
                <Link href="/work" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition-colors">
                  Work
                </Link>
                <Link href="/agency" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition-colors">
                  Agency
                </Link>
                <button
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between hover:text-blue-600 transition-colors"
                >
                  Services
                  <motion.span animate={{ rotate: servicesOpen ? 45 : 0 }} className="text-2xl leading-none">
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-4 text-base font-medium text-neutral-600 space-y-2 overflow-hidden"
                    >
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          href="/services"
                          onClick={() => setMenuOpen(false)}
                          className="block hover:text-blue-600 transition-colors"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link href="/blog" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/culture" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition-colors">
                  Culture
                </Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-blue-600 transition-colors">
                  Contact
                </Link>
              </nav>

              <motion.div whileHover={{ scale: 1.03 }}>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-between w-full px-5 py-3 rounded-full border border-neutral-300 text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Start your project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section className="relative min-h-[100vh] flex items-center justify-center px-6 lg:px-12 pt-32 pb-20 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-[15%] w-[400px] h-[400px] bg-gradient-to-br from-blue-400 via-cyan-400 to-purple-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 rounded-full blur-3xl opacity-20"
        />

        <div className="absolute inset-0 pointer-events-none">
          <ThreeBackground className="absolute inset-0 w-full h-full opacity-80" />
        </div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Award className="w-8 h-8 text-blue-600" />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <Star className="w-8 h-8 text-yellow-500" />
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </motion.div>
            </div>
            <p className="text-sm uppercase tracking-widest text-neutral-500 mb-2">Award-Winning Agency</p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight mb-8 leading-[0.9]"
          >
            <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block">
              rebel
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              against
            </motion.span>
            <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="block">
              boring
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-12"
          >
            We're a creative agency specializing in web design, branding, and digital marketing.
            <span className="block mt-2 font-medium">Refuse to blend in.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start your project
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-neutral-300 text-neutral-700 rounded-full font-medium hover:border-neutral-400 transition-colors"
            >
              View our work
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16 px-6 lg:px-12 bg-white">
        <div ref={gsapScope} className="max-w-[1200px] mx-auto">
          <p className="gsap-fade text-sm uppercase tracking-widest text-neutral-500 mb-8 text-center">
            Trusted by forward-thinking teams
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {clientLogos.map((logo) => (
              <div key={logo.name} className="gsap-fade flex items-center justify-center rounded-2xl bg-neutral-50 p-4">
                <img
                  className="lazyload max-h-10 w-auto opacity-80 hover:opacity-100 transition"
                  data-src={logo.src}
                  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                  width={220}
                  height={90}
                  alt={logo.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative py-24 px-6 lg:px-12 bg-white overflow-hidden">
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full blur-3xl opacity-20"
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              What we do
            </motion.h2>
          </motion.div>

          <div className="space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-50 p-8 md:p-12 rounded-3xl cursor-pointer relative overflow-hidden"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl"
                  />

                  <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <motion.div
                        initial={{ opacity: 0.3 }}
                        whileHover={{ opacity: 1 }}
                        className="text-8xl md:text-9xl font-bold text-neutral-200 mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
                      >
                        {service.icon}
                      </motion.div>

                      <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>

                      <p className="text-lg text-neutral-600 mb-6">{service.description}</p>

                      <motion.button
                        whileHover={{ x: 10 }}
                        className="inline-flex items-center gap-2 text-base font-medium text-blue-600 hover:gap-4 transition-all"
                      >
                        Find out more
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <div className="relative">
                      <div className="grid grid-cols-2 gap-4">
                        {service.subServices.map((sub, idx) => (
                          <motion.div
                            key={sub}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5, rotate: idx % 2 === 0 ? 2 : -2 }}
                            className="bg-white p-4 rounded-xl shadow-lg aspect-square flex items-center justify-center text-center"
                          >
                            <p className="text-sm font-medium text-neutral-700">{sub}</p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br ${
                          i === 0
                            ? "from-green-400 to-cyan-400"
                            : i === 1
                              ? "from-pink-400 to-red-400"
                              : "from-purple-400 to-blue-400"
                        } rounded-full blur-3xl opacity-20`}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6 lg:px-12 bg-neutral-50 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] border-4 border-blue-100 rounded-full -translate-y-1/2 translate-x-1/2"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] border-4 border-purple-100 rounded-full translate-y-1/2 -translate-x-1/2"
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="block">Brand-led.</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Strategically built.
              </span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {philosophy.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15 + 0.2,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className="relative inline-block mb-6"
                >
                  <div className="text-7xl md:text-8xl font-bold text-transparent bg-gradient-to-br from-blue-500 to-purple-600 bg-clip-text group-hover:from-purple-500 group-hover:to-pink-600 transition-all duration-500">
                    {item.number}
                  </div>

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 -z-10"
                  >
                    <div
                      className={`w-full h-full rounded-full bg-gradient-to-br ${
                        i === 0
                          ? "from-blue-100 to-cyan-100"
                          : i === 1
                            ? "from-purple-100 to-pink-100"
                            : i === 2
                              ? "from-green-100 to-emerald-100"
                              : "from-orange-100 to-red-100"
                      } opacity-0 group-hover:opacity-50 transition-opacity blur-xl`}
                    />
                  </motion.div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3 }}
                  className="text-xl md:text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.4 }}
                  className="text-neutral-600 leading-relaxed"
                >
                  {item.description}
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-6 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="relative py-24 px-6 lg:px-12 bg-neutral-900 text-white overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-full blur-3xl"
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
            >
              Our Work
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-neutral-400 text-xl"
            >
              Results-driven projects across industries
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="group cursor-pointer"
              >
                <motion.div whileHover={{ scale: 1.03, y: -10 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <div className="aspect-[16/10] bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 overflow-hidden relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full flex items-center justify-center relative"
                    >
                      <motion.div
                        animate={{
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(45deg,
                            ${
                              i === 0
                                ? "#3b82f6, #8b5cf6, #ec4899"
                                : i === 1
                                  ? "#10b981, #06b6d4, #6366f1"
                                  : i === 2
                                    ? "#f59e0b, #ef4444, #8b5cf6"
                                    : "#ec4899, #f97316, #eab308"
                            })`,
                          backgroundSize: "200% 200%",
                          opacity: 0.8,
                        }}
                      />

                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        className="text-8xl font-bold text-white/20 relative z-10"
                      >
                        {i + 1}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-black/20 flex items-center justify-center"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <ArrowRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 + 0.3 }}
                    className="space-y-2"
                  >
                    <p className="text-xs uppercase tracking-widest text-neutral-500">{project.sector}</p>
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-lg">{project.client}</p>
                    <motion.div whileHover={{ x: 5 }} className="inline-flex items-center gap-2 text-green-400 font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {project.metric}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-100 transition-colors"
            >
              View all projects
              <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 lg:px-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.author}>
                <div className="text-center">
                  <div className="mb-8">
                    <Star className="w-12 h-12 mx-auto mb-6 text-yellow-300" fill="currentColor" />
                  </div>

                  <p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="mb-6">
                    <p className="font-bold text-xl">{testimonial.author}</p>
                    <p className="text-blue-100 text-lg">{testimonial.role}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5" />
                    <p className="font-medium">{testimonial.result}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="relative py-24 px-6 lg:px-12 bg-white overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-neutral-600 text-lg"
            >
              Everything you need to know
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="border-2 border-neutral-200 rounded-2xl overflow-hidden bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <motion.button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-6 flex justify-between items-center hover:bg-neutral-50 transition-colors"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-bold text-left text-lg">{faq.question}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {activeFaq === i ? (
                      <Minus className="w-6 h-6 flex-shrink-0 text-blue-600" />
                    ) : (
                      <Plus className="w-6 h-6 flex-shrink-0 text-blue-600" />
                    )}
                  </motion.div>
                </motion.button>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeFaq === i ? "auto" : 0,
                    opacity: activeFaq === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: activeFaq === i ? 0 : -20 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-20 px-6 lg:px-12 bg-neutral-900 text-white overflow-hidden">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, #3b82f6 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's create something
              <br />
              extraordinary together
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start your project
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.h3 whileHover={{ scale: 1.05 }} className="text-3xl font-bold mb-6">
                INNOVAFY
              </motion.h3>
              <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Award-winning creative agency specializing in web design, branding, and digital marketing.
              </p>
              <motion.a
                href="mailto:hello@innovafy.com"
                whileHover={{ x: 5 }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-2"
              >
                hello@innovafy.com
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm uppercase tracking-widest mb-6 text-neutral-500 font-bold">Services</h4>
              <ul className="space-y-3 text-sm">
                {["Web Design", "Branding", "Digital Marketing", "E-commerce"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      className="text-neutral-300 hover:text-white transition-colors inline-block"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm uppercase tracking-widest mb-6 text-neutral-500 font-bold">Sectors</h4>
              <ul className="space-y-3 text-sm">
                {["B2B Tech", "Retail", "Finance", "Agencies"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      className="text-neutral-300 hover:text-white transition-colors inline-block"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-sm uppercase tracking-widest mb-6 text-neutral-500 font-bold">Connect</h4>
              <ul className="space-y-3 text-sm">
                {["Instagram", "LinkedIn", "Twitter", "Facebook"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      className="text-neutral-300 hover:text-white transition-colors inline-block"
                    >
                      {item}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500"
          >
            <motion.p whileHover={{ scale: 1.02 }}>© 2026 INNOVAFY Creative Agency. All rights reserved.</motion.p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  whileHover={{ y: -2, color: "#ffffff" }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
