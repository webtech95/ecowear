import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "./pages/product";
import { products, trending, reviews, HomeCarouselImages } from "./productImagesdetails";
import axios from "axios";


// Images
import Banner from "./images/Banner.webp";
import MensImage from "./images/menimage.webp";
import womanImage from "./images/womanimage.webp";
import KidsImage from "./images/kidsimage.webp";

// Lookbooks 
import lookbook1 from "./images/lookbook1.webp";
import lookbook2 from "./images/lookbook2.webp";
import lookbook3 from "./images/lookbook3.webp";

const images = [
  lookbook1,
  lookbook2,
  lookbook3,
];

const Home = () => {

  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const shuffleArray = (array) => {
    return [...array].sort(() => 0.5 - Math.random());
  };

  useEffect(() => {
    const STORAGE_KEY = "new_arrivals_products";
    const TIME_KEY = "new_arrivals_time";

    const HOURS = 10;
    const EXPIRE_TIME = HOURS * 60 * 60 * 1000;

    const savedProducts = localStorage.getItem(STORAGE_KEY);
    const savedTime = localStorage.getItem(TIME_KEY);

    const now = Date.now();

    if (
      savedProducts &&
      savedTime &&
      now - Number(savedTime) < EXPIRE_TIME
    ) {
      setFeaturedProducts(JSON.parse(savedProducts));
    } else {
      const randomFour = shuffleArray(products).slice(0, 4);
      setFeaturedProducts(randomFour);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(randomFour));
      localStorage.setItem(TIME_KEY, now.toString());
    }
  }, []);




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




  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <section className="w-full relative z-0 m-0 p-0 overflow-hidden">
        {isMobile ? (
          <div className="w-full h-auto">
            <img
              src={Banner}
              alt="Banner"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            slidesPerView={1}
            className="w-full h-full"
          >
            {HomeCarouselImages.map((img) => (
              <SwiperSlide key={img.id}>
                <img
                  src={img.image}
                  alt={`Slide ${img.id}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      <section className="relative -mt-10 z-10">
        <div className="max-w-6xl mx-auto px-4 py-16 bg-white/60 backdrop-blur-md rounded-xl shadow text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Elevate Your Style with <span className="text-green-600">EcoWear</span>
          </h1>
          <p className="text-gray-700 text-base sm:text-lg mb-6">
            Discover sustainable fashion designed for comfort, crafted with care, and committed to a better planet.
          </p>
          <Link to="/All-Products">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition shadow-md">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

     <section className="max-w-7xl mx-auto px-4 py-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    New Arrivals
  </h2>

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      gap-6
    "
  >
    {products.slice(15, 19).map((product) => (
      <div key={product.id} className="w-full">
        <ProductCard product={product} />
      </div>
    ))}
  </div>
</section>




      <section className="py-14 bg-neutral-50">
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
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-white transition-shadow duration-150 hover:shadow-md"
              >
                <img
                  src={img}
                  alt={`Lookbook outfit ${index + 1}`}
                  loading="lazy"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-150 flex items-end p-4">
                  <span className="text-white text-lg font-medium">
                    Outfit {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Featured Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/men" className="group relative rounded-2xl overflow-hidden bg-gray-100">
            <img src={MensImage} alt="Men fashion" loading="lazy" className="h-80 w-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-5 transition-opacity duration-150 group-hover:bg-black/40">
              <div>
                <h3 className="text-2xl font-semibold text-white">Men</h3>
                <p className="text-sm text-gray-200 mt-1">
                  Eco-friendly men's fashion
                </p>
              </div>
            </div>
          </Link>

          <Link to="/women" className="group relative rounded-2xl overflow-hidden bg-gray-100">
            <img src={womanImage} alt="Women fashion" loading="lazy" className="h-80 w-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-5 transition-opacity duration-150 group-hover:bg-black/40">
              <div>
                <h3 className="text-2xl font-semibold text-white">Women</h3>
                <p className="text-sm text-gray-200 mt-1">
                  Sustainable styles for women
                </p>
              </div>
            </div>
          </Link>

          <Link to="/kids" className="group relative rounded-2xl overflow-hidden bg-gray-100">
            <img src={KidsImage} alt="Kids fashion" loading="lazy" className="h-80 w-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex items-end p-5 transition-opacity duration-150 group-hover:bg-black/40">
              <div>
                <h3 className="text-2xl font-semibold text-white">Kids</h3>
                <p className="text-sm text-gray-200 mt-1">
                  Soft & safe outfits for kids
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>


      {/* Newsletter CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold">
            Stay in the Loop 🌿
          </h2>

          <p className="mt-3 text-base md:text-lg text-white/80">
            Get early access to new arrivals, sustainable style tips,
            and exclusive offers.
          </p>

          {/* Input + Button */}
          <form
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-80 px-5 py-3 rounded-lg
          text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-secondary"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium
          bg-secondary text-white
          transition-colors duration-150
          hover:bg-emerald-600"
            >
              Subscribe
            </button>
          </form>

          {/* Privacy Note */}
          <p className="mt-4 text-sm text-white/70">
            No spam. Unsubscribe anytime.
          </p>

        </div>
      </section>


      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">

        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src="/videos/ecowear-bg.mp4"
        />

        {/* Gradient Overlay (better than pure black) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="max-w-3xl text-center">

            <span className="inline-block mb-4 px-4 py-1 text-sm font-medium rounded-full
                       bg-white/10 text-white backdrop-blur">
              Sustainable Fashion
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              The <span className="text-secondary">EcoWear</span> Story
            </h2>

            <p className="mt-4 text-base md:text-lg text-gray-200 leading-relaxed">
              Every EcoWear piece is crafted from recycled, sustainable, and
              skin-friendly fabrics — designed for comfort and a healthier planet.
            </p>

            {/* CTA */}
            <div className="mt-8 flex justify-center gap-4">
              <a
                href="/All-Products"
                className="px-6 py-3 rounded-lg font-medium
                     bg-secondary text-white
                     transition-colors duration-150
                     hover:bg-emerald-600"
              >
                Shop Collection
              </a>

              <a
                href="/about"
                className="px-6 py-3 rounded-lg font-medium
                     border border-white/40 text-white
                     transition-colors duration-150
                     hover:bg-white hover:text-black"
              >
                Our Mission
              </a>
            </div>

          </div>
        </div>
      </section>


      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl md:text-4xl font-bold text-center">
            What Our Customers Say
          </h2>

          {/* Scroll Container */}
          <div className="mt-10 overflow-x-auto scrollbar-hide">
            <div
              className="flex gap-6 px-2
                   snap-x snap-mandatory
                   scroll-smooth"
            >
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px]
                       bg-neutral-50 rounded-xl p-6
                       border border-gray-200"
                >
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-400 mb-3">
                    {Array.from({ length: review.stars }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    “{review.text}”
                  </p>

                  {/* Name */}
                  <p className="mt-4 font-semibold text-gray-900">
                    {review.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>


      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trending Now
            </h2>

            <a
              href="/All-products"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all
            </a>
          </div>

          {/* Scroll Area */}
          <div className="overflow-x-auto scrollbar-hide">
            <div
              className="flex gap-5 pb-2
                   snap-x snap-mandatory
                   scroll-smooth"
            >
              {trending.map((item) => (
                <Link
                  key={item._id || item.id}
                  to={`/product/${item.id || item.id}`}
                  className="snap-start shrink-0"
                >
                  <div
                    className="w-[220px] sm:w-[240px]
                     bg-white rounded-xl
                     border border-gray-200
                     hover:shadow-lg transition"
                  >
                    {/* Image */}
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-56 object-cover rounded-t-xl"
                    />

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>

                      <p className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                          ₹{item.price}
                        </span>

                        {item.oldprice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.oldprice}
                          </span>
                        )}
                      </p>

                    </div>
                  </div>
                </Link>
              ))}

              {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.slice(15, 19).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

              </div> */}
            </div>
          </div>

        </div>
      </section>

    </div >




  );
};

export default Home;


