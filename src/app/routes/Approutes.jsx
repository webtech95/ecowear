import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Header from "../../components/layout/header";
import Footer from "../../components/layout/Footer";

/* ---------- Lazy‑loaded page components ---------- */
const Home = lazy(() => import("../../pages/home"));
const About = lazy(() => import("../../pages/about"));
const Shop = lazy(() => import("../../pages/shop"));
const Contact = lazy(() => import("../../pages/contact"));
const Cart = lazy(() => import("../../features/cart/cart"));
const MenPage = lazy(() => import("../../pages/catalog/categories/men/MenPage"));
const WomenPage = lazy(() => import("../../pages/catalog/categories/women/WomenPage"));
const KidsPage = lazy(() => import("../../pages/catalog/categories/kids/KidsPage"));
const OrderConfirmation = lazy(() => import("../../pages/checkout/OrderConfirmation"));
const CartStep = lazy(() => import("../../pages/checkout/ProductCheckout"));
const PlaceOrderPage = lazy(() => import("../../pages/checkout/PlaceOrderPage"));
const PaymentPage = lazy(() => import("../../pages/checkout/PaymentPage"));
const PaymentSuccess = lazy(() => import("../../pages/checkout/PaymentSuccess"));
const ProductDetails = lazy(() => import("../../pages/catalog/ProductDetails"));
const ProfileDashboard = lazy(() => import("../../features/profile/ProfileDashboard"));
const KidsJacket = lazy(() => import("../../pages/catalog/categories/kids/KidsJacket"));
const KidsShirts = lazy(() => import("../../pages/catalog/categories/kids/KidsShirts"));
const KidsJeans = lazy(() => import("../../pages/catalog/categories/kids/KidsJeans"));
const WomenDress = lazy(() => import("../../pages/catalog/categories/women/WomenDress"));
const WomenTops = lazy(() => import("../../pages/catalog/categories/women/WomenTops"));
const WomenSkirt = lazy(() => import("../../pages/catalog/categories/women/WomenSkirt"));
const MenShirts = lazy(() => import("../../pages/catalog/categories/men/MenShirts"));
const MenJeans = lazy(() => import("../../pages/catalog/categories/men/MenJeans"));
const MenJacket = lazy(() => import("../../pages/catalog/categories/men/MenJacket"));
const ShippingPolicy = lazy(() => import("../../pages/customer-service/ShippingPolicy"));
const ReturnsRefunds = lazy(() => import("../../pages/customer-service/ReturnsRefunds"));
const SizeGuide = lazy(() => import("../../pages/customer-service/SizeGuide"));
const FAQs = lazy(() => import("../../pages/customer-service/FAQs"));
const PrivacyPolicy = lazy(() => import("../../pages/customer-service/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../../pages/customer-service/TermsandConditons"));

/* ---------- Shimmer skeleton (replaces "Loading...") ---------- */
const PageSkeleton = () => (
  <div className="w-full min-h-screen p-8 animate-pulse space-y-6">
    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
    <div className="h-64 bg-gray-200 rounded" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-40 bg-gray-200 rounded" />
      ))}
    </div>
  </div>
);

/* ---------- Scroll to top on route change ---------- */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

/* ---------- Page transition variants (refined) ---------- */
const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -12 },
};

const Approute = () => {
  const location = useLocation();

  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1"
        >
          <Suspense fallback={<PageSkeleton />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/All-Products" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" element={<ProfileDashboard />} />
              <Route path="/men" element={<MenPage />} />
              <Route path="/women" element={<WomenPage />} />
              <Route path="/kids" element={<KidsPage />} />
              <Route path="/CartStep" element={<CartStep />} />
              <Route path="/place-order" element={<PlaceOrderPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />

              {/* MEN */}
              <Route path="/men/shirts" element={<MenShirts />} />
              <Route path="/men/jeans" element={<MenJeans />} />
              <Route path="/men/jacket" element={<MenJacket />} />

              {/* KIDS */}
              <Route path="/kids/jacket" element={<KidsJacket />} />
              <Route path="/kids/shirts" element={<KidsShirts />} />
              <Route path="/kids/jeans" element={<KidsJeans />} />

              {/* WOMEN */}
              <Route path="/women/dress" element={<WomenDress />} />
              <Route path="/women/tops" element={<WomenTops />} />
              <Route path="/women/skirt" element={<WomenSkirt />} />

              {/* CUSTOMER SERVICE */}
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/returns" element={<ReturnsRefunds />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Approute;
