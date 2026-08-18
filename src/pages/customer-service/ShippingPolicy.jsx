import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Truck, Clock, Globe, Package } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const items = [
  {
    icon: Truck,
    title: "Free Shipping",
    text: "We offer free standard shipping on all orders over ₹1000 across India.",
  },
  {
    icon: Clock,
    title: "Delivery Time",
    text: "Orders are typically delivered within 5‑7 business days. Remote areas may take slightly longer.",
  },
  {
    icon: Package,
    title: "Order Tracking",
    text: "Once your order is dispatched, you’ll receive a tracking link via email and SMS.",
  },
  {
    icon: Globe,
    title: "Eco‑friendly Logistics",
    text: "We partner with carbon‑neutral courier services and use plastic‑free packaging for every shipment.",
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

const ShippingPolicy = () => (
  <>
    <Helmet>
      <title>Shipping Policy – EcoWear</title>
      <meta
        name="description"
        content="Free shipping over ₹1000, delivery within 5‑7 days, and eco‑friendly logistics. Read EcoWear's shipping policy."
      />
    </Helmet>
    <PageWrapper title="Shipping Policy">
      <div className="grid gap-6">
        {items.map((item, idx) => (
          <Card key={idx} {...item} index={idx} />
        ))}
      </div>
    </PageWrapper>
  </>
);

export default ShippingPolicy;
