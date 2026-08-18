import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from "react-icons/si";
import {
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlineSupportAgent,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { BiGift } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import axios from "axios";

/* ---- Helper motion variants ---- */
const fadeUpStagger = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const childItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  // ------- Scroll listener for back-to-top button -------
  const { scrollY } = useScroll();
  const updateBackToTopVisibility = useCallback((latest) => {
    const nextVisibility = latest > 400;
    setShowBackToTop((currentVisibility) =>
      currentVisibility === nextVisibility ? currentVisibility : nextVisibility
    );
  }, []);

  useMotionValueEvent(scrollY, "change", updateBackToTopVisibility);

  // ------- Newsletter subscription -------
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Email is required");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/subscribe`, { email });
      alert(res.data.message);
      setEmail("");
    } catch (err) {
      alert(err.response?.data?.message || "Subscription failed");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f172a] text-gray-300 relative font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ========== Top Features ========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpStagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-700 pb-10 text-center md:text-left"
        >
          {[
            {
              icon: (
                <MdOutlineLocalShipping className="text-3xl text-[#16a34a] mx-auto md:mx-0" />
              ),
              title: "Free Shipping",
              desc: "On orders over ₹1000",
            },
            {
              icon: (
                <MdOutlinePayment className="text-3xl text-[#16a34a] mx-auto md:mx-0" />
              ),
              title: "Secure Payment",
              desc: "100% safe & encrypted",
            },
            {
              icon: (
                <MdOutlineSupportAgent className="text-3xl text-[#16a34a] mx-auto md:mx-0" />
              ),
              title: "24/7 Support",
              desc: "Dedicated help team",
            },
            {
              icon: <BiGift className="text-3xl text-[#16a34a] mx-auto md:mx-0" />,
              title: "Gift Cards",
              desc: "Perfect gifts for loved ones",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={childItem}
              whileHover={{ y: -3 }}
              className="flex flex-col md:flex-row items-center md:items-start gap-3 cursor-default"
            >
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ type: "tween", stiffness: 300 }}
              >
                {item.icon}
              </motion.div>
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ========== Main Footer Grid ========== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpStagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 pb-6 text-center sm:text-left"
        >
          {/* About */}
          <motion.div variants={childItem} className="flex flex-col items-center sm:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">About EcoWear</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              We deliver timeless fashion using 100% organic fabrics, plastic‑free
              packaging, and fair wages — built for conscious living.
            </p>

            <div className="flex space-x-4 justify-center sm:justify-start">
              {[
                { icon: FaFacebook, path: "https://www.facebook.com", label: "Facebook" },
                { icon: FaTwitter, path: "https://www.twitter.com", label: "Twitter" },
                {
                  icon: FaInstagram,
                  path: "https://www.instagram.com",
                  label: "Instagram",
                },
                {
                  icon: FaPinterest,
                  path: "https://www.pinterest.com",
                  label: "Pinterest",
                },
                { icon: FaYoutube, path: "https://www.youtube.com", label: "YouTube" },
              ].map(({ icon: Icon, path, label }, i) => (
                <motion.a
                  key={i}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, color: "#16a34a" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-[#16a34a] transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={childItem}>
            <h3 className="text-white text-lg font-semibold mb-4 text-center sm:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-400 text-center sm:text-left">
              {[
                { name: "Home", path: "/" },
                { name: "All Products", path: "/All-Products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="relative inline-block group transition-colors hover:text-white"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#16a34a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={childItem}>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400 text-center sm:text-left">
              {[
                { name: "Shipping Policy", path: "/shipping-policy" },
                { name: "Returns & Refunds", path: "/returns" },
                { name: "Size Guide", path: "/size-guide" },
                { name: "FAQs", path: "/faqs" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms & Conditions", path: "/terms-and-conditions" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="relative inline-block group transition-colors hover:text-white"
                  >
                    <span>{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-[#16a34a] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={childItem} className="flex flex-col items-center sm:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-xs text-center sm:text-left">
              Subscribe to get updates on new arrivals and exclusive discounts.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full max-w-xs gap-2 sm:gap-0"
            >
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none
                           focus:outline-none text-gray-900 bg-white border-2 border-transparent
                           transition-all duration-300 focus:border-[#16a34a] focus:shadow-lg focus:scale-[1.02]"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#14532d] text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none transition-colors font-medium"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* ========== Bottom Bar ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-6 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-gray-500 text-center"
        >
          <p>&copy; {new Date().getFullYear()} EcoWear. All rights reserved.</p>

          <div className="flex space-x-5 text-3xl text-gray-500">
            {[
              { Icon: SiVisa, label: "Visa" },
              { Icon: SiMastercard, label: "Mastercard" },
              { Icon: SiPaypal, label: "PayPal" },
              { Icon: SiApplepay, label: "Apple Pay" },
            ].map(({ Icon, label }, i) => (
              <motion.div
                key={i}
                aria-label={label}
                whileHover={{ scale: 1.15, color: "#16a34a", filter: "grayscale(0)" }}
                className="text-gray-500 hover:text-[#16a34a] transition-all duration-300 grayscale hover:grayscale-0"
              >
                <Icon />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ========== Back to Top Button ========== */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-[#16a34a] hover:bg-[#14532d] text-white rounded-full shadow-xl flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Back to top"
          >
            <MdKeyboardArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
