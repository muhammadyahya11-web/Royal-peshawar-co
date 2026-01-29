import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../Conntex/ShopContext";
import Product from "../Components/Product";

function Collaction() {
  const [showfilter, setshowfilter] = useState(true);

  const {  showSearch, visible, search , products } =useContext(ShopContext);
    
      
  const [filterproducts, setfilterproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortProduct, setsortProduct] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const togglesubCategory = (e) => {
    const value = e.target.value;
    setsubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filterdproduct = () => {
    let copyproduct = [...products];

    if (showSearch && search) {
      copyproduct = copyproduct.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      copyproduct = copyproduct.filter((item) =>
        category.includes(item.category.toLowerCase())
      );
    }

    if (subCategory.length > 0) {
      copyproduct = copyproduct.filter((item) =>
        subCategory.includes(item.subCategory.toLowerCase())
      );
    }

    setfilterproducts(copyproduct);
  };

  const productSorting = () => {
    let sortedproduct = [...filterproducts];
    switch (sortProduct) {
      case "low":
        sortedproduct.sort((a, b) => a.price - b.price);
        break;
      case "high":
        sortedproduct.sort((a, b) => b.price - a.price);
        break;
      default:
        return;
    }
    setfilterproducts(sortedproduct);
  };

  useEffect(() => {
    filterdproduct();
  }, [category, subCategory, products, search, showSearch]);

  useEffect(() => {
    setfilterproducts(products);
  }, [products]);

  useEffect(() => {
    productSorting();
  }, [sortProduct]);

  useEffect(() => {
  if(window.innerWidth >= 990){
    setshowfilter(true)
  }
  else{
    setshowfilter(false)
  }
    
  }, [])
  

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 flex flex-col lg:flex-row gap-12">

        {/* ========== FILTER SIDEBAR ========== */}
        <aside className="w-full lg:w-72">
          <div className="flex items-center justify-between border border-gray-300 py-2 px-5  mb-6">
            <h2 className="text-lg font-semibold tracking-wide">
              Filters
            </h2>
            <img
              src={assets.dropdown_icon}
              onClick={() => setshowfilter(!showfilter)}
              className={`h-3 cursor-pointer lg:hidden ${
                showfilter ? "rotate-90" : ""
              }`}
              alt=""
            />
          </div>

          <div
            className={`space-y-6 ${
              showfilter ? "block" : "hidden lg:block"
            }`}
          >
            {/* CATEGORY */}
            <div className="border rounded-xl p-5">
              <p className="font-medium text-sm mb-4 uppercase tracking-wide">
                Category
              </p>
              {["men", "women", "kids"].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 text-sm mb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                    className="accent-black"
                  />
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </label>
              ))}
            </div>

            {/* TYPE */}
            <div className="border rounded-xl p-5">
              <p className="font-medium text-sm mb-4 uppercase tracking-wide">
                Type
              </p>
              {[
                { label: "Top Wear", value: "topwear" },
                { label: "Bottom Wear", value: "bottomwear" },
                { label: "Winter Wear", value: "winterwear" },
              ].map((type) => (
                <label
                  key={type.value}
                  className="flex items-center gap-3 text-sm mb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={type.value}
                    onChange={togglesubCategory}
                    className="accent-black"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ========== PRODUCTS SECTION ========== */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold">
                New Collection
              </h1>
              <p className="text-sm text-gray-500 tracking-widest mt-2">
                PREMIUM PICKS FOR YOU
              </p>
            </div>

            <select
              onChange={(e) => setsortProduct(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm
              bg-white focus:outline-none focus:border-black transition"
            >
              <option value="relevant">Sort by: Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterproducts.length > 0 ? (
              filterproducts.map((item, id) => (
                <Product product={item} key={id} />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <p className="text-gray-500 text-lg">
                  No products found
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

export default Collaction;
