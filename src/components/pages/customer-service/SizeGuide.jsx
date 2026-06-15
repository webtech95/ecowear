import PageWrapper from "../../PageWrapper";
import { Ruler, Shirt, HelpCircle } from "lucide-react";

const SizeGuide = () => {
  return (
    <PageWrapper title="Size Guide">

      <div className="grid gap-6">
        <Card icon={Ruler} title="How to Measure">
          <ul className="list-disc pl-6 space-y-1">
            <li>Chest: Measure the fullest part</li>
            <li>Waist: Measure natural waistline</li>
            <li>Hips: Measure widest area</li>
          </ul>
        </Card>

        <Card icon={Shirt} title="Available Sizes">
          XS to XXL sizes with accurate product-specific charts.
        </Card>

        <Card icon={HelpCircle} title="Need Help?">
          Contact our support team for personalized size guidance.
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

export default SizeGuide;
