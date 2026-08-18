import { useCart } from "../cart/cartContext";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const CartSection = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <FiShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold">Your cart is empty</h3>
        <Link to="/All-Products" className="mt-4 inline-block px-6 py-2 bg-[#16a34a] text-white rounded-xl">Start Shopping</Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
            <div className="flex-1">
              <h4 className="font-semibold">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.selectedSize}</p>
              <p className="font-bold">₹{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)} className="w-8 h-8 rounded-full border">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)} className="w-8 h-8 rounded-full border">+</button>
              </div>
            </div>
            <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-red-500"><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{total}</p>
        <Link to="/cart" className="px-6 py-2 bg-[#16a34a] text-white rounded-xl">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CartSection;
