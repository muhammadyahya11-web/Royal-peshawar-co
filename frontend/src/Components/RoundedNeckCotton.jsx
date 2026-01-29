import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import Product from "../Components/Product";
import { useNavigate } from "react-router-dom";

function RoundedNeckShirts() {
  const { products } = useContext(ShopContext);
  const [shirts, setShirts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    console.log(products.name);

    const filtered = products.filter(
      (p) =>


        p.name.toLowerCase().includes("Round Neck") ||
        p.name.toLowerCase().includes("rounded neck ") ||
        p.name.toLowerCase().includes("Round Neck")

    );
    console.log(filtered);

    setShirts(filtered);
  }, [products]);

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-2">Rounded Neck Shirts</h1>
        <p onClick={() => nav("/")} className="text-gray-300 mb-12 cursor-pointer">
          Home / <span className="text-gray-900">Rounded Neck Shirts</span>
        </p>

        {shirts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {shirts.map((item, idx) => (
              <Product product={item} key={item._id || idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No rounded neck shirts found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RoundedNeckShirts;