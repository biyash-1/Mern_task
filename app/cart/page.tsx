"use client";
import { useCart } from "@/app/store/useCart"; 
import Link from "next/link";
const CartPage = () => {
  const {
    items,
    removeFromCart,
    clearCart,
    totalPrice,
    totalQuantity,
    addToCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h1>
        <p className="text-gray-600">Add some products to get started.</p>
        <Link href="/products" className="mt-6 inline-block bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800">
        <button >Browse products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
    <div className="max-w-5xl mx-auto py-12 px-4 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

    
      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-xl p-4"
          >
         
            <div className="relative w-24 h-auto flex-shrink-0">
              <img
                src={item.image}
                alt={item.title}
              
                className="object-contain"
              />
            </div>

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">₹ {item.price}</p>

            
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    addToCart({ ...item, quantity: -1 })
                  }
                  disabled={item.quantity === 1}
                  className="w-8 h-8  rounded hover:bg-gray-300  dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  −
                </button>

                <span className="w-8 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    addToCart({ ...item, quantity: 1 })
                  }
                  className="w-8 h-8  rounded hover:bg-gray-300 dark:hover:bg-gray-700 "
                >
                  +
                </button>
              </div>
            </div>
        

     
            <div className="text-right">
              <p className="font-semibold">
                ₹ {item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="dark:text-gray-300">
            Total Items: <strong>{totalQuantity()}</strong>
          </p>
          <p className="text-xl font-bold">
            Total: ₹ {totalPrice()}
          </p>
        </div>

        <div className="flex gap-4">

             <Link
    href="/products"
    className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    ← Continue Shopping
  </Link>
          <button
            onClick={clearCart}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Clear Cart
          </button>

          <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartPage;
