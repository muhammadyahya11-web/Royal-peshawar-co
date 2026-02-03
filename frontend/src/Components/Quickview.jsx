import React, { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";

export default function BestSeller({ setQuickView }) {
  const [loading, setLoading] = useState(true);
  const [bestSeller, setBestSeller] = useState([]);
  const { products  } = useContext(ShopContext);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(p => p.bestseller === false);
      setBestSeller(filtered);
    }

    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [products]);

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(loading ? Array(4).fill(null) : bestSeller.slice(0, 4)).map(
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
    </section>
  );
}