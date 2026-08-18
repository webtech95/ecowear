import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import fairWagesImg from "../../assets/images/textile-industry-in-india.webp";

const FairWagesPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-poppins">
      <Helmet>
        <title>Fair Wages – EcoWear</title>
        <meta
          name="description"
          content="EcoWear ensures fair wages, ethical labor, and safe working conditions for all workers in our supply chain."
        />
      </Helmet>

      <section className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white px-4 py-12 md:px-8 lg:px-16">
        {/* Animated header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Fair Wages
          </h1>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            We believe in dignity, respect, and fair compensation for every hand that crafts our garments.
          </p>
        </motion.div>

        {/* Image with glassmorphism overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={fairWagesImg}
            alt="Fair wage workers"
            className="w-full max-h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
            <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              Ethical Labor Practices
            </span>
          </div>
        </motion.div>

        {/* Content grid with staggered fade-up */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid gap-10 md:grid-cols-2"
        >
          {[
            {
              title: "Ethical Labor First",
              text: "EcoWear partners only with certified factories that ensure **living wages** and **safe work environments** for every worker.",
            },
            {
              title: "Fair Trade Standards",
              text: "We go beyond global **Fair Trade standards** in terms of wages, worker rights, and ethical working hours.",
            },
            {
              title: "Empowering Artisans",
              text: "Many of our pieces are handmade by **women-led cooperatives** and **rural artisans**, helping sustain communities.",
            },
            {
              title: "Transparency at Every Step",
              text: "We believe in accountability. That’s why we publish yearly **supply chain reports** and **independent audit results**.",
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

export default FairWagesPage;
