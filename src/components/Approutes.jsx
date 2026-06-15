import { Route, Routes } from "react-router-dom";

import Header from "./header";
import Footer from "./Footer";
import Home from "./home";
import About from "./about";
import Shop from "./shop";
import Contact from "./contact";
import Register from "./pages/ragistrationpage";
import Login from "./pages/login";
import Cart from "./Cart/cart";
import MenPage from "./subPages/men/MenPage";
import WomenPage from "./subPages/women/WomenPage";
import KidsPage from "./subPages/kids/KidsPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import CartStep from "./pages/ProductCheckout";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";
import ProductDetails from "./pages/ProductDetails";
import KidsJacket from "./subPages/kids/KidsJacket";
import KidsShirts from "./subPages/kids/KidsShirts";
import KidsJeans from "./subPages/kids/KidsJeans";
import WomenDress from "./subPages/women/WomenDress";
import WomenTops from "./subPages/women/WomenTops";
import WomenSkirt from "./subPages/women/WomenSkirt";
import MenShirts from "./subPages/men/MenShirts";
import MenJeans from "./subPages/men/MenJeans";
import MenJacket from "./subPages/men/MenJeans";
import ShippingPolicy from "./pages/customer-service/ShippingPolicy";
import ReturnsRefunds from "./pages/customer-service/ReturnsRefunds";
import SizeGuide from "./pages/customer-service/SizeGuide";
import FAQs from "./pages/customer-service/FAQs";
import PrivacyPolicy from "./pages/customer-service/PrivacyPolicy";
import TermsConditions from "./pages/customer-service/TermsandConditons";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";


const Approute = () => {
  const location = useLocation();

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="min-h-screen"
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/All-Products" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
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
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Approute;
