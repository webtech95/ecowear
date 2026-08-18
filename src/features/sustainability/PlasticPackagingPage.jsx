import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import packagingImg from "../../assets/images/Clothes packaging.webp";

const PlasticPackagingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-poppins">
      <Helmet>
        <title>Plastic-Free Packaging – EcoWear</title>
        <meta
          name="description"
          content="EcoWear ships all orders in 100% compostable, plastic-free packaging. No plastic tape, no bubble wrap – just clean, Earth-first delivery."
        />
      </Helmet>

      <section className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white px-4 py-12 md:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Plastic-Free Packaging
          </h1>
          <p className="mt-3 text-gray-500 max-w-3xl mx-auto">
            Our promise: No plastic. Ever. From box to label, everything we ship is 100% compostable or recyclable.
          </p>
        </motion.div>

        {/* Image with overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={packagingImg}
            alt="Plastic-free packaging"
            className="w-full max-h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
            <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              Zero Plastic Promise
            </span>
          </div>
        </motion.div>

        {/* Content cards with staggered fade-up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid gap-10 md:grid-cols-2 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Zero Plastic Promise",
              text: "Every EcoWear order is packed using **compostable**, **biodegradable**, or **recycled materials**. No plastic tape. No bubble wrap. Just clean, Earth-first packaging.",
            },
            {
              title: "Sustainable Shipping",
              text: "We work with logistics partners who prioritize **low-emission delivery** — minimizing carbon footprints with every shipment.",
            },
            {
              title: "Compostable Materials",
              text: "Our mailers are made from **plant starches** and fully decompose in home compost in under 180 days — no industrial facilities needed.",
            },
            {
              title: "Consumer Consciousness",
              text: "Every shipment comes with clear **recycling and compost instructions**. We encourage reusing materials or returning them to Earth.",
            },
          ].map(({ title, text }, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
              className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">{title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {text.split("**").map((part, i) =>
                  i % 2 === 1 ? (
                    <strong key={i} className="text-[#14532d] font-semibold">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default PlasticPackagingPage;
