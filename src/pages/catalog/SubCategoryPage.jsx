import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../../features/catalog/productImagesdetails";
import ProductCard from "../../features/catalog/product";

/* ---- Animation variants ---- */
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const SubCategoryPage = ({ category, subCategory, title }) => {
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (p) => p.category === category && p.subCategory === subCategory
  );

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {title}
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Discover our eco‑friendly {title.toLowerCase()} collection, crafted for conscious living.
          </p>
          {filteredProducts.length > 0 && (
            <p className="text-sm text-gray-400 mt-2">
              {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </p>
          )}
        </motion.div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariant}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#16a34a]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9-4 9 4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500">We couldn’t find any items in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SubCategoryPage;
