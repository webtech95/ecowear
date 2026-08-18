import { motion } from "framer-motion";

const PageWrapper = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white py-10 px-4 sm:px-6 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        {/* Header with decorative leaf */}
        <div className="text-center mb-10 relative">
          {/* Eco leaf icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#16a34a]/10 mb-4">
            <svg
              className="w-8 h-8 text-[#16a34a]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C8 6 4 10 4 14C4 17.866 7.134 21 11 21C12.933 21 14.683 20.216 16 19C17.317 17.783 18 16.067 18 14C18 10 14 6 12 2Z" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Customer Service
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            {title}
          </p>
        </div>

        {/* Glassmorphism content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
          className="
            bg-white/70 backdrop-blur-xl
            border border-white/50
            rounded-3xl
            shadow-lg shadow-black/5
            p-8 sm:p-10
            transition-shadow duration-300
          "
        >
          <div className="space-y-8 text-gray-700">{children}</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PageWrapper;