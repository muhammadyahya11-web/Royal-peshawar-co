import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import Product from "../Components/Product";
import { useNavigate } from "react-router-dom";

function Dropshoulder() {
  const { products } = useContext(ShopContext);
  const [dropshoulders, setDropshoulders] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const filtered = products.filter(
      (p) =>
        p.category.toLowerCase() === "dropshoulder" ||
        p.name.toLowerCase().includes("dropshoulder")
    );
    setDropshoulders(filtered);
  }, [products]);

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-2">Dropshoulder Collection</h1>
        <p onClick={() => nav("/")} className="text-gray-300 mb-12 cursor-pointer">
          Home / <span className="text-gray-900">Dropshoulder</span>
        </p>

        {dropshoulders.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {dropshoulders.map((item, idx) => (
              <Product product={item} key={item._id || idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No dropshoulder products found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dropshoulder;