import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../productImagesdetails";
import { useCart } from "../Cart/cartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  const [selectedImg, setSelectedImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const colorOptions = ["#000000", "#2563eb", "#ef4444", "#10b981", "#facc15"];

  useEffect(() => {
    const prod = products.find((p) => p.id === parseInt(id));
    if (prod) {
      setProduct(prod);
      setSelectedImg(prod.images[0]);
      setSelectedColor(colorOptions[0]);
    }
  }, [id, colorOptions]);

  if (!product)
    return <p className="text-center mt-20 text-gray-500">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

      {/* LEFT: IMAGE GALLERY */}
      <div>
        <img
          src={selectedImg}
          alt={product.name}
          className="w-full rounded-3xl shadow-lg mb-4 object-cover"
          style={{ height: "400px" }}
        />

        {/* Thumbnails */}
        <div className="flex gap-3 flex-wrap mt-4">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} thumbnail ${i + 1}`}
              onClick={() => setSelectedImg(img)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl cursor-pointer border-2 object-cover transition
        ${selectedImg === img ? "border-primary scale-105" : "border-gray-300"}`}
              loading="lazy"
            />
          ))}
        </div>

      </div>

      {/* RIGHT: PRODUCT DETAILS */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">₹{product.price}</p>
          <p className="mt-1 flex items-center gap-2 line-through">₹{product.oldprice}</p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Product highlights */}
          <ul className="mt-6 space-y-2 text-gray-700">
            <li>✔ Eco-friendly & skin-safe fabric</li>
            <li>✔ Breathable and lightweight</li>
            <li>✔ Premium stitching guarantee</li>
            <li>✔ Perfect for daily wear</li>
          </ul>

          {/* Colors */}
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-800 mb-2">Choose Color</p>
            <div className="flex gap-3 flex-wrap">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer transition
                    ${selectedColor === color ? "border-primary scale-110" : "border-gray-300"}`}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-800 mb-2">Select Size</p>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 sm:px-5 py-2 border rounded-lg text-sm sm:text-base font-medium transition
                    ${selectedSize === size ? "bg-primary text-white border-primary" : "bg-gray-100 text-gray-800 border-gray-300"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Info Section */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-xl bg-gray-50 text-center">🚚 Free Delivery</div>
            <div className="p-4 border rounded-xl bg-gray-50 text-center">🔄 7-Day Easy Returns</div>
            <div className="p-4 border rounded-xl bg-gray-50 text-center">💳 Cash on Delivery</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              if (!selectedSize || !selectedColor) {
                toast.error("Please select size and color");
                return;
              }

              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: selectedImg,
                selectedSize,
                selectedColor,
              });

              toast.success("Added to Cart");
            }}
            className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-black transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => {
              if (!selectedSize || !selectedColor) {
                toast.error("Please select size and color");
                return;
              }

              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: selectedImg,
                selectedSize,
                selectedColor,
              });

              // navigate("/CartStep"); // uncomment if checkout page exists
            }}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Buy Now
          </button>
        </div>

        <div className="mt-6 text-gray-500 text-sm">
          <Link to="/All-Products" className="underline hover:text-primary">
            ← Back to products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
