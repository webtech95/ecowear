import { FiMapPin, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const mockAddresses = []; // replace with API data

const AddressesSection = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">Saved Addresses</h3>
      <button className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] text-white rounded-xl text-sm font-medium">
        <FiPlus /> Add Address
      </button>
    </div>
    {mockAddresses.length === 0 ? (
      <div className="text-center py-12">
        <FiMapPin className="mx-auto text-6xl text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">No saved addresses</p>
        <button className="px-6 py-2 bg-[#16a34a] text-white rounded-xl">Add New Address</button>
      </div>
    ) : (
      <div className="space-y-4">
        {mockAddresses.map(addr => (
          <div key={addr.id} className="flex items-start justify-between bg-gray-50 rounded-xl p-4">
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p className="text-sm text-gray-500">{addr.street}, {addr.city}, {addr.pincode}</p>
              <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
              {addr.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 inline-block">Default</span>}
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg"><FiEdit2 /></button>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default AddressesSection;