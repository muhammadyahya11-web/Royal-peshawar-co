import React from "react";
import { products } from "../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

function ShopByCategory() {
  const nav = useNavigate();
  const routes = ["/jacket", "/dropshouder", "/baggy", "/roundedNeckShirts"];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {products.slice(0, 4).map((cat, i) => (
        <button
          type="button"
          key={cat.name}
          onClick={() => nav(routes[i])}
          className="group relative overflow-hidden text-left aspect-[3/4] rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-500"
        >
          <img
            src={cat.image[0]}
            alt={cat.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3d3935]/70 via-[#3d3935]/15 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-end justify-between gap-2">
            <h3 className="font-display text-lg md:text-xl text-white">
              {cat.name}
            </h3>
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-[#3d3935] group-hover:bg-[#a68b5b] group-hover:text-white transition shrink-0">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default ShopByCategory;
