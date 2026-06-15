import { useNavigate } from "react-router-dom";
import { products } from "../productImagesdetails";
import ProductCard from "../pages/product";

const SubCategoryPage = ({ category, subCategory, title }) => {
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (p) => p.category === category && p.subCategory === subCategory
  );

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubCategoryPage;