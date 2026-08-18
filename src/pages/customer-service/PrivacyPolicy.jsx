import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Database, Lock } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const policyItems = [
  {
    icon: Database,
    title: "Information We Collect",
    text: "Name, email, phone number, and shipping address.",
  },
  {
    icon: ShieldCheck,
    title: "How We Use Your Data",
    text: "Used strictly for order fulfillment and customer support.",
  },
  {
    icon: Lock,
    title: "Data Security",
    text: "We use SSL encryption and secure servers to protect your data.",
  },
];

const PolicyCard = ({ icon: Icon, title, text, index }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0,0,0,0.1)" }}
    className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#16a34a]/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#16a34a]" />
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </motion.div>
);

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy – EcoWear</title>
        <meta
          name="description"
          content="EcoWear's privacy policy explains how we collect, use, and protect your personal information."
        />
      </Helmet>

      <PageWrapper title="Privacy Policy">
        <div className="grid gap-6">
          {policyItems.map((item, index) => (
            <PolicyCard
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
              index={index}
            />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default PrivacyPolicy;
