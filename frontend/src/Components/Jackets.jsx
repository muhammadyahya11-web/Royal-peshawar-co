import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import Product from "../Components/Product";
import { useNavigate } from "react-router-dom";
function Jackets() {
  const { products } = useContext(ShopContext);
  const [jackets, setJackets] = useState([]);
const nav = useNavigate()
  useEffect(() => {
    
    const filtered = products.filter(
      (p) =>
        p.category.toLowerCase() === "jackets" ||
        p.name.toLowerCase().includes("jacket")
    );
    setJackets(filtered);
  }, [products]);

  return (
    <section className="bg-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <h1 className="text-4xl font-bold mb-2">Men & Women Jackets</h1>
         <p onClick={()=>(nav("/"))} className="text-gray-300 mb-12" >Home / <span className="text-gray-900" >Jackets</span> </p>
        {jackets.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {jackets.map((item, idx) => (
              <Product product={item} key={item._id || idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No jackets found</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Jackets;