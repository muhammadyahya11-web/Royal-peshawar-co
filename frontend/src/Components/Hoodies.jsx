import React, { useContext, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShopContext } from "../Conntex/ShopContext";

function Hoodies({ setQuickView }) {
  const { products, loading } = useContext(ShopContext);

  const hoodies = useMemo(() => {
    const keywords = ["hoodie", "hoodies"];
    return products.filter((p) =>
      keywords.some((word) => p.name?.toLowerCase().includes(word))
    );
  }, [products]);

  const showSkeleton = loading && hoodies.length === 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {showSkeleton
        ? Array(4)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)
        : hoodies.slice(0, 4).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={setQuickView}
            />
          ))}
      {!loading && hoodies.length === 0 && (
        <p className="col-span-full text-center text-[#8f8980] text-sm py-8">
          Hoodies coming soon.
        </p>
      )}
    </div>
  );
}

export default Hoodies;
