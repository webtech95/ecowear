import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { HelpCircle, ChevronDown } from "lucide-react";
import PageWrapper from "../../components/layout/PageWrapper";

const faqList = [
  {
    q: "Can I cancel my order?",
    a: "Yes, orders can be cancelled before they are dispatched.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, debit/credit cards, net banking, and COD.",
  },
  {
    q: "How do I track my order?",
    a: "Tracking details are sent once the order is shipped.",
  },
  {
    q: "What is the return window?",
    a: "You can return eligible products within 7 days.",
  },
];

const FAQItem = ({ q, a, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-start gap-4 p-6 text-left focus:outline-none"
      aria-expanded={isOpen}
    >
      <HelpCircle className="w-6 h-6 text-[#16a34a] flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{q}</h3>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-gray-400 flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="px-6 pb-6 text-gray-600 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions – EcoWear</title>
        <meta
          name="description"
          content="Find answers to common questions about ordering, payments, shipping, and returns at EcoWear."
        />
      </Helmet>

      <PageWrapper title="Frequently Asked Questions">
        <div className="grid gap-4">
          {faqList.map((faq, index) => (
            <FAQItem
              key={index}
              q={faq.q}
              a={faq.a}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </PageWrapper>
    </>
  );
};

export default FAQs;
