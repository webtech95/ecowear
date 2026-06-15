import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [activeStep, setActiveStep] = useState("cart");
  const [paymentMethod, setPaymentMethod] = useState("debit-card");
  const [selectedUPI, setSelectedUPI] = useState("");

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
      theme: { color: "#10B981" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-10">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between bg-white rounded-lg shadow p-4 text-sm font-medium">
              {["cart", "shipping", "payment", "review"].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`capitalize ${activeStep === step
                    ? "text-green-600"
                    : "text-gray-400"
                    }`}
                >
                  {step}
                </button>
              ))}
            </div>

            {activeStep === "cart" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold">Your Cart</h2>

                {cartItems.length === 0 && (
                  <p className="text-gray-500">Your cart is empty</p>
                )}

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.selectedSize}
                        </p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 border rounded"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  disabled={cartItems.length === 0}
                  onClick={() => setActiveStep("shipping")}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-md"
                >
                  Proceed to Shipping
                </button>
              </div>
            )}

            {/* Shipping Step */}
            {activeStep === 'shipping' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActiveStep('payment');
                }}
                className="bg-white rounded-lg shadow p-6"
              >

                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingInfo.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingInfo.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveStep('cart')}
                    className="px-6 py-2 border rounded-md"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}


            {activeStep === "payment" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>

                {["debit-card", "upi", "razorpay"].map((method) => {
                  const isDisabled = method !== "razorpay";

                  return (
                    <label
                      key={method}
                      className={`flex items-center gap-3 p-3 border rounded transition
            ${paymentMethod === method ? "border-green-500 bg-green-50" : ""}
            ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
          `}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        disabled={isDisabled}
                      />

                      <span className="font-medium">
                        {method === "debit-card" && "Debit Card (Disabled)"}
                        {method === "upi" && "UPI (Disabled)"}
                        {method === "razorpay" && "Razorpay (UPI / Card / NetBanking)"}
                      </span>
                    </label>
                  );
                })}

                <button
                  onClick={() => setActiveStep("review")}
                  disabled={paymentMethod !== "razorpay"}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded"
                >
                  Review Order
                </button>
              </div>
            )}


            {activeStep === 'review' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                {/* Shipping Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-1">Shipping Information</h3>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{shippingInfo.name}</p>
                    <p>{shippingInfo.address}, {shippingInfo.city} - {shippingInfo.postalCode}, {shippingInfo.country}</p>
                    <p>Email: {shippingInfo.email}</p>
                    <p>Phone: {shippingInfo.phone}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-1">Payment Method</h3>
                  <p className="text-sm text-gray-700 capitalize">
                    {paymentMethod.replace('-', ' ')}
                  </p>
                </div>

                {/* Cart Items */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Items in Cart</h3>
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between py-4 text-sm text-gray-800"
                      >
                        {/* Image and Name */}
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="font-medium">{item.name} × {item.quantity}</span>
                        </div>

                        {/* Price */}
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveStep('payment')}
                    className="px-6 py-2 border rounded-md"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-20">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
