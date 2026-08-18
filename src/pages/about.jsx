import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import image from "../assets/images/Green and White Conceptual New Look Fashion Blog Banner.webp";

import Banner from "../assets/images/Banner2.webp";
import img1 from "../assets/images/1.webp";
import img2 from "../assets/images/2.webp";
import img3 from "../assets/images/3.webp";
import img4 from "../assets/images/4.webp";
import img5 from "../assets/images/5.webp";
import img6 from "../assets/images/6.webp";
import img7 from "../assets/images/7.webp";
import img8 from "../assets/images/8.webp";
import img9 from "../assets/images/9.webp";
import img10 from "../assets/images/10.webp";

const CrousalImages = [
  { id: 1, image: img1 },
  { id: 2, image: img2 },
  { id: 3, image: img3 },
  { id: 4, image: img4 },
  { id: 5, image: img5 },
  { id: 6, image: img6 },
  { id: 7, image: img7 },
  { id: 8, image: img8 },
  { id: 9, image: img9 },
  { id: 10, image: img10 },
];

const OrganicPage = lazy(() => import("../features/sustainability/OrganicPage"));
const PlasticPackagingPage = lazy(() => import("../features/sustainability/PlasticPackagingPage"));
const FairWagesPage = lazy(() => import("../features/sustainability/FairWagesPage"));
const TimelessDesignPage = lazy(() => import("../features/sustainability/TimelessDesignPage"));

const About = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax for hero carousel
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <div className="bg-white text-gray-800 font-poppins">
      {/* ========== HERO CAROUSEL ========== */}
      <section ref={heroRef} className="w-full relative z-0 m-0 p-0 overflow-hidden">
        {isMobile ? (
          <div className="w-full h-auto">
            <img src={Banner} alt="Banner" className="w-full h-auto object-cover" />
          </div>
        ) : (
          <motion.div style={{ y: heroParallax }} className="w-full h-screen">
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              className="w-full h-full"
            >
              {CrousalImages.map((img, index) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.image}
                    alt={`Slide ${img.id}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover block"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        )}

        {/* Gradient overlay + text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-end justify-center pb-16 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center text-white max-w-3xl px-4"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Elevate Your Style with <span className="text-[#22c55e]">EcoWear</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-6">
              Sustainable fashion for modern living.
            </p>
            <Link to="/All-Products" className="pointer-events-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#16a34a] hover:bg-[#14532d] text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors shadow-lg"
              >
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== HERO / TAGLINE (duplicate content removed, merged with carousel) ========== */}
      {/* Already shown above */}

      {/* ========== ABOUT ECOWEAR ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        className="max-w-6xl mx-auto px-4 py-14 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About EcoWear</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          At EcoWear, we believe fashion should feel good — not just on your skin, but in your soul.
          We create sustainable, ethically produced clothing that blends comfort, style, and
          environmental responsibility.
        </p>
      </motion.section>

      {/* ========== SUSTAINABILITY IN EVERY THREAD ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="bg-gray-100 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <motion.img
            variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
            src={image}
            alt="EcoWear values"
            className="w-full rounded-xl shadow-md"
            whileHover={{ scale: 1.02 }}
          />
          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } }}
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Sustainability in Every Thread
            </h3>
            <p className="text-gray-700 mb-4">
              Our mission is to reduce fashion waste by creating long-lasting, biodegradable
              clothing from organic materials. We source fabrics responsibly and collaborate
              only with certified ethical partners.
            </p>
            <p className="text-gray-700">
              EcoWear is more than a brand — it's a movement for a cleaner, kinder, and more
              beautiful fashion future.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ========== WHY CHOOSE ECOWEAR ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose <span className="text-[#16a34a]">EcoWear</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: "100% Organic", desc: "All our fabrics are GOTS certified organic.", modal: "organic" },
            { title: "Plastic-Free Packaging", desc: "We use compostable & recyclable packaging.", modal: "packaging" },
            { title: "Fair Wages", desc: "Fair pay and safe conditions for every worker.", modal: "wages" },
            { title: "Timeless Design", desc: "Durable, trend-proof, comfortable fashion.", modal: "design" },
          ].map(({ title, desc, modal }) => (
            <motion.div
              key={modal}
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModal(modal)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-transparent hover:border-[#16a34a]/30"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setActiveModal(modal)}
            >
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 space-y-6 text-base md:text-lg text-gray-700 text-justify"
        >
          <p>
            <strong>EcoWear</strong> crafts garments with deep commitment to sustainability,
            ethics, and timeless design. Our organic fabrics like GOTS cotton, bamboo, and hemp
            protect ecosystems and reduce waste.
          </p>
          <p>
            <strong>Plastic-free packaging</strong> and <strong>fair labor</strong> aren't trends —
            they're non-negotiables. Every item reflects our belief in clean fashion.
          </p>
          <p>
            With minimalist design and maximum quality, our clothes are made to last — for you and
            for the planet.
          </p>
        </motion.div>
      </motion.section>

      {/* ========== MODAL WITH ANIMATION ========== */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center overflow-auto pt-20"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full mx-4 p-6 rounded-xl relative shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold transition-colors focus:outline-none"
                aria-label="Close modal"
              >
                &times;
              </button>
              <Suspense fallback={null}>
                {activeModal === "organic" && <OrganicPage />}
                {activeModal === "packaging" && <PlasticPackagingPage />}
                {activeModal === "wages" && <FairWagesPage />}
                {activeModal === "design" && <TimelessDesignPage />}
              </Suspense>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
