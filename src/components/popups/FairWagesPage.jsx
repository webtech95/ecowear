import React from "react";
import fairWagesImg from "../images/textile-industry-in-india.webp";

const FairWagesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">

    <section className="min-h-screen bg-white text-gray-900 px-4 py-12 md:px-8 lg:px-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Fair Wages
      </h1>

      <div className="mb-16">
        <img
          src={fairWagesImg}
          alt="Fair wage workers"
          className="rounded-2xl shadow-xl w-full max-h-[500px] object-cover"
        />
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Ethical Labor First</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EcoWear partners only with certified factories that ensure
            <strong> living wages </strong> and
            <strong> safe work environments</strong> for every worker.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Fair Trade Standards</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We go beyond global <strong>Fair Trade standards</strong> in terms
            of wages, worker rights, and ethical working hours.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Empowering Artisans</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Many of our pieces are handmade by
            <strong> women-led cooperatives</strong> and
            <strong> rural artisans</strong>, helping sustain communities.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Transparency at Every Step
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe in accountability. That’s why we publish yearly
            <strong> supply chain reports</strong> and
            <strong> independent audit results</strong>.
          </p>
        </div>
      </div>
    </section>
    </div>
  );
};

export default FairWagesPage;
