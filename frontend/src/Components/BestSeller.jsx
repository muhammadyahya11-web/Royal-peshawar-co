import React, { useEffect, useState } from "react";
import Quickview from "./../Components/Quickview"
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShopContext } from "../Conntex/ShopContext";
import { useContext } from "react";

export default function BestSeller({ setQuickView }) {
  const [loading, setLoading] = useState(true);
  const [BestSeller, setBestSeller] = useState([])
  const {products} =useContext(ShopContext)
    
    
 const bestSeller = () => {
  const filtered = products.filter((p) => p.bestseller === false);
  setBestSeller(filtered);
};

  useEffect(() => {
  if (products.length > 0) {
    bestSeller();
  }

   const timer = setTimeout(() => setLoading(false), 1200);
  return () => clearTimeout(timer);
}, [products]);


  return (
    <section className="bg-[#121218] py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-white">
          Best Sellers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {(loading ? Array(4).fill(null) : BestSeller.slice(0, 4)).map(
            (product, index) =>
              loading ? (
                <SkeletonCard key={index} />
              ) : (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={setQuickView}
                />
              )
          )}
        </div>
      </div>
    </section>
  );
}
