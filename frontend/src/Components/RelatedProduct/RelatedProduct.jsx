import React, { useEffect, useContext, useState } from "react";
import { ShopContext } from "../../Conntex/ShopContext";
import Product from "../Product";

function RelatedProduct({ category, subCategory }) {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const filteredProducts = products
      .filter(
        product =>
          product.category === category &&
          product.subCategory === subCategory
      )
      .slice(0, 5);

    setRelated(filteredProducts);
  }, [products, category, subCategory]);

  return (
    <div className="my-10 sm:my-20">
      <div className="text-center text-2xl sm:text-3xl py-3">
        <p>
          RELATED <span className="text-red-500">PRODUCTS</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
        {related.map(item => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
}

export default RelatedProduct;
