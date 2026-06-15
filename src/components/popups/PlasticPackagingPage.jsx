import React from "react";
import packagingImg from "../images/Clothes packaging.webp";

const PlasticPackagingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

    <section className="min-h-screen bg-white text-gray-900 px-4 py-12 md:px-8 lg:px-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Plastic-Free Packaging
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our promise: No plastic. Ever. From box to label, everything we ship is 100% compostable or recyclable.
        </p>
      </div>

      <div className="mb-16">
        <img
          src={packagingImg}
          alt="Plastic-free packaging"
          className="w-full rounded-2xl shadow-xl object-cover max-h-[500px]"
        />
      </div>

      <div className="space-y-12 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Zero Plastic Promise</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every EcoWear order is packed using <strong>compostable</strong>,
            <strong> biodegradable</strong>, or <strong>recycled materials</strong>.
            No plastic tape. No bubble wrap. Just clean, Earth-first packaging.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Sustainable Shipping</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We work with logistics partners who prioritize
            <strong> low-emission delivery</strong> — minimizing carbon footprints with every shipment.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Compostable Materials</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our mailers are made from <strong>plant starches</strong> and fully decompose in home compost in under 180 days — no industrial facilities needed.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Consumer Consciousness</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Every shipment comes with clear <strong>recycling and compost instructions</strong>. We encourage reusing materials or returning them to Earth.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default PlasticPackagingPage;
