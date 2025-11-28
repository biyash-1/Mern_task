"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToogle";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/app/store/useCart";
const Header = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCart();

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md transition-colors border-b">
      <nav className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <h1 className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">
          BS <span className="text-yellow-700 dark:text-yellow-400">Store</span>
        </h1>

        <ul className="hidden md:flex items-center gap-8 text-lg font-medium text-gray-700 dark:text-gray-300">
          <li>
            <Link
              href="/"
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/cart"
              className="hover:text-red-600 dark:hover:text-red-400"
            >
              Cart
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <div className="mr-3">
            <div className="relative">
              <Link href="/cart">
                <FaShoppingCart
                  size={24}
                  className="text-gray-700 dark:text-gray-300"
                />
              </Link>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </div>
          </div>

          <ModeToggle />
          <Button className="">Login</Button>
        </div>

        <button
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setOpen(!open)}
        >
          <Menu className="w-7 h-7" />
        </button>
      </nav>

   
      {open && (
        <div className="md:hidden px-4 pb-4 bg-white dark:bg-gray-900 transition-colors">
          <ul className="flex flex-col gap-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-600 dark:hover:text-yellow-400"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:text-yellow-600 dark:hover:text-yellow-400"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-yellow-600 dark:hover:text-yellow-400"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="hover:text-yellow-600 dark:hover:text-yellow-400"
              >
                Cart
              </Link>
            </li>
            <Button className="bg-yellow-600 dark:bg-yellow-500 hover:bg-yellow-700 dark:hover:bg-yellow-600 text-white w-fit">
              Login
            </Button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
