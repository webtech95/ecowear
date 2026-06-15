import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import image from "./images/Green and White Conceptual New Look Fashion Blog Banner.webp";
import { useEffect, useState } from "react";
import OrganicPage from "./popups/OrganicPage";
import PlasticPackagingPage from "./popups/PlasticPackagingPage";
import FairWagesPage from "./popups/FairWagesPage";
import TimelessDesignPage from "./popups/TimelessDesignPage";

import Banner from "./images/Banner2.webp";
import img1 from "./images/1.webp"
import img2 from "./images/2.webp"
import img3 from "./images/3.webp"
import img4 from "./images/4.webp"
import img5 from "./images/5.webp"
import img6 from "./images/6.webp"
import img7 from "./images/7.webp"
import img8 from "./images/8.webp"
import img9 from "./images/9.webp"
import img10 from "./images/10.webp"

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




const About = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white text-gray-800">


      {/* Hero Carousel */}
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
            className="w-full h-[70vh]"
          >
            {CrousalImages.map((img) => (
              <SwiperSlide key={img.id}>
                <img
                  src={img.image}
                  alt={`Slide ${img.id}`}
                  className="w-full h-full object-cover block"
                />

              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </section>

      {/* Hero Section */}
      <section className="bg-gray-100 py-16 text-center m-0">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Elevate Your Style with <span className="text-green-600">EcoWear</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Sustainable fashion for modern living.
          </p>
          <Link to="/shop">
            <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-green-600 transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About EcoWear</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          At EcoWear, we believe fashion should feel good — not just on your skin, but in your soul. We create sustainable, ethically produced clothing that blends comfort, style, and environmental responsibility.
        </p>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img src={image} alt="EcoWear values" className="w-full rounded-xl shadow-md" />
          <div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4">Sustainability in Every Thread</h3>
            <p className="text-gray-700 mb-4">
              Our mission is to reduce fashion waste by creating long-lasting, biodegradable clothing from organic materials. We source fabrics responsibly and collaborate only with certified ethical partners.
            </p>
            <p className="text-gray-700">
              EcoWear is more than a brand — it's a movement for a cleaner, kinder, and more beautiful fashion future.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Why Choose <span className="text-green-600">EcoWear</span>?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { title: "100% Organic", desc: "All our fabrics are GOTS certified organic.", modal: "organic" },
            { title: "Plastic-Free Packaging", desc: "We use compostable & recyclable packaging.", modal: "packaging" },
            { title: "Fair Wages", desc: "Fair pay and safe conditions for every worker.", modal: "wages" },
            { title: "Timeless Design", desc: "Durable, trend-proof, comfortable fashion.", modal: "design" }
          ].map(({ title, desc, modal }) => (
            <div
              key={modal}
              onClick={() => setActiveModal(modal)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <h4 className="text-xl font-semibold mb-2">{title}</h4>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-6 text-base md:text-lg text-gray-700 text-justify">
          <p>
            <strong>EcoWear</strong> crafts garments with deep commitment to sustainability, ethics, and timeless design. Our organic fabrics like GOTS cotton, bamboo, and hemp protect ecosystems and reduce waste.
          </p>
          <p>
            <strong>Plastic-free packaging</strong> and <strong>fair labor</strong> aren't trends — they're non-negotiables. Every item reflects our belief in clean fashion.
          </p>
          <p>
            With minimalist design and maximum quality, our clothes are made to last — for you and for the planet.
          </p>
        </div>
      </section>

      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-auto pt-20">
          <div className="bg-white max-w-4xl w-full mx-4 p-6 rounded-xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            {activeModal === "organic" && <OrganicPage />}
            {activeModal === "packaging" && <PlasticPackagingPage />}
            {activeModal === "wages" && <FairWagesPage />}
            {activeModal === "design" && <TimelessDesignPage />}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
