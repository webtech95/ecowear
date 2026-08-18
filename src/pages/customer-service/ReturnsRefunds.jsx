import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { RotateCcw, BadgeCheck, Clock, HelpCircle } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const items = [
  {
    icon: RotateCcw,
    title: "7‑Day Return Window",
    text: "You may return eligible items within 7 days of delivery. Products must be unworn, unwashed, and with original tags.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Guarantee",
    text: "If you receive a defective or incorrect item, we will arrange a free replacement or full refund.",
  },
  {
    icon: Clock,
    title: "Refund Processing",
    text: "Refunds are processed within 5‑7 business days after we receive the returned item. The amount will be credited to your original payment method.",
  },
  {
    icon: HelpCircle,
    title: "How to Initiate",
    text: "Contact our support team at support@ecowear.in with your order ID. We’ll guide you through the process.",
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

const ReturnsRefunds = () => (
  <>
    <Helmet>
      <title>Returns & Refunds – EcoWear</title>
      <meta
        name="description"
        content="Easy 7‑day returns and hassle‑free refunds. EcoWear stands behind the quality of every garment."
      />
    </Helmet>
    <PageWrapper title="Returns & Refunds">
      <div className="grid gap-6">
        {items.map((item, idx) => (
          <Card key={idx} {...item} index={idx} />
        ))}
      </div>
    </PageWrapper>
  </>
);

export default ReturnsRefunds;
