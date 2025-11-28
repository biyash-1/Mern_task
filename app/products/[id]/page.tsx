"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/app/store/useCart";
import toast from "react-hot-toast";
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductPage = () => {
  const params = useParams();
  const { id } = params;
  const {addToCart} = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading)
    return <p className="p-6 text-center text-gray-700">Loading...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;
  if (!product)
    return <p className="p-6 text-center text-gray-700">Product not found</p>;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleAddToCart = () => {
    addToCart ({
      id:product.id,
      title:product.title,
      price:product.price,
      quantity:quantity,
      image:product.image,
    })
    toast.success("Product added to cart");
  }

  return (
    <div className="h-screen dark:bg-gray-900">

    <div className="max-w-4xl mx-auto py-20  rounded-xl dark:text-slate-200 ">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-[400px] object-cover rounded"
        />

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <p className=" mb-6">
              {truncateText(product.description, 150)}
            </p>

       
            <div className="mb-4">
              <h2 className="font-medium  mb-2">Size</h2>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    className="px-3 py-1 text-black border rounded-md text-sm font-medium bg-white  border-gray-300 hover:border-green-700 transition"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

         
            <div className="mb-6">
              <h2 className="font-medium dark:text-slate-200 mb-2">Color</h2>
              <div className="flex gap-2">
                {["Red", "Blue", "Green", "Black"].map((color) => (
                  <button
                    key={color}
                    className="px-3 py-1 border rounded-md text-sm font-medium  border-gray-300 hover:border-green-700 transition"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

      
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-700">
              ₹ {product.price}
            </span>
            <div className="quantity-selector flex items-center gap-2">
              <p className="font-medium">Qty:</p>
              <button
                className="bg-red-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-red-600 transition"
                onClick={decrementQuantity}
              >
                -
              </button>
              <input
                type="text"
                className="w-12 text-center border border-gray-300 rounded px-2 py-1"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button
                className="bg-green-500 px-3 py-1 rounded-full text-white cursor-pointer hover:bg-green-600 transition"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <button onClick={handleAddToCart} className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPage;