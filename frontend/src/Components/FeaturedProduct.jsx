import React, { useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useContext } from "react";
import { ShopContext } from "../Conntex/ShopContext";


function FeaturedProduct() {
  const {products} = useContext(ShopContext)
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [futured, setfutured] = useState([])

   const futuredProducts=()=>{

    const filtered = products.filter((p)=> p.featured === true)
    setfutured(filtered)
   }
   
   
 useEffect(() => {
  if (products.length > 0) {
    futuredProducts();
  }

  const timer = setTimeout(() => setLoading(false), 1200);
  return () => clearTimeout(timer);
}, [products]);
   

  return (
    <div className="max-w-7xl mx-auto px-6  py-24">
      <h2 className="text-4xl font-bold mb-12 text-black ">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(loading ? Array(8).fill(0) : futured.slice(0, 8)).map(
          (product, i) =>
            loading ? (
              <SkeletonCard key={i} />
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
  );
}

export default FeaturedProduct;
