import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiApplepay } from "react-icons/si";
import { MdOutlineLocalShipping, MdOutlinePayment, MdOutlineSupportAgent } from "react-icons/md";
import { BiGift } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Footer = () => {

  const [email, setEmail] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

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



  return (
    <footer className="bg-[#111827] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Top features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-700 pb-10 text-center md:text-left">
          {[
            {
              icon: <MdOutlineLocalShipping className="text-3xl text-green-500 mx-auto md:mx-0" />,
              title: "Free Shipping",
              desc: "On orders over ₹1000",
            },
            {
              icon: <MdOutlinePayment className="text-3xl text-green-500 mx-auto md:mx-0" />,
              title: "Secure Payment",
              desc: "100% safe & encrypted",
            },
            {
              icon: <MdOutlineSupportAgent className="text-3xl text-green-500 mx-auto md:mx-0" />,
              title: "24/7 Support",
              desc: "Dedicated help team",
            },
            {
              icon: <BiGift className="text-3xl text-green-500 mx-auto md:mx-0" />,
              title: "Gift Cards",
              desc: "Perfect gifts for loved ones",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center md:items-start gap-3"
            >
              {item.icon}
              <div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 pb-6 text-center sm:text-left">

          {/* About */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">About EcoWear</h3>
            <p className="text-sm text-gray-400 mb-4 max-w-xs">
              We deliver timeless fashion using 100% organic fabrics, plastic-free packaging, and fair wages — built for conscious living.
            </p>

            <div className="flex space-x-4 justify-center sm:justify-start">
              {[
                { icon: FaFacebook, path: "https://www.facebook.com", label: "Facebook" },
                { icon: FaTwitter, path: "https://www.twitter.com", label: "Twitter" },
                { icon: FaInstagram, path: "https://www.instagram.com", label: "Instagram" },
                { icon: FaPinterest, path: "https://www.pinterest.com", label: "Pinterest" },
                { icon: FaYoutube, path: "https://www.youtube.com", label: "YouTube" },
              ].map(({ icon: Icon, path, label }, i) => (
                <a
                  key={i}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-green-500 transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
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
                    className="hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Customer Service */}
          <div>
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
                    className="hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>

            <p className="text-sm text-gray-400 mb-4 max-w-xs text-center sm:text-left">
              Subscribe to get updates on new arrivals and exclusive discounts.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full max-w-xs gap-2 sm:gap-0"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 rounded-md sm:rounded-l-md sm:rounded-r-none
                 focus:outline-none text-gray-900"
              />

              <button
                type="submit"
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600
                 text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none
                 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row gap-4 justify-between items-center text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} EcoWear. All rights reserved.</p>

          <div className="flex space-x-5 text-gray-400 text-3xl">
            <SiVisa className="hover:text-white transition" />
            <SiMastercard className="hover:text-white transition" />
            <SiPaypal className="hover:text-white transition" />
            <SiApplepay className="hover:text-white transition" />
          </div>
        </div>

      </div>
    </footer>

  );
};

export default Footer;
