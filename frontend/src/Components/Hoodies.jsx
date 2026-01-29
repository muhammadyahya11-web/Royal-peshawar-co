import React, { useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ProductCard } from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useContext } from "react";
import { ShopContext } from "../Conntex/ShopContext";

function Hoodies() {
  const {products} =useContext(ShopContext)
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [Hoodies, setHoodies] = useState([])

const findHoodies = () => {
  const keywords = ["hoodie", "hoodies"];

  const filtered = products.filter(p =>
    keywords.some(word => p.name?.toLowerCase().includes(word))
  );

  setHoodies(filtered);
};




 
useEffect(() => {
  if (products.length > 0) {
    findHoodies();
    setLoading(false); // Stop showing skeletons after filtering
  }
}, [products]);


  return (
    <div className="max-w-7xl mx-auto px-6  py-24">
      <h2 className="text-4xl font-bold mb-12 text-black ">
        Hoodies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {(loading ? Array(8).fill(0) : Hoodies.slice(0, 8)).map(
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

export default Hoodies;
