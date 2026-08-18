import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import organicImg from "../../assets/images/Organic.webp";

const OrganicPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-poppins">
      <Helmet>
        <title>100% Organic Clothing – EcoWear</title>
        <meta
          name="description"
          content="EcoWear uses GOTS-certified organic cotton, low-impact dyes, and ethical production for truly sustainable fashion."
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
            100% Organic Clothing
          </h1>
          <p className="mt-3 text-gray-500 max-w-3xl mx-auto">
            Experience comfort with purpose. Every piece from EcoWear is crafted
            using organic fibers that care for you and the planet.
          </p>
        </motion.div>

        {/* Image with subtle overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={organicImg}
            alt="Organic cotton field"
            className="w-full max-h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-6">
            <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              GOTS-Certified Organic Cotton
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
              title: "Why Organic?",
              text: "EcoWear uses only **GOTS-certified organic cotton**, grown without toxic pesticides or GMOs. It’s safer for the environment, farmers, and your skin.",
            },
            {
              title: "Earth-Friendly Process",
              text: "We use **low-impact dyes** and conserve water through eco-conscious processing. Each garment is breathable, biodegradable, and gentle on your skin.",
            },
            {
              title: "Fair & Transparent",
              text: "Every item is made in facilities that follow **fair labor practices**, with ethical wages and safe working conditions.",
            },
            {
              title: "Built to Last",
              text: "Organic cotton offers **greater durability** and **superior softness**. Our clothing is made to last longer, wash after wash.",
            },
            {
              title: "More Than Fabric",
              text: "Wearing EcoWear means living your values — supporting **sustainability, ethics, and timeless design** with every outfit.",
              spanFull: true,
            },
          ].map(({ title, text, spanFull = false }, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
              className={`bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md transition-all duration-300 ${
                spanFull ? "md:col-span-2" : ""
              }`}
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

export default OrganicPage;
