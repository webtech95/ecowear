import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FiArrowRight, FiCheck, } from "react-icons/fi";
import { Leaf } from "lucide-react";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);

  // ------- Read order info from localStorage (set after payment success) -------
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch {
        // ignore
      }
    }
  }, []);

  // ------- Confetti on mount -------
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.7 },
        colors: ["#16a34a", "#22c55e", "#14532d", "#ffffff"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.7 },
        colors: ["#16a34a", "#22c55e", "#14532d", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
      >
        {/* Animated Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#16a34a]/10 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="w-12 h-12 rounded-full bg-[#16a34a] flex items-center justify-center"
          >
            <FiCheck className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 mb-6">
          Thank you for your purchase. A confirmation email has been sent to your inbox.
        </p>

        {/* Order Details (if available) */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/50 rounded-xl p-5 mb-6 border border-gray-100 text-left"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Order ID</span>
              <span className="font-medium text-gray-900">{order.id || "ECO-12345"}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500 text-sm">Items</span>
              <span className="font-medium text-gray-900">{order.itemCount || 1}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Total</span>
              <span className="font-bold text-[#16a34a]">₹{order.total || "0"}</span>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/All-Products" className="inline-block w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white px-8 py-3.5 rounded-full font-semibold transition-colors shadow-lg shadow-[#16a34a]/20"
            >
              <Leaf className="w-5 h-5" />
              Continue Shopping
              <FiArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;