import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../../productImagesdetails";
import ProductCard from "../../pages/product";

const KidsPage = () => {
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState("all");

  const kidsProducts = products.filter(
    (p) =>
      p.category === "kids" &&
      (subCategory === "all" || p.subCategory === subCategory)
  );

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Kids Collection
        </h1>

        <div className="flex justify-center gap-4 mb-8">
          {["all", "shirts", "jeans", "jacket"].map((item) => (
            <button
              key={item}
              onClick={() => setSubCategory(item)}
              className={`px-4 py-2 rounded-full border
                ${subCategory === item
                  ? "bg-emerald-600 text-white"
                  : "bg-white dark:bg-gray-800"}`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {kidsProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default KidsPage;
