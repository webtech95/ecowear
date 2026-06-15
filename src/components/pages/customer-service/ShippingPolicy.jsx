import PageWrapper from "../../PageWrapper";
import { Truck, Clock, MapPin, PackageCheck, AlertCircle } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <PageWrapper 
      title="Shipping Policy"
      subtitle="Everything you need to know about delivery timelines, charges, and order tracking at EcoWear."
    >
      <Section
        icon={MapPin}
        title="Shipping Coverage"
        text="EcoWear currently delivers across India, covering metro cities, tier-2 towns, and most serviceable pin codes. We continuously expand our delivery network to reach more locations."
      />

      <Section
        icon={Clock}
        title="Order Processing Time"
        text="All orders are processed within 1–2 business days after payment confirmation. Orders placed on weekends or public holidays are processed on the next working day."
      />

      <Section icon={Truck} title="Estimated Delivery Timeline">
        <ul className="list-disc pl-6 space-y-1">
          <li>Metro cities: 3–5 business days</li>
          <li>Non-metro cities: 5–7 business days</li>
          <li>Remote locations: May take additional time</li>
        </ul>
      </Section>

      <Section
        icon={PackageCheck}
        title="Order Tracking"
        text="Once your order is dispatched, you will receive tracking details via email and SMS. You can also track your order through your EcoWear account dashboard."
      />

      <Section
        icon={AlertCircle}
        title="Shipping Delays"
        text="While we strive for timely delivery, delays may occur due to weather conditions, courier disruptions, or unforeseen circumstances. We appreciate your patience in such cases."
      />
    </PageWrapper>
  );
};

const Section = ({ icon: Icon, title, text, children }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="text-blue-400" />
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
    {text && <p className="leading-relaxed">{text}</p>}
    {children}
  </div>
);

export default ShippingPolicy;
