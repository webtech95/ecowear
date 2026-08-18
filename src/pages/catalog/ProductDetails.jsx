import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHeart,
  FiShare2,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiChevronDown,
  FiStar,
} from "react-icons/fi";
import { products } from "../../features/catalog/productImagesdetails";
import { useCart } from "../../features/cart/cartContext";
import { toast } from "react-toastify";
import ProductCard from "../../features/catalog/product"; 

const colorOptions = [
  { name: "Black", code: "#000000" },
  { name: "Blue", code: "#2563eb" },
  { name: "Red", code: "#ef4444" },
  { name: "Green", code: "#10b981" },
  { name: "Yellow", code: "#facc15" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  // UI state
  const [selectedImg, setSelectedImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showZoom, setShowZoom] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    if (prod) {
      setProduct(prod);
      setSelectedImg(prod.images?.[0] || prod.image);
      setSelectedColor(colorOptions[0]?.code); // default first color
    }
  }, [id]);

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Product not found.</p>
      </div>
    );

  // Related products (same category, exclude current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImg,
      selectedSize,
      selectedColor,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }
    handleAddToCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#16a34a] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/All-Products" className="hover:text-[#16a34a] transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* LEFT: IMAGE GALLERY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image with Zoom */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-lg mb-4 group cursor-zoom-in"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
            >
              <motion.img
                src={selectedImg}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500"
                animate={{ scale: showZoom ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              />
              {/* Wishlist & Share overlay */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
                >
                  <FiHeart
                    className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`}
                  />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow"
                >
                  <FiShare2 className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 flex-wrap">
              {product.images?.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImg(img)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl cursor-pointer border-2 overflow-hidden transition-all
                    ${selectedImg === img ? "border-[#16a34a] shadow-md" : "border-gray-200 hover:border-gray-400"}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: PRODUCT DETAILS (Sticky on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-24 self-start"
          >
            <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.rating})</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-[#16a34a]">₹{product.price}</span>
                {product.oldprice && (
                  <span className="text-lg text-gray-400 line-through">₹{product.oldprice}</span>
                )}
                {product.oldprice && (
                  <span className="text-sm text-red-500 font-semibold">
                    Save ₹{product.oldprice - product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description || "Premium eco-friendly garment designed for comfort and sustainability."}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Color: <span className="font-normal text-gray-500">{selectedColor}</span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {colorOptions.map((color) => (
                    <motion.button
                      key={color.code}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color.code)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-200
                        ${selectedColor === color.code ? "border-[#16a34a] ring-2 ring-[#16a34a]/30" : "border-gray-300 hover:border-gray-500"}`}
                      style={{ backgroundColor: color.code }}
                      aria-label={`Color ${color.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Size: <span className="font-normal text-gray-500">{selectedSize || "Select"}</span>
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes?.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                        ${selectedSize === size
                          ? "bg-[#16a34a] text-white border-[#16a34a] shadow-lg"
                          : "bg-white text-gray-800 border-gray-300 hover:border-[#16a34a]"}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#16a34a] hover:bg-[#14532d] text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-[#16a34a]/20 transition-colors"
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-semibold transition-colors"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Icons guarantee */}
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                {[
                  { icon: FiTruck, label: "Free Delivery" },
                  { icon: FiRefreshCw, label: "Easy Returns" },
                  { icon: FiShield, label: "Secure Payment" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                    <item.icon className="w-5 h-5 mx-auto text-[#16a34a] mb-1" />
                    <p className="text-xs text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Accordion Sections */}
              <div className="border-t border-gray-200 pt-4">
                {[
                  { key: "features", title: "Features & Highlights", content: product.features || ["Eco-friendly fabric", "Breathable", "Premium stitching"] },
                  { key: "shipping", title: "Shipping & Returns", content: ["Free shipping over ₹1000", "7-day easy returns", "Secure packaging"] },
                  { key: "reviews", title: "Customer Reviews", content: product.reviews || [] },
                ].map((section) => (
                  <div key={section.key} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() =>
                        setActiveAccordion(activeAccordion === section.key ? null : section.key)
                      }
                      className="flex items-center justify-between w-full py-4 text-left text-gray-700 font-medium"
                    >
                      <span>{section.title}</span>
                      <motion.span
                        animate={{ rotate: activeAccordion === section.key ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="w-5 h-5" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeAccordion === section.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-4 text-sm text-gray-600">
                            {section.key === "reviews" ? (
                              section.content.length > 0 ? (
                                section.content.map((rev, idx) => (
                                  <div key={idx} className="flex gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                      {rev.name?.charAt(0) || "U"}
                                    </div>
                                    <div>
                                      <p className="font-medium">{rev.name}</p>
                                      <div className="flex text-yellow-400 text-xs">
                                        {Array.from({ length: rev.stars || 5 }).map((_, i) => (
                                          <FiStar key={i} className="fill-current" />
                                        ))}
                                      </div>
                                      <p className="mt-1">{rev.text}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p>No reviews yet. Be the first to review!</p>
                              )
                            ) : (
                              <ul className="list-disc pl-5 space-y-1">
                                {Array.isArray(section.content)
                                  ? section.content.map((item, idx) => <li key={idx}>{item}</li>)
                                  : section.content}
                              </ul>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
