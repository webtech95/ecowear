import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const id = query.get("payment_id");
    if (id) {
      setPaymentId(id);
      setStatus("success");
    } else {
      setStatus("failed");
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-xl p-6 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">
          {status === "success" ? "Payment Successful ✔" : "Payment Failed ❌"}
        </h2>
        {status === "success" && (
          <>
            <p className="mb-2">Payment ID: {paymentId}</p>
            <p className="text-green-600 font-semibold">
              Invoice has been sent to your email!
            </p>
          </>
        )}
        {status === "failed" && <p className="text-red-600 font-semibold">No payment info found.</p>}
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
