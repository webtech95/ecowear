import { useCart } from "./cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/CartStep");
  };

  // Calculate total price
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Shopping Cart
      </h1>

      {/* Empty Cart Message */}
      {cart.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty
        </p>
      )}

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
          className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-lg shadow-md mb-6"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-40 h-40 object-cover rounded"
          />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">₹{item.price}</p>

            {/* Size & Color */}
            <div className="mt-1 text-sm text-gray-600">
              <p>
                Size:{" "}
                <span className="font-medium">{item.selectedSize}</span>
              </p>
              <p className="flex items-center gap-2">
                Color:
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{ backgroundColor: item.selectedColor }}
                ></span>
                <span className="capitalize">{item.selectedColor}</span>
              </p>
            </div>

            {/* Quantity */}
            <div className="flex items-center mt-3">
              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.selectedSize,
                    item.selectedColor,
                    item.quantity - 1
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>

              <span className="px-4 font-medium">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.selectedSize,
                    item.selectedColor,
                    item.quantity + 1
                  )
                }
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Remove */}
          <button
            onClick={() =>
              removeFromCart(
                item.id,
                item.selectedSize,
                item.selectedColor
              )
            }
            className="text-red-500 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Checkout Section */}
      {cart.length > 0 && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Cart Summary</h2>
            <p className="text-lg font-bold">
              Total: ₹{totalAmount}
            </p>
          </div>

          <button
            onClick={handleBuyNow}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
