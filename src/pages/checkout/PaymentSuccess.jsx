import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FiCheckCircle, FiXCircle, FiArrowLeft, FiShoppingBag } from "react-icons/fi";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [paymentId, setPaymentId] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("payment_id");
    if (id) {
      setPaymentId(id);
      setStatus("success");
      // Load order details from localStorage (set before payment)
      const savedOrder = localStorage.getItem("lastOrder");
      if (savedOrder) {
        try {
          setOrder(JSON.parse(savedOrder));
        } catch {
          // ignore
        }
      }
    } else {
      setStatus("failed");
    }
  }, [location.search]);

  // ------- Confetti on success -------
  useEffect(() => {
    if (status === "success") {
      const duration = 2000;
      const end = Date.now() + duration;
      const colors = ["#16a34a", "#22c55e", "#14532d", "#ffffff"];

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 90,
          origin: { x: 0, y: 0.6 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 90,
          origin: { x: 1, y: 0.6 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 shadow-2xl text-center"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className={`mx-auto mb-6 w-20 h-20 rounded-full flex items-center justify-center ${
            status === "success" ? "bg-[#16a34a]/10" : "bg-red-100"
          }`}
        >
          {status === "success" ? (
            <FiCheckCircle className="w-10 h-10 text-[#16a34a]" />
          ) : (
            <FiXCircle className="w-10 h-10 text-red-500" />
          )}
        </motion.div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          {status === "success" ? "Payment Successful!" : "Payment Failed"}
        </h1>
        <p className="text-gray-500 mb-6">
          {status === "success"
            ? "Your invoice has been sent to your email."
            : "No payment information found. Please try again."}
        </p>

        {/* Success Details */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/50 rounded-xl p-5 mb-6 border border-gray-100 text-left"
          >
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Payment ID</span>
              <span className="font-medium text-gray-900 break-all">{paymentId}</span>
            </div>
            {order && (
              <>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500">Items</span>
                  <span className="font-medium">{order.itemCount || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total</span>
                  <span className="font-bold text-[#16a34a]">₹{order.total || "0"}</span>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="flex-1 flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-[#16a34a]/20"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/All-Products")}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-semibold transition-colors"
          >
            <FiShoppingBag className="w-5 h-5" />
            Continue Shopping
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
