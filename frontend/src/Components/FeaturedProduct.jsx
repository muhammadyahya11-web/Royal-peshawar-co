import React, { useMemo, useContext } from "react";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { ShopContext } from "../Conntex/ShopContext";
import SectionHeader from "./SectionHeader";

function FeaturedProduct() {
  const { products, loading } = useContext(ShopContext);

  const featured = useMemo(
    () => products.filter((p) => p.featured === true).slice(0, 8),
    [products]
  );

  const showSkeleton = loading && featured.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <SectionHeader
        eyebrow="Editor's pick"
        title="Featured products"
        description="Must-have pieces selected for this season."
        linkTo="/collaction"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {showSkeleton
          ? Array(8)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
}

export default FeaturedProduct;
