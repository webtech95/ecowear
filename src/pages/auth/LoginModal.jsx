import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPhone, FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const LoginModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState("choice");
  const [method, setMethod] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const inputRefs = useRef([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("choice");
      setMethod(null);
      setIdentifier("");
      setOtp(Array(6).fill(""));
      setLoading(false);
      setTimer(0);
    }
  }, [isOpen]);

  // Timer countdown (cleanup on unmount)
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Memoize input refs for stable focus handling
  const setInputRef = useCallback((index, el) => {
    inputRefs.current[index] = el;
  }, []);

  const handleMethodSelect = (type) => {
    setMethod(type);
    setStep("input");
  };

  // Send OTP with trimmed identifier
  const handleSendOtp = async () => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      toast.error("Please enter your email or phone number");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/auth/send-otp`, { identifier: trimmed });
      setStep("otp");
      setTimer(300);
      toast.success("OTP sent");
      // Focus first OTP input after 200ms
      setTimeout(() => inputRefs.current[0]?.focus(), 200);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto‑focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter the complete OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        identifier: identifier.trim(),
        otp: otpString,
      });
      dispatch(setCredentials({ user: res.data.data.user, token: res.data.data.token }));
      setStep("success");
      toast.success("Login successful");
      setTimeout(() => {
        onClose();
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (timer > 0 || loading) return;
    setOtp(Array(6).fill(""));
    handleSendOtp();
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  };

  // Shared button loading spinner
  const LoadingSpinner = () => (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>

            {step === "choice" && (
              <div className="space-y-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to EcoWear</h2>
                <p className="text-gray-500">Log in or create an account instantly</p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleMethodSelect("phone")}
                    className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl hover:border-green-500 font-medium"
                  >
                    <FiPhone className="text-green-600" /> Continue with Mobile
                  </button>
                  <button
                    onClick={() => handleMethodSelect("email")}
                    className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl hover:border-green-500 font-medium"
                  >
                    <FiMail className="text-green-600" /> Continue with Email
                  </button>
                </div>
              </div>
            )}

            {step === "input" && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep("choice")}
                  className="flex items-center gap-2 text-gray-500 hover:text-black"
                >
                  <FiArrowLeft /> Back
                </button>
                <h2 className="text-xl font-bold text-gray-900">
                  {method === "phone" ? "Enter your mobile number" : "Enter your email"}
                </h2>
                <input
                  type={method === "phone" ? "tel" : "email"}
                  placeholder={method === "phone" ? "+91 9876543210" : "you@example.com"}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      e.preventDefault();
                      handleSendOtp();
                    }
                  }}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-[#16a34a] text-white py-3 rounded-xl font-semibold hover:bg-[#14532d] disabled:opacity-60 flex items-center justify-center"
                >
                  {loading ? <LoadingSpinner /> : "Send OTP"}
                </button>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-6">
                <button
                  onClick={() => {
                    setStep("input");
                    setTimer(0);
                  }}
                  className="flex items-center gap-2 text-gray-500 hover:text-black"
                >
                  <FiArrowLeft /> Back
                </button>
                <h2 className="text-xl font-bold text-gray-900">Enter OTP</h2>
                <p className="text-sm text-gray-500">
                  We sent a 6‑digit code to {identifier}
                </p>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => setInputRef(idx, el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !loading) {
                          e.preventDefault();
                          handleVerifyOtp();
                        }
                      }}
                      onPaste={idx === 0 ? handlePaste : undefined}
                      className="w-12 h-14 text-center text-xl font-bold border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  ))}
                </div>

                <div className="text-center text-sm text-gray-500">
                  {timer > 0 ? (
                    `Resend OTP in ${formatTimer(timer)}`
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={loading}
                      className="text-green-600 hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full bg-[#16a34a] text-white py-3 rounded-xl font-semibold hover:bg-[#14532d] disabled:opacity-60 flex items-center justify-center"
                >
                  {loading ? <LoadingSpinner /> : "Verify OTP"}
                </button>
              </div>
            )}

            {step === "success" && (
              <div className="text-center space-y-4 py-8">
                <FiCheckCircle className="mx-auto text-green-500 w-16 h-16" />
                <h3 className="text-xl font-bold">Login Successful!</h3>
                <p className="text-gray-500">Redirecting...</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;