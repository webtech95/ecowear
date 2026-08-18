import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, } from "framer-motion";
import ProductCard from "../features/catalog/product";
import { products, trending, reviews, HomeCarouselImages } from "../features/catalog/productImagesdetails";
import axios from "axios";
import Video from "../assets/images/ecowear.mp4";

// Images
import Banner from "../assets/images/Banner.webp";
import MensImage from "../assets/images/menimage.webp";
import womanImage from "../assets/images/womanimage.webp";
import KidsImage from "../assets/images/kidsimage.webp";

// Lookbooks
import lookbook1 from "../assets/images/lookbook1.webp";
import lookbook2 from "../assets/images/lookbook2.webp";
import lookbook3 from "../assets/images/lookbook3.webp";

const images = [lookbook1, lookbook2, lookbook3];

/* ---- Animated Floating Eco Leaves (SVG) ---- */
const Leaf = ({ className, style }) => (
  <motion.svg
    className={`absolute w-12 h-12 opacity-20 pointer-events-none ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 10, -5, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <path
      d="M12 2C8 6 4 10 4 14C4 17.866 7.134 21 11 21C12.933 21 14.683 20.216 16 19C17.317 17.783 18 16.067 18 14C18 10 14 6 12 2Z"
      fill="#16a34a"
    />
  </motion.svg>
);

/* ---- Scroll Down Indicator ---- */
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    animate={{ y: [0, 8, 0] }}
    transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
  >
    <span className="text-sm text-white/70 font-medium">Scroll</span>
    <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
      <motion.div
        className="w-1.5 h-1.5 bg-white rounded-full mt-1.5"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

const Home = () => {
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // ---------------- RESPONSIVE HANDLER ----------------
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------------- NEWSLETTER SUBSCRIPTION ----------------
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email is required");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/subscribe`, { email });
      alert(res.data.message);
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  // ---------------- PARALLAX FOR HERO (optional) ----------------
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* ========== HERO SECTION ========== */}
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* Floating eco leaves (decorative) */}
        <Leaf className="top-[10%] left-[5%]" />
        <Leaf className="top-[20%] right-[10%]" style={{ animationDelay: "1s" }} />
        <Leaf className="bottom-[15%] left-[15%]" style={{ animationDelay: "2s" }} />
        <Leaf className="top-[60%] right-[5%]" style={{ animationDelay: "0.5s" }} />

        {/* Desktop: Swiper with parallax */}
        {!isMobile ? (
          <motion.div style={{ y: heroParallaxY }} className="absolute inset-0">
            <Swiper
              modules={[Autoplay, Navigation]}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              slidesPerView={1}
              className="w-full h-full"
            >
              {HomeCarouselImages.map((img, index) => (
                <SwiperSlide key={img.id}>
                  <img
                    src={img.image}
                    alt={`Slide ${img.id}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className="w-full h-full">
            <img src={Banner} alt="Banner" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Glassmorphism Overlay Card */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-4 shadow-2xl"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full bg-white/20 text-white backdrop-blur"
            >
              🌿 Sustainable & Ethical
            </motion.span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Elevate Your Style with{" "}
              <span className="text-[#22c55e]">EcoWear</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Discover sustainable fashion designed for comfort, crafted with care,
              and committed to a better planet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/All-Products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#16a34a] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-[#14532d] transition-colors"
                >
                  Shop Now
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/60 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm hover:bg-white hover:text-black transition-all"
                >
                  Our Mission
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <ScrollIndicator />
      </section>

      {/* ========== NEW ARRIVALS ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          New Arrivals
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(15, 19).map((product, i) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== LOOKBOOK ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
        }}
        className="py-14 bg-neutral-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              2025 Lookbook
            </h2>
            <p className="mt-2 text-gray-600 text-base md:text-lg">
              Discover our latest styles, outfits & visual inspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {images.map((img, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-xl bg-white transition-shadow duration-300 hover:shadow-xl"
              >
                <img
                  src={img}
                  alt={`Lookbook outfit ${index + 1}`}
                  loading="lazy"
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/30 flex items-end p-4"
                >
                  <span className="text-white text-lg font-medium">
                    Outfit {index + 1}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ========== FEATURED CATEGORIES ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="max-w-7xl mx-auto px-4 py-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Featured Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { to: "/men", img: MensImage, title: "Men", desc: "Eco-friendly men's fashion" },
            { to: "/women", img: womanImage, title: "Women", desc: "Sustainable styles for women" },
            { to: "/kids", img: KidsImage, title: "Kids", desc: "Soft & safe outfits for kids" },
          ].map((cat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={cat.to}
                className="group relative rounded-2xl overflow-hidden bg-gray-100 block"
              >
                <motion.img
                  src={cat.img}
                  alt={`${cat.title} fashion`}
                  loading="lazy"
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl font-semibold text-white">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-200 mt-1">{cat.desc}</p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ========== NEWSLETTER ========== */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="py-16 bg-[#16a34a] text-white"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay in the Loop 🌿
          </h2>
          <p className="mt-3 text-base md:text-lg text-white/80">
            Get early access to new arrivals, sustainable style tips,
            and exclusive offers.
          </p>

          <form
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            onSubmit={handleSubscribe}
          >
            <motion.input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-80 px-5 py-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#14532d] transition-shadow"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg font-medium bg-[#14532d] text-white transition-colors hover:bg-emerald-600"
            >
              Subscribe
            </motion.button>
          </form>

          <p className="mt-4 text-sm text-white/70">No spam. Unsubscribe anytime.</p>
        </div>
      </motion.section>

      {/* ========== VIDEO SECTION ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={Video}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="relative z-10 flex items-center justify-center h-full px-4"
        >
          <div className="max-w-3xl text-center">
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block mb-4 px-4 py-1 text-sm font-medium rounded-full bg-white/10 text-white backdrop-blur"
            >
              Sustainable Fashion
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              The <span className="text-[#22c55e]">EcoWear</span> Story
            </h2>

            <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">
              Every EcoWear piece is crafted from recycled, sustainable, and
              skin-friendly fabrics — designed for comfort and a healthier planet.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Link to="/All-Products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg font-medium bg-[#16a34a] text-white transition-colors hover:bg-emerald-600"
                >
                  Shop Collection
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg font-medium border border-white/40 text-white transition-all hover:bg-white hover:text-black"
                >
                  Our Mission
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ========== CUSTOMER REVIEWS ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            What Our Customers Say
          </h2>

          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 px-2 snap-x snap-mandatory scroll-smooth">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-neutral-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    {Array.from({ length: review.stars }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    “{review.text}”
                  </p>
                  <p className="mt-4 font-semibold text-gray-900">
                    {review.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ========== TRENDING NOW ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 },
        }}
        className="py-16 bg-neutral-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
            <Link
              to="/All-Products"
              className="text-sm font-medium text-[#16a34a] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-5 pb-2 snap-x snap-mandatory scroll-smooth">
              {trending.map((item) => (
                <Link
                  key={item._id || item.id}
                  to={`/product/${item.id}`}
                  className="snap-start shrink-0"
                >
                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}
                    className="w-[220px] sm:w-[240px] bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-56 object-cover rounded-t-xl"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-700">
                          ₹{item.price}
                        </span>
                        {item.oldprice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.oldprice}
                          </span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
