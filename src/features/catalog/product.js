import { memo, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiHeart, FiX } from "react-icons/fi";
import { useCart } from "../cart/cartContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // ----- Hooks are called unconditionally (before any early return) -----
  const defaultSize = product?.sizes?.[0] || "M";
  const defaultColor = product?.colors?.[0] || "black";

  const handleAddToCart = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!product) return; // safety
      addToCart({
        ...product,
        selectedSize: defaultSize,
        selectedColor: defaultColor,
      });
      toast.success(`${product.name} added to cart`);
    },
    [addToCart, product, defaultSize, defaultColor]
  );

  const toggleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showQuickView) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showQuickView]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setShowQuickView(false);
    };
    if (showQuickView) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showQuickView]);

  // ---- Early return AFTER all hooks ----
  if (!product) return null;

  const { id, name, price, oldprice, image, sizes, colors, rating, eco, inStock } = product;

  return (
    <>
      {/* Card */}
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)" }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-300 group font-poppins"
      >
        {/* Image Container */}
        <Link to={`/product/${id}`} className="block relative overflow-hidden">
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {eco && (
                <span className="bg-[#16a34a]/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 4 10 4 14C4 17.866 7.134 21 11 21C12.933 21 14.683 20.216 16 19C17.317 17.783 18 16.067 18 14C18 10 14 6 12 2Z" />
                  </svg>
                  Eco
                </span>
              )}
              {inStock !== undefined && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm ${
                    inStock ? "bg-black/70 text-white" : "bg-red-500/90 text-white"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              )}
            </div>

            {/* Overlay + Centered Quick View button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuickView(true);
                }}
                className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-3 shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                aria-label="Quick view"
              >
                <FiEye className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Wishlist button */}
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <motion.div
                animate={isWishlisted ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <FiHeart
                  className={`w-4 h-4 ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
              </motion.div>
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <Link to={`/product/${id}`} className="block p-4 pb-0">
          {rating !== undefined && (
            <div className="flex items-center gap-1 mb-1">
              <div className="flex text-yellow-400 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="text-xs text-gray-500">({rating})</span>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-bold text-gray-800">₹{price}</span>
            {oldprice && <span className="text-sm text-gray-400 line-through">₹{oldprice}</span>}
          </div>
        </Link>

        {/* Add to Cart */}
        <div className="p-4 pt-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAddToCart}
            className="w-full bg-[#16a34a] hover:bg-[#14532d] text-white py-2.5 rounded-xl font-semibold shadow-md shadow-[#16a34a]/20 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      {/* Quick View Modal via Portal */}
      {showQuickView &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowQuickView(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
              >
                <button
                  onClick={() => setShowQuickView(false)}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-48 sm:h-full object-cover rounded-xl"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                    <p className="text-[#16a34a] font-bold mt-1">₹{price}</p>
                    {oldprice && (
                      <p className="text-sm text-gray-400 line-through">₹{oldprice}</p>
                    )}

                    {sizes && sizes.length > 0 && (
                      <div className="mt-4">
                        <span className="text-sm font-medium text-gray-700">Size:</span>
                        <div className="flex gap-2 mt-1">
                          {sizes.map((size) => (
                            <span
                              key={size}
                              className="px-3 py-1 border rounded-full text-xs cursor-pointer bg-gray-100 hover:bg-green-100"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {colors && colors.length > 0 && (
                      <div className="mt-3">
                        <span className="text-sm font-medium text-gray-700">Color:</span>
                        <div className="flex gap-2 mt-1">
                          {colors.map((color) => (
                            <span
                              key={color}
                              className="w-6 h-6 rounded-full border cursor-pointer"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAddToCart}
                      className="mt-6 w-full bg-[#16a34a] hover:bg-[#14532d] text-white py-2.5 rounded-xl font-semibold shadow-md"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default memo(ProductCard);
