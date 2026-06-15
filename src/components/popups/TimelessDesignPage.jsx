import React from "react";
import timelessImg from "../images/Minimal fashion.webp";

const TimelessDesignPage = () => {
  return (
    
    <section className="min-h-screen bg-white text-gray-800 px-4 py-12 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Timeless Design
        </h1>

        <div className="mb-12">
          <img
            src={timelessImg}
            alt="Timeless clothing style"
            className="rounded-2xl shadow-lg w-full max-h-[500px] object-cover"
          />
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Minimalist & Modern</h2>
            <p className="text-lg text-gray-700">
              EcoWear pieces are designed with <strong>clean lines</strong> and neutral tones, so they never go out of style.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Slow Fashion Philosophy</h2>
            <p className="text-lg text-gray-700">
              We reject fast fashion trends in favor of <strong>versatile clothing</strong> that lasts through seasons and years.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Durability First</h2>
            <p className="text-lg text-gray-700">
              With <strong>reinforced stitching</strong> and high-quality fabrics, our garments are built to be worn and reworn.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Style with Substance</h2>
            <p className="text-lg text-gray-700">
              Our fashion isn't just beautiful — it reflects your values and speaks to a <strong>conscious lifestyle</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelessDesignPage;
