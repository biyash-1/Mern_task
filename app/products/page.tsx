// "use client";
// import { useProducts } from "../hook/useProduct";
// import Product from "@/components/ProductCard";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// const ProductsPage = () => {
//   const { products, loading, error, hasMore, loadMore } = useProducts();
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const observerRef = useRef<HTMLDivElement>(null);

//   const categories = [
//     "All",
//     ...Array.from(new Set(products.map((p) => p.category))),
//   ];

//   // Filtered products
//   const filteredProducts = products.filter((p) => {
//     const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
//     const matchesCategory = category === "All" || p.category === category;
//     return matchesSearch && matchesCategory;
//   });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !loading) {
//           loadMore();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => {
//       if (observerRef.current) {
//         observer.unobserve(observerRef.current);
//       }
//     };
//   }, [hasMore, loading, loadMore]);

//   if (loading && products.length === 0)
//     return <p className="p-6 text-center text-gray-700">Loading...</p>;
//   if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
//   if (!products.length)
//     return <p className="p-6 text-center text-gray-700">No products found</p>;

//   return (
//     <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-slate-100 ">
//       <h1 className="text-3xl font-bold text-center mb-8 ">Our Products</h1>

//       {/* Search & Category */}
//       <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center ">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 rounded-lg border  focus:ring-2 focus:ring-green-700 focus:border-green-700 w-full md:w-1/3"
//         />

//         <h1>Category:</h1>
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-700 focus:border-green-700 w-full md:w-1/4"
//         >
//           {categories.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <Link key={product.id} href={`/products/${product.id}`}>
//               <Product product={product} />
//             </Link>
//           ))
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             No products found.
//           </p>
//         )}
//       </div>

//       {/* infiinite scroll trigeering */}

//       {hasMore && (
//         <div
//           ref={observerRef}
//           className="h-10 flex justify-center items-center mt-6"
//         >
//           <p className="text-gray-500">Loading more...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;

"use client"
import { useProducts } from "../hook/useProductquery"
import Link from "next/link";
import Product from "@/components/ProductCard";

const page = () => {
  const {data, isLoading,error} = useProducts();
  console.log("data is",data)
 if(isLoading) return <p>Loading the datas</p>
 if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen mx-auto">
      <h1>Rect query learn to fetch data</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      {
        data.map((product:any) => (
             <Link key={product.id} href={`/products/${product.id}`}>
             <Product product={product} />
            </Link>      
        ))
      }
      </div>
      
    </div>
  )
}

export default page
