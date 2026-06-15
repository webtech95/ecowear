import { useCart } from "../Cart/cartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="p-2">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        <Link
          to={`/product/${product.id}`}
          className="block p-4"
        >
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-xl transition duration-500"
            />

            {/* Badge */}
            {/* <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
              New Arrival
            </span> */}
          </div>

          <h3 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
              ₹{product.price}
            </span>

            {product.oldprice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.oldprice}
              </span>
            )}
          </p>


        </Link>

        <button
          onClick={() => {
            addToCart({
              ...product,
              selectedSize: product.sizes?.[0] || "M",
              selectedColor: product.colors?.[0] || "black",
            });
            toast.success("Added to Cart");
          }}
          className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium
          transition-colors duration-150
          hover:bg-emerald-600
             active:scale-[0.98]"        >
          <motion.button>

            Add to Cart
          </motion.button>
        </button>


      </div>
    </div >

  );
};

export default ProductCard;
