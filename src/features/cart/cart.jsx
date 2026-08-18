import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.2 } },
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const totalAmount = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handleBuyNow = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/CartStep");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Your Shopping Cart
          </h1>
          <p className="mt-2 text-gray-500">
            {cart.length} {cart.length === 1 ? "item" : "items"} in your bag
          </p>
        </motion.div>

        {cart.length === 0 ? (
          /* ----- Empty Cart State ----- */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-28 h-28 rounded-full bg-[#16a34a]/10 flex items-center justify-center mb-6">
              <FiShoppingBag className="w-12 h-12 text-[#16a34a]" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you haven’t added anything yet. Discover our sustainable collection.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/All-Products")}
              className="px-8 py-3 bg-[#16a34a] text-white rounded-full font-medium shadow-lg shadow-[#16a34a]/20 hover:bg-[#14532d] transition-colors"
            >
              Continue Shopping
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ----- Cart Items List ----- */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full">
                      <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
                      <p className="text-[#16a34a] font-bold mt-1">
                        ₹{item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                        <span>
                          Size: <strong>{item.selectedSize}</strong>
                        </span>
                        <span className="flex items-center gap-1.5">
                          Color:
                          <span
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                          <span className="capitalize">{item.selectedColor}</span>
                        </span>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity - 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <FiMinus />
                          </motion.button>
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            className="w-10 text-center font-medium"
                          >
                            {item.quantity}
                          </motion.span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1
                              )
                            }
                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <FiPlus />
                          </motion.button>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                          className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ----- Order Summary (Sticky) ----- */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-24 bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate pr-2">{item.name}</span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <motion.span
                    key={totalAmount}
                    initial={{ scale: 1.2, color: "#16a34a" }}
                    animate={{ scale: 1, color: "#000" }}
                    transition={{ duration: 0.2 }}
                  >
                    ₹{totalAmount}
                  </motion.span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white py-3.5 rounded-full font-semibold transition-colors shadow-lg shadow-[#16a34a]/20"
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>

                <button
                  onClick={() => navigate("/All-Products")}
                  className="mt-3 w-full text-center text-sm text-gray-500 hover:text-[#16a34a] transition-colors"
                >
                  Continue Shopping
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
