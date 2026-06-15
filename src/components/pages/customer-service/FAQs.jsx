import PageWrapper from "../../PageWrapper";
import { HelpCircle } from "lucide-react";

const FAQs = () => {
  return (
    <PageWrapper title="Frequently Asked Questions">

      <div className="grid gap-6">
        <FAQ
          q="Can I cancel my order?"
          a="Yes, orders can be cancelled before they are dispatched."
        />
        <FAQ
          q="What payment methods do you accept?"
          a="UPI, debit/credit cards, net banking, and COD."
        />
        <FAQ
          q="How do I track my order?"
          a="Tracking details are sent once the order is shipped."
        />
        <FAQ
          q="What is the return window?"
          a="You can return eligible products within 7 days."
        />
      </div>

    </PageWrapper>
  );
};

const FAQ = ({ q, a }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex items-start gap-3">
      <HelpCircle className="text-blue-400 mt-1" />
      <div>
        <h3 className="text-white font-medium mb-1">{q}</h3>
        <p className="text-gray-300">{a}</p>
      </div>
    </div>
  </div>
);

export default FAQs;
