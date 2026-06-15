import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = savedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setAmount(total);
  }, []);

  const loadRazorpay = async () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded.");
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const res = await axios.post("http://localhost:5000/api/payment/create-order", { amount });
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
        theme: { color: "#10B981" },

        handler: async function (response) {
          // 3️⃣ Call backend to verify payment & send invoice
          try {
            await axios.post("http://localhost:5000/api/payment/verify-payment", {
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
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating order.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
      <p className="mb-6">Total Amount: ₹{amount}</p>
      <button
        onClick={loadRazorpay}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default PaymentPage;
