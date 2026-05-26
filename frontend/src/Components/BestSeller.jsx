import React, { useMemo, useContext } from "react";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShopContext } from "../Conntex/ShopContext";
import SectionHeader from "./SectionHeader";

export default function BestSeller({ setQuickView }) {
  const { products, loading } = useContext(ShopContext);

  const bestSellers = useMemo(
    () => products.filter((p) => p.bestseller === true).slice(0, 4),
    [products]
  );

  const showSkeleton = loading && bestSellers.length === 0;

  return (
    <section className="py-16 md:py-24 bg-[#f3efe8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Popular"
          title="Best sellers"
          description="Loved by our customers — updated often."
          linkTo="/collaction"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {showSkeleton
            ? Array(4)
                .fill(null)
                .map((_, i) => <SkeletonCard key={i} />)
            : bestSellers.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onQuickView={setQuickView}
                />
              ))}
        </div>

        {!loading && bestSellers.length === 0 && (
          <p className="text-[#8f8980] text-center py-10 text-sm">
            Best sellers coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
