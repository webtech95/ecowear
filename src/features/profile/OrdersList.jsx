import { FiPackage, FiEye, FiTruck, FiDownload, FiRefreshCw } from "react-icons/fi";

const mockOrders = []; // replace with real data from API

const OrdersList = () => {
  // later: fetch orders from /api/orders

  if (mockOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiPackage className="mx-auto text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Looks like you haven’t placed any orders.</p>
        <button className="px-6 py-2.5 bg-[#16a34a] text-white rounded-xl font-medium">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {mockOrders.map(order => (
        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          {/* Order header */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID: <span className="font-medium text-gray-900">{order.id}</span></p>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>{order.status}</span>
          </div>

          {/* Items */}
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 py-4 border-t border-gray-100">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="text-lg font-bold text-[#16a34a]">₹{item.price}</p>
              </div>
            </div>
          ))}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"><FiEye /> View Details</button>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"><FiTruck /> Track Order</button>
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"><FiDownload /> Invoice</button>
            {order.status === "Delivered" && (
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#16a34a] bg-green-50 rounded-xl hover:bg-green-100"><FiRefreshCw /> Buy Again</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;