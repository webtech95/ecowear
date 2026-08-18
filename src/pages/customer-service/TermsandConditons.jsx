import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { FileText, Shield, AlertTriangle, CreditCard } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const termsItems = [
  {
    icon: FileText,
    title: "General",
    text: "By accessing and placing an order with EcoWear, you confirm that you are at least 18 years old and agree to be bound by these Terms & Conditions.",
  },
  {
    icon: CreditCard,
    title: "Pricing & Payment",
    text: "All prices are listed in Indian Rupees (₹) and are inclusive of GST. We reserve the right to change prices without prior notice. Payment must be made in full before dispatch.",
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    text: "All content on this website, including logos, images, and text, is the property of EcoWear and protected by copyright laws. Unauthorised use is prohibited.",
  },
  {
    icon: AlertTriangle,
    title: "Limitation of Liability",
    text: "EcoWear shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability is limited to the purchase price of the product in question.",
  },
];

const Card = ({ icon: Icon, title, text, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -4 }}
    className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md"
  >
    <div className="flex items-center gap-4 mb-3">
      <div className="w-12 h-12 rounded-xl bg-[#16a34a]/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#16a34a]" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-600">{text}</p>
  </motion.div>
);

const TermsConditions = () => (
  <>
    <Helmet>
      <title>Terms & Conditions – EcoWear</title>
      <meta
        name="description"
        content="Read EcoWear's terms and conditions, including pricing, payment, intellectual property, and liability policies."
      />
    </Helmet>
    <PageWrapper title="Terms & Conditions">
      <div className="grid gap-6">
        {termsItems.map((item, idx) => (
          <Card key={idx} {...item} index={idx} />
        ))}
      </div>
    </PageWrapper>
  </>
);

export default TermsConditions;
