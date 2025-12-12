"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className=" dark:bg-gray-900 relative flex flex-col items-center justify-center min-h-screen  dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 px-6 text-center">
      <div className="absolute inset-0 "></div>

      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to{" "}
          <span className="">
            BS <span className="text-yellow-700">Store it</span>{" "}
          </span>
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover premium fir curated for style, comfort, and elegance.
        </p>
        <Link href="/products">
          <button className="px-8 py-4 bg-green-700 dark:bg-green-500 hover:bg-green-800 dark:hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all transform hover:scale-105">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
