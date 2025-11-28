"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const API = "https://fakestoreapi.com/products";

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const PRODUCTS_PER_PAGE = 6;

  // Fetch all products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Product[]>(API);
        setAllProducts(data);
        
        // Load first batch
        const firstBatch = data.slice(0, PRODUCTS_PER_PAGE);
        setDisplayedProducts(firstBatch);
        setHasMore(data.length > PRODUCTS_PER_PAGE);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return; // Skip first page (already loaded)

    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const newProducts = allProducts.slice(startIndex, endIndex);

    if (newProducts.length > 0) {
      setDisplayedProducts((prev) => [...prev, ...newProducts]);
    }

    // Check if there are more products to load
    if (endIndex >= allProducts.length) {
      setHasMore(false);
    }
  }, [page, allProducts]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { 
    products: displayedProducts, 
    loading, 
    error, 
    hasMore, 
    loadMore 
  };
}