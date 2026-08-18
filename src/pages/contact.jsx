import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import axios from "axios";

/* ---- Framer Motion Variants ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, msg: "", error: false });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "", error: false });

    try {
      await axios.post(`${API_URL}/contact/send`, form);
      setStatus({ loading: false, msg: "Message sent successfully!", error: false });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ loading: false, msg: "Failed to send message. Try again.", error: true });
    }
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-white text-gray-900 min-h-screen font-poppins">
      {/* Decorative floating leaves */}
      <div className="absolute top-20 left-10 w-16 h-16 opacity-10 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="#16a34a">
          <path d="M12 2C8 6 4 10 4 14C4 17.866 7.134 21 11 21C12.933 21 14.683 20.216 16 19C17.317 17.783 18 16.067 18 14C18 10 14 6 12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 w-12 h-12 opacity-10 pointer-events-none">
        <svg viewBox="0 0 24 24" fill="#16a34a">
          <path d="M12 2C8 6 4 10 4 14C4 17.866 7.134 21 11 21C12.933 21 14.683 20.216 16 19C17.317 17.783 18 16.067 18 14C18 10 14 6 12 2Z" />
        </svg>
      </div>

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Get in <span className="text-[#16a34a]">Touch</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Have a question, feedback, or collaboration idea?  
            We’d love to hear from you.
          </p>
        </motion.div>

        {/* Contact info cards */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
        >
          {[
            { icon: FiMapPin, title: "Visit Us", desc: "EcoWear, Sector 5, New Delhi, India" },
            { icon: FiPhone, title: "Call Us", desc: "+91 98765 43210" },
            { icon: FiMail, title: "Email Us", desc: "hello@ecowear.in" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-100 hover:border-[#16a34a]/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#16a34a]/10 text-[#16a34a] mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Form and Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Form */}
          <motion.form
            variants={fadeUp}
            custom={2}
            onSubmit={handleSubmit}
            className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/50 shadow-xl p-6 sm:p-8 space-y-5"
          >
            {/* Name */}
            <div className="relative">
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent
                           text-gray-900 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]
                           transition-all duration-200 pt-5 pb-2"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-4 text-gray-400 text-sm pointer-events-none
                           transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#16a34a]
                           peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent
                           text-gray-900 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]
                           transition-all duration-200 pt-5 pb-2"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-gray-400 text-sm pointer-events-none
                           transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#16a34a]
                           peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Email
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 rounded-lg border border-gray-300 bg-transparent
                           text-gray-900 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]
                           transition-all duration-200 pt-5 pb-2 resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-4 text-gray-400 text-sm pointer-events-none
                           transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                           peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#16a34a]
                           peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Message
              </label>
            </div>

            {/* Status Message */}
            <AnimatePresence mode="wait">
              {status.msg && (
                <motion.p
                  key={status.msg}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm font-medium ${
                    status.error ? "text-red-600" : "text-[#16a34a]"
                  }`}
                >
                  {status.msg}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status.loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#16a34a] text-white py-3.5 rounded-lg font-semibold
                         transition-colors duration-200 hover:bg-[#14532d] disabled:opacity-60
                         shadow-lg shadow-[#16a34a]/20"
            >
              {status.loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            custom={3}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-[300px] sm:h-[360px] md:h-[480px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5975640721335!2d77.27508397495828!3d28.671766082298843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfc86ff9bef55%3A0xcbded5c8a601dca7!2sWelcome!5e0!3m2!1sen!2sin!4v1747492006342!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EcoWear location on Google Maps"
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;