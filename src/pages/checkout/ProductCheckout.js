import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShoppingCart,
  FiTruck,
  FiCreditCard,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiTrash2,
} from "react-icons/fi";

/* ---- Step transition variants ---- */
const stepVariants = {
  enter: { opacity: 0, x: 50, scale: 0.98 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -50, scale: 0.98 },
};

const steps = ["cart", "shipping", "payment", "review"];

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [activeStep, setActiveStep] = useState("cart");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    const options = {
      key: "rzp_test_Rp1PhFaj1gFQcP",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "EcoWear Store",
      description: "Order Payment",
      handler: function (response) {
        localStorage.removeItem("cart");
        navigate("/order-confirmation", {
          state: {
            paymentId: response.razorpay_payment_id,
            total,
          },
        });
      },
      prefill: {
        name: shippingInfo.name,
        email: shippingInfo.email,
        contact: shippingInfo.phone,
      },
      theme: { color: "#16a34a" },
    };

    new window.Razorpay(options).open();
  };

  // Derived step index for progress bar
  const currentStepIndex = steps.indexOf(activeStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="mt-2 text-gray-500">Complete your eco‑friendly purchase</p>
        </motion.div>

        {/* Progress Steps (Visual) */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex justify-between items-center">
            {steps.map((step, idx) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: idx === currentStepIndex ? 1.1 : 1,
                      backgroundColor:
                        idx <= currentStepIndex ? "#16a34a" : "#E5E7EB",
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow"
                  >
                    {idx < currentStepIndex ? (
                      <FiCheckCircle className="w-5 h-5" />
                    ) : (
                      idx + 1
                    )}
                  </motion.div>
                  <span className="absolute -bottom-6 w-max text-xs font-medium text-gray-500 capitalize">
                    {step}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200 overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: idx < currentStepIndex ? "100%" : "0%" }}
                      className="h-full bg-[#16a34a] rounded-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content (Steps) */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 sm:p-8"
              >
                {/* Cart Step */}
                {activeStep === "cart" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FiShoppingCart className="text-[#16a34a]" /> Your Cart
                    </h2>
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        Your cart is empty
                      </p>
                    ) : (
                      <div className="space-y-6">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col sm:flex-row items-start gap-4 p-4 bg-gray-50 rounded-xl"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {item.selectedSize}
                              </p>
                              <p className="font-bold text-[#16a34a]">
                                ₹{item.price}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 mt-2 sm:mt-0">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600 ml-2"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={cartItems.length === 0}
                        onClick={() => setActiveStep("shipping")}
                        className="w-full flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white py-3.5 rounded-xl font-semibold transition-colors disabled:opacity-50 shadow-lg"
                      >
                        Proceed to Shipping
                        <FiArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Shipping Step */}
                {activeStep === "shipping" && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setActiveStep("payment");
                    }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FiTruck className="text-[#16a34a]" /> Shipping Information
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", name: "name", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Address", name: "address", type: "text", fullWidth: true },
                        { label: "City", name: "city", type: "text" },
                        { label: "Zip Code", name: "postalCode", type: "text" },
                        { label: "Country", name: "country", type: "text" },
                        { label: "Phone Number", name: "phone", type: "tel", fullWidth: true },
                      ].map((field) => (
                        <div
                          key={field.name}
                          className={`relative ${field.fullWidth ? "sm:col-span-2" : ""}`}
                        >
                          <input
                            type={field.type}
                            name={field.name}
                            value={shippingInfo[field.name]}
                            onChange={handleChange}
                            required
                            placeholder=" "
                            className="peer w-full px-4 pt-5 pb-2 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a] transition-all"
                          />
                          <label className="absolute left-4 top-4 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#16a34a] peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs">
                            {field.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setActiveStep("cart")}
                        className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
                      >
                        Continue <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </form>
                )}

                {/* Payment Step */}
                {activeStep === "payment" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FiCreditCard className="text-[#16a34a]" /> Payment Method
                    </h2>
                    <div className="space-y-4">
                      {[
                        { value: "debit-card", label: "Debit Card", disabled: true },
                        { value: "upi", label: "UPI", disabled: true },
                        { value: "razorpay", label: "Razorpay (UPI / Card / NetBanking)", disabled: false },
                      ].map((method) => (
                        <label
                          key={method.value}
                          className={`flex items-center gap-3 p-4 border rounded-xl transition-all cursor-pointer
                            ${paymentMethod === method.value ? "border-[#16a34a] bg-[#16a34a]/5" : "border-gray-200 hover:border-gray-300"}
                            ${method.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === method.value}
                            onChange={() => !method.disabled && setPaymentMethod(method.value)}
                            disabled={method.disabled}
                            className="accent-[#16a34a]"
                          />
                          <span className="font-medium">{method.label}</span>
                          {method.disabled && (
                            <span className="ml-auto text-xs text-gray-400">Coming soon</span>
                          )}
                        </label>
                      ))}
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setActiveStep("shipping")}
                        className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={paymentMethod !== "razorpay"}
                        onClick={() => setActiveStep("review")}
                        className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white px-6 py-2.5 rounded-xl font-semibold transition-colors disabled:opacity-50"
                      >
                        Review Order <FiArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Review Step */}
                {activeStep === "review" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <FiCheckCircle className="text-[#16a34a]" /> Review Your Order
                    </h2>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-medium text-gray-700 mb-1">
                          Shipping Address
                        </h3>
                        <p className="text-sm text-gray-600">
                          {shippingInfo.name}<br />
                          {shippingInfo.address}, {shippingInfo.city} - {shippingInfo.postalCode}, {shippingInfo.country}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-medium text-gray-700 mb-1">
                          Payment
                        </h3>
                        <p className="text-sm text-gray-600 capitalize">
                          {paymentMethod}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Items ({cartItems.reduce((sum, i) => sum + i.quantity, 0)})
                        </h3>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm py-2">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={() => setActiveStep("payment")}
                        className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FiArrowLeft className="w-4 h-4" /> Back
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handlePayment}
                        className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#14532d] text-white px-6 py-2.5 rounded-xl font-semibold transition-colors shadow-lg"
                      >
                        Place Order ₹{total.toFixed(2)}
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order Summary (sticky sidebar) */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-[#16a34a]">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
