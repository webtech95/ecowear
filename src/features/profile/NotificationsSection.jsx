import { FiBell } from "react-icons/fi";

const NotificationsSection = () => (
  <div className="text-center py-12">
    <FiBell className="mx-auto text-6xl text-gray-300 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications</h3>
    <p className="text-gray-500">We'll let you know when something important arrives.</p>
  </div>
);

export default NotificationsSection;