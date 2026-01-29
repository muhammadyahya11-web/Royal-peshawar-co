import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "./../../Conntex/ShopContext";
import { products } from "../../assets/frontend_assets/assets";
import Product from "../../Components/Product";

function Shirts() {
  
  const [filteredproduct, setfilteredproduct] = useState([]);

  useEffect(() => {
    // setfilteredproduct(product.products);
    setfilteredproduct(products)
  }, []);

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-gray-900">
              Shirts
              <span className="block text-sm tracking-[3px] text-gray-500 mt-2 uppercase">
                Premium Collection
              </span>
            </h1>
          </div>

          {/* SORT */}
          <div>
            <select
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm
              bg-white focus:outline-none focus:border-black transition"
            >
              <option>Sort by: Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-200 mb-12"></div>

        {/* ===== PRODUCTS GRID ===== */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
          lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {filteredproduct.length > 0 ? (
            filteredproduct.map((item, id) => (
              <Product product={item} key={id} />
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <p className="text-gray-500 text-lg">
                No products available
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Shirts;
