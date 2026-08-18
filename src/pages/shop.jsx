import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { products } from "../features/catalog/productImagesdetails";
import ProductCard from "../features/catalog/product";
import debounce from "lodash/debounce";

// Static data
const allCategories = [...new Set(products.map((p) => p.category))];
const allSubCategories = [...new Set(products.map((p) => p.subCategory))];

// ---- Skeleton card ----
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
    <div className="aspect-[3/4] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

const SkeletonGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

// ---- Animation variants ----
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

// ---- Memoized filter pill ----
const CategoryPill = React.memo(({ cat, isSelected, onSelect }) => (
  <motion.button
    onClick={() => onSelect(cat)}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
      ${isSelected
        ? "bg-[#16a34a] text-white shadow-lg shadow-[#16a34a]/30"
        : "bg-white text-gray-600 border border-gray-200 hover:border-[#16a34a] hover:text-[#16a34a]"
      }`}
  >
    {cat}
  </motion.button>
));

const Shop = () => {
  const { category: urlCategory, subCategory: urlSubCategory } = useParams();
  const navigate = useNavigate();

  // ---- State ----
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || "All");
  const [selectedSubCategory, setSelectedSubCategory] = useState(urlSubCategory || "All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true); // ← will be used

  // Simulate data fetching: show skeleton for 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sync URL params with local state
  useEffect(() => {
    if (urlCategory) setSelectedCategory(urlCategory);
    if (urlSubCategory) setSelectedSubCategory(urlSubCategory);
  }, [urlCategory, urlSubCategory]);

  // ---- Filtering (memoized) ----
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
      if (selectedSubCategory !== "All" && product.subCategory !== selectedSubCategory) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      return true;
    });
  }, [selectedCategory, selectedSubCategory, priceRange]);

  // ---- Handlers (useCallback) ----
  const handleCategoryClick = useCallback(
    (cat) => {
      setSelectedCategory(cat);
      if (cat === "All") setSelectedSubCategory("All");
      navigate(cat === "All" ? "/All-Products" : `/${cat.toLowerCase()}`, { replace: true });
    },
    [navigate]
  );

  const resetFilters = useCallback(() => {
    setSelectedCategory("All");
    setSelectedSubCategory("All");
    setPriceRange([0, 5000]);
  }, []);

  // Stable debounced function for price slider
  const debouncedSetMaxPrice = useRef(
    debounce((val) => setPriceRange((prev) => [prev[0], Number(val)]), 50)
  ).current;

  useEffect(() => () => debouncedSetMaxPrice.cancel(), [debouncedSetMaxPrice]);

  const handlePriceChange = useCallback(
    (e) => {
      debouncedSetMaxPrice(e.target.value);
    },
    [debouncedSetMaxPrice]
  );

  // Simplify animations on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const gridVariants = isMobile ? {} : container;
  const itemVariants = isMobile ? {} : item;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 font-poppins">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            {selectedCategory !== "All" ? selectedCategory : "All"} Collection
          </h1>
          <p className="mt-2 text-gray-500">Discover sustainable fashion crafted for you</p>
        </motion.div>

        {/* Category Pills & Filter Toggle */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2">
              {["All", ...allCategories].map((cat) => (
                <CategoryPill
                  key={cat}
                  cat={cat}
                  isSelected={selectedCategory === cat}
                  onSelect={handleCategoryClick}
                />
              ))}
            </div>
          </div>

          <motion.button
            onClick={() => setShowFilters((prev) => !prev)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-[#16a34a] transition-colors shadow-sm"
          >
            <FiFilter className="w-4 h-4" />
            Filters
          </motion.button>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white/80 backdrop-blur-lg border border-white/50 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                  <div className="flex gap-3">
                    <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-[#16a34a] underline">
                      Reset
                    </button>
                    <button onClick={() => setShowFilters(false)} className="md:hidden">
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", ...allCategories].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                            ${selectedCategory === cat
                              ? "bg-[#16a34a] text-white border-[#16a34a]"
                              : "bg-white text-gray-600 border-gray-300 hover:border-[#16a34a]"
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SubCategory */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["All", ...allSubCategories].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setSelectedSubCategory(sub)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors
                            ${selectedSubCategory === sub
                              ? "bg-[#16a34a] text-white border-[#16a34a]"
                              : "bg-white text-gray-600 border-gray-300 hover:border-[#16a34a]"
                            }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      Price: ₹{priceRange[0]} – ₹{priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={handlePriceChange}
                      className="w-full accent-[#16a34a]"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid / Skeleton */}
        {loading ? (
          <SkeletonGrid />
        ) : filteredProducts.length > 0 ? (
          <motion.div
            variants={gridVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 justify-items-center"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="w-full"
                style={{ willChange: "transform" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-[#16a34a]/10 flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6 max-w-xs">Try adjusting your filters or browse all products.</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#16a34a] text-white rounded-full font-medium hover:bg-[#14532d] transition-colors"
            >
              View All Products
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default Shop;
