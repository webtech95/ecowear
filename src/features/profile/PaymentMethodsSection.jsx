import { FiCreditCard, FiPlus, FiTrash2 } from "react-icons/fi";

const mockCards = []; // replace

const PaymentMethodsSection = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">Payment Methods</h3>
      <button className="flex items-center gap-2 px-4 py-2 bg-[#16a34a] text-white rounded-xl text-sm font-medium">
        <FiPlus /> Add Card
      </button>
    </div>
    {mockCards.length === 0 ? (
      <div className="text-center py-12">
        <FiCreditCard className="mx-auto text-6xl text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">No saved payment methods</p>
        <button className="px-6 py-2 bg-[#16a34a] text-white rounded-xl">Add Card</button>
      </div>
    ) : (
      <div className="space-y-4">
        {mockCards.map(card => (
          <div key={card.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">VISA</div>
              <div>
                <p className="font-semibold">•••• {card.lastFour}</p>
                <p className="text-sm text-gray-500">Expires {card.expMonth}/{card.expYear}</p>
              </div>
            </div>
            {card.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
            <button className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><FiTrash2 /></button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PaymentMethodsSection;