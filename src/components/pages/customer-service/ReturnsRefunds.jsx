import PageWrapper from "../../PageWrapper";
import { RefreshCcw, CheckCircle, Wallet } from "lucide-react";

const ReturnsRefunds = () => {
  return (
    <PageWrapper title="Returns & Refunds">

      <div className="grid gap-6">
        <Card icon={CheckCircle} title="Return Eligibility">
          <ul className="list-disc pl-6 space-y-1">
            <li>Return within 7 days of delivery</li>
            <li>Product must be unused and in original condition</li>
          </ul>
        </Card>

        <Card icon={RefreshCcw} title="Return Process">
          Login → My Orders → Select Product → Request Return
        </Card>

        <Card icon={Wallet} title="Refund Timeline">
          Refunds are processed within <strong>5–7 business days</strong>
          after inspection.
        </Card>
      </div>

    </PageWrapper>
  );
};

const Card = ({ icon: Icon, title, children }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="text-blue-400" />
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    <p>{children}</p>
  </div>
);

export default ReturnsRefunds;
