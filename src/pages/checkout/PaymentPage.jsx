import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiShield } from "react-icons/fi";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // ------- Load cart and calculate total -------
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    const total = savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setAmount(total);
  }, []);

  // ------- Razorpay Integration -------
  const loadRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded.");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create order on backend
      const res = await axios.post(`${API_URL}/payment/create-order`, { amount });
      const orderData = res.data.order;

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_Rp1PhFaj1gFQcP", // Your Razorpay test key
        amount: orderData.amount,
        currency: "INR",
        order_id: orderData.id,
        name: "EcoWear Store",
        description: "Thank you for your purchase!",
        prefill: {
          name: "Afzal Qureshi",
          email: "webtechhub95@gmail.com",
          contact: "8882342032",
        },
        theme: { color: "#16a34a" }, // updated to primary green
        modal: {
          ondismiss: function () {
            setLoading(false); // user closed modal
          },
        },
        handler: async function (response) {
          // 3️⃣ Verify payment & send invoice
          try {
            await axios.post(`${API_URL}/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user: {
                name: "Afzal Qureshi",
                email: "webtechhub95@gmail.com",
              },
            });

            // Navigate to success page
            navigate(`/payment-success?payment_id=${response.razorpay_payment_id}`);
          } catch (err) {
            console.error(err);
            alert("Payment verified, but failed to send invoice!");
            setLoading(false);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating order.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center px-4 font-poppins">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/5">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
            Complete Your Payment
          </h2>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 rounded-xl p-4 mb-6 border border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-3">Order Summary</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate mr-2">{item.name} x{item.quantity}</span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#16a34a]">₹{amount}</span>
              </div>
            </motion.div>
          )}

          {/* Security info */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <FiShield className="text-[#16a34a]" />
            <span>Secure & encrypted payment</span>
          </div>

          {/* Pay button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadRazorpay}
            disabled={loading || amount <= 0}
            className="w-full flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-[#16a34a]/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FiLock className="w-5 h-5" />
                Pay ₹{amount} with Razorpay
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
