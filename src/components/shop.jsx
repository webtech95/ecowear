import { useParams, useNavigate } from "react-router-dom";
import { products } from "./productImagesdetails";
import ProductCard from "./pages/product";
import { motion } from "framer-motion";

const Shop = () => {
  const { category, subCategory } = useParams();
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => {
    if (category && product.category !== category) return false;
    if (subCategory && product.subCategory !== subCategory) return false;
    return true;
  });

  return (




    <div className="min-h-screen bg-neutral-50 dark:bg-gray-900">
      <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 capitalize">
          {category || "All"} Collection
        </h1>

        <div
          className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-4
        sm:gap-5
        lg:gap-6
        justify-items-center
      "
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-sm sm:text-base">
              No products found
            </p>
          )}
        </div>

      </section>
    </div>

  );
};

export default Shop;
