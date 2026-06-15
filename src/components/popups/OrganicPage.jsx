import React from "react";
import organicImg from "../images/Organic.webp";

const OrganicPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

    <section className="min-h-screen bg-white text-gray-900 px-4 py-12 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          100% Organic Clothing
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience comfort with purpose. Every piece from EcoWear is crafted
          using organic fibers that care for you and the planet.
        </p>
      </div>

      <div className="mb-16">
        <img
          src={organicImg}
          alt="Organic cotton field"
          className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]"
        />
      </div>

      <div className="space-y-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Why Organic?</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EcoWear uses only <strong>GOTS-certified organic cotton</strong>,
            grown without toxic pesticides or GMOs. It’s safer for the
            environment, farmers, and your skin.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Earth-Friendly Process</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We use <strong>low-impact dyes</strong> and conserve water through
            eco-conscious processing. Each garment is breathable, biodegradable,
            and gentle on your skin.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Fair & Transparent</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every item is made in facilities that follow
            <strong> fair labor practices</strong>, with ethical wages and safe
            working conditions.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Built to Last</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Organic cotton offers <strong>greater durability</strong> and
            <strong> superior softness</strong>. Our clothing is made to last
            longer, wash after wash.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">More Than Fabric</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Wearing EcoWear means living your values — supporting
            <strong> sustainability, ethics, and timeless design</strong> with
            every outfit.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default OrganicPage;
