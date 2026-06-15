import PageWrapper from "../../PageWrapper";
import { ShieldCheck, Database, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageWrapper title="Privacy Policy">

      <div className="grid gap-6">
        <Card icon={Database} title="Information We Collect">
          Name, email, phone number, and shipping address.
        </Card>

        <Card icon={ShieldCheck} title="How We Use Your Data">
          Used strictly for order fulfillment and customer support.
        </Card>

        <Card icon={Lock} title="Data Security">
          We use SSL encryption and secure servers to protect your data.
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

export default PrivacyPolicy;
