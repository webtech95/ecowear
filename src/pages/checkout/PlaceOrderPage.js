import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Check,
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

/* ---- Animation variants ---- */
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const PlaceOrderPage = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample data (used as fallback)
  const orderDetails = {
    shipping: {
      name: "John Smith",
      address: "123 Main Street",
      city: "New York, NY 10001",
    },
    payment: {
      method: "Credit Card",
      lastFour: "4532",
      cardType: "Visa",
    },
    shippingMethod: "Priority Shipping (3-5 days)",
    items: [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 129.99,
        quantity: 1,
        image: "🎧",
      },
      {
        id: 2,
        name: "Smart Watch Series 5",
        price: 299.99,
        quantity: 1,
        image: "⌚",
      },
      {
        id: 3,
        name: "USB-C Fast Charger",
        price: 24.99,
        quantity: 2,
        image: "🔌",
      },
    ],
  };

  // Load actual cart from localStorage (fallback to sample data)
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed.length > 0 ? parsed : orderDetails.items);
      } catch {
        setCartItems(orderDetails.items);
      }
    } else {
      setCartItems(orderDetails.items);
    }
  }, [orderDetails.items]);



  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderPlaced(true);
  };

  // ------- Confetti on success -------
  useEffect(() => {
    if (orderPlaced) {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ["#16a34a", "#22c55e", "#14532d", "#ffffff"];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [orderPlaced]);

  // Success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white flex items-center justify-center p-4 font-poppins">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-3xl p-8 sm:p-10 shadow-2xl max-w-lg w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-[#16a34a]/10 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-[#16a34a]" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-500 mb-4">Thank you for your purchase!</p>
          <p className="text-lg font-semibold text-[#16a34a] mb-6">
            Order #ECO-{Math.floor(Math.random() * 10000)}
          </p>

          <div className="bg-white/50 rounded-xl p-5 mb-6 text-left space-y-2">
            <div className="flex items-center text-[#16a34a]">
              <Check className="w-4 h-4 mr-2" />
              Payment processed successfully
            </div>
            <div className="flex items-center text-[#22c55e]">
              <span className="mr-2">📧</span> Confirmation email sent
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-2">📦</span> Estimated delivery: 3-5 business days
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOrderPlaced(false)}
            className="w-full bg-[#16a34a] hover:bg-[#14532d] text-white py-4 rounded-xl font-semibold shadow-lg transition-colors mb-3"
          >
            Continue Shopping
          </motion.button>
          <button className="w-full text-gray-500 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors">
            Track Your Order
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10"
        >
          <div className="flex items-center">
            <ArrowLeft className="w-6 h-6 text-gray-400 mr-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Review Your Order
              </h1>
              <p className="text-gray-500 mt-1">
                Please review your order details before confirming
              </p>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <p className="text-sm text-gray-400">Step 4 of 4</p>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                className="h-full bg-[#16a34a] rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Shipping Address */}
            <motion.div
              variants={itemVariant}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-[#16a34a]" />
                  Shipping Address
                </h2>
                <button className="text-[#16a34a] hover:text-[#14532d] font-medium text-sm flex items-center">
                  Edit
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-900">{orderDetails.shipping.name}</p>
                <p className="text-gray-600">{orderDetails.shipping.address}</p>
                <p className="text-gray-600">{orderDetails.shipping.city}</p>
              </div>
            </motion.div>

            {/* Shipping Method */}
            <motion.div
              variants={itemVariant}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Truck className="w-5 h-5 mr-3 text-[#22c55e]" />
                  Shipping Method
                </h2>
                <button className="text-[#16a34a] hover:text-[#14532d] font-medium text-sm flex items-center">
                  Change
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="font-semibold text-gray-900">{orderDetails.shippingMethod}</p>
                <p className="text-sm text-gray-500">Delivered by carrier</p>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              variants={itemVariant}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-[#16a34a]" />
                  Payment Method
                </h2>
                <button className="text-[#16a34a] hover:text-[#14532d] font-medium text-sm flex items-center">
                  Change
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                <div className="w-12 h-8 bg-[#16a34a] rounded text-white text-xs font-bold flex items-center justify-center mr-3">
                  VISA
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    •••• •••• •••• {orderDetails.payment.lastFour}
                  </p>
                  <p className="text-sm text-gray-500">Expires 12/27</p>
                </div>
              </div>
            </motion.div>

            {/* Order Items */}
            <motion.div
              variants={itemVariant}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-3 text-[#22c55e]" />
                Order Items ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)
              </h2>
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="text-3xl">{item.image || "🛍️"}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-400">
                          ₹{item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 text-gray-600">
                <div className="flex justify-between">
                  <span>
                    Subtotal ({cartItems.reduce((sum, i) => sum + i.quantity, 0)} items)
                  </span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6 p-3 bg-[#16a34a]/10 rounded-xl">
                <Shield className="w-5 h-5 text-[#16a34a] mr-2" />
                <span className="text-sm text-[#14532d] font-medium">
                  Secure SSL Encryption
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                  ${isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#16a34a] hover:bg-[#14532d]"
                  } text-white`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing...
                  </div>
                ) : (
                  `Place Order - ₹${total.toFixed(2)}`
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-400 mb-2">
                  By placing your order, you agree to our{" "}
                  <span className="text-[#16a34a] cursor-pointer">Terms</span> and{" "}
                  <span className="text-[#16a34a] cursor-pointer">Privacy Policy</span>
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-300">
                  <span>30-day returns</span>
                  <span>•</span>
                  <span>Free exchanges</span>
                  <span>•</span>
                  <span>24/7 support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
