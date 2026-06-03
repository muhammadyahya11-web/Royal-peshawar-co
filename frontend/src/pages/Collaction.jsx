import React, { useContext, useEffect, useMemo, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "./../context/ShopContext.jsx";
import Product from "../Components/Product";

const normalize = (value) =>
  (value || "").toString().toLowerCase().replace(/\s+/g, "").trim();

const CATEGORY_OPTIONS = [
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Kids", value: "kids" },
];

const SUBCATEGORY_OPTIONS = [
  { label: "Top Wear", value: "topwear" },
  { label: "Bottom Wear", value: "bottomwear" },
  { label: "Winter Wear", value: "winterwear" },
];

function Collaction() {
  const [showfilter, setshowfilter] = useState(true);
  const { showSearch, search, products, loading } = useContext(ShopContext);

  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortProduct, setsortProduct] = useState("relevant");

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

  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    if (showSearch && search?.trim()) {
      const q = search.toLowerCase();
      list = list.filter((item) => item.name?.toLowerCase().includes(q));
    }

    if (category.length > 0) {
      list = list.filter((item) =>
        category.includes(normalize(item.category))
      );
    }

    if (subCategory.length > 0) {
      list = list.filter((item) =>
        subCategory.includes(normalize(item.subcategory))
      );
    }

    if (sortProduct === "low") {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortProduct === "high") {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return list;
  }, [products, showSearch, search, category, subCategory, sortProduct]);

  useEffect(() => {
    setshowfilter(window.innerWidth >= 990);
  }, []);

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 flex flex-col lg:flex-row gap-12">
        <aside className="w-full lg:w-72">
          <div className="flex items-center justify-between border border-gray-300 py-2 px-5 mb-6">
            <h2 className="text-lg font-semibold tracking-wide font-display">
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
            <div className="border rounded-xl p-5">
              <p className="font-medium text-sm mb-4 uppercase tracking-wide">
                Category
              </p>
              {CATEGORY_OPTIONS.map(({ label, value }) => (
                <label
                  key={value}
                  className="flex items-center gap-3 text-sm mb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={value}
                    checked={category.includes(value)}
                    onChange={toggleCategory}
                    className="accent-black"
                  />
                  {label}
                </label>
              ))}
            </div>

            <div className="border rounded-xl p-5">
              <p className="font-medium text-sm mb-4 uppercase tracking-wide">
                Sub category
              </p>
              {SUBCATEGORY_OPTIONS.map(({ label, value }) => (
                <label
                  key={value}
                  className="flex items-center gap-3 text-sm mb-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={value}
                    checked={subCategory.includes(value)}
                    onChange={togglesubCategory}
                    className="accent-black"
                  />
                  {label}
                </label>
              ))}
            </div>

            {(category.length > 0 || subCategory.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setcategory([]);
                  setsubCategory([]);
                }}
                className="w-full text-sm text-neutral-600 border border-neutral-200 py-2 rounded-lg hover:bg-neutral-50"
              >
                Clear filters
              </button>
            )}
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-semibold">
                New Collection
              </h1>
              <p className="text-sm text-gray-500 tracking-widest mt-2">
                {filteredAndSorted.length} product
                {filteredAndSorted.length !== 1 ? "s" : ""}
              </p>
            </div>

            <select
              value={sortProduct}
              onChange={(e) => setsortProduct(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-black transition"
            >
              <option value="relevant">Sort by: Relevance</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {loading && products.length === 0 ? (
            <p className="text-center py-24 text-gray-500">Loading products...</p>
          ) : filteredAndSorted.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSorted.map((item) => (
                <Product product={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-sm text-gray-400 mt-2">
                Try clearing filters or change sub category
              </p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
}

export default Collaction;
