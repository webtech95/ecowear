import { memo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronDown, FiUser, FiPackage, FiHeart,
  FiMapPin, FiCreditCard, FiGift, FiSettings, FiLogOut
} from "react-icons/fi";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: FiUser, label: "My Profile", to: "/dashboard?tab=profile" },
  { icon: FiPackage, label: "My Orders", to: "/dashboard?tab=orders" },
  { icon: FiHeart, label: "Wishlist", to: "/dashboard?tab=wishlist" },
  { icon: FiMapPin, label: "Saved Addresses", to: "/dashboard?tab=addresses" },
  { icon: FiCreditCard, label: "Payment Methods", to: "/dashboard?tab=payment" },
  { icon: FiGift, label: "Coupons", to: "/dashboard?tab=coupons" },
  { icon: FiSettings, label: "Account Settings", to: "/dashboard?tab=settings" },
];

const UserDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FiUser className="text-green-600 w-4 h-4" />
          )}
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-700">
          {user?.name?.split(" ")[0]}
        </span>
        <FiChevronDown className={`hidden md:block w-4 h-4 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl z-50 p-2"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>

            <div className="py-2">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                onClick={() => { onLogout(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-1"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(UserDropdown);
