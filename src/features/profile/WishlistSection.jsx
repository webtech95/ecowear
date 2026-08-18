import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";

const mockWishlist = []; // replace with real data

const WishlistSection = () => {
  if (mockWishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <FiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-6">Save items you love to your wishlist.</p>
        <button className="px-6 py-2.5 bg-[#16a34a] text-white rounded-xl font-medium">Browse Products</button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {mockWishlist.map(product => (
        <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-[#16a34a] font-bold">₹{product.price}</p>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-[#16a34a] text-white py-2 rounded-lg"><FiShoppingCart className="inline mr-1" /> Move to Cart</button>
            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FiTrash2 /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistSection;