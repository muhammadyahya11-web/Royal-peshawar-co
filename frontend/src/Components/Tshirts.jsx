import React, { useMemo, useContext } from "react";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShopContext } from "../Conntex/ShopContext";

function Tshirts({ setQuickView }) {
  const { products, loading } = useContext(ShopContext);

  const shirts = useMemo(
    () =>
      products
        .filter(
          (p) =>
            p.category?.toLowerCase().includes("men") ||
            p.subcategory?.toLowerCase().includes("shirt") ||
            p.name?.toLowerCase().includes("shirt")
        )
        .slice(0, 4),
    [products]
  );

  const showSkeleton = loading && shirts.length === 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {showSkeleton
        ? Array(4)
            .fill(null)
            .map((_, i) => <SkeletonCard key={i} />)
        : shirts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onQuickView={setQuickView}
            />
          ))}
    </div>
  );
}

export default Tshirts;
