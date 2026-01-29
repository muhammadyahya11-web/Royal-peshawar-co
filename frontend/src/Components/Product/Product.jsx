import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Conntex/ShopContext';
import { useParams } from 'react-router-dom';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import axios from 'axios';

function Product() {
  const { currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();


  const [productDetail, setProductDetail] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState(null);
  

  // ================= FETCH SINGLE PRODUCT =================
const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/product/product/${productId.trim()}`);
const data = await res.json();

      if (data.success) {
        
        console.log(data.singleProduct.stock);
        
        
        setProductDetail(data.singleProduct);
        setImage(data.singleProduct.images[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } 
  };

 useEffect(() => {
  if (productId) fetchProduct();
}, [productId]);
  
  
  // ================= RENDER =================
  
  if (!productDetail) return <h2>Product not found</h2>;

  return (
    <div className="border-t pt-6 sm:pt-10 px-3 sm:px-10">
      {/* MAIN CONTAINER */}
      <div className="flex flex-col md:flex-row lg:flex-row gap-6">
        {/* IMAGE SECTION */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex sm:flex-col gap-2 sm:w-24 overflow-x-auto sm:overflow-y-auto">
            {productDetail.images.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setImage(img)}
                src={img}
                className="w-20 sm:w-full cursor-pointer border"
                alt=""
              />
            ))}
          </div>
          {/* Main Image */}
          <img
            src={image}
            className="w-full sm:h-[450px] sm:min-w-fit object-contain"
            alt=""
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="w-full lg:w-1/2">
        
         <h1 className=" flex-1 sm:text-sm text-gray-400 font-semibold mt-2">stock : {productDetail.stock=== 0 ? "Out of stock" : productDetail.stock}</h1>
         
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">
            {productDetail.name}
          </h1>

          <p className="mt-4 text-xl sm:text-3xl font-medium">
            {currency}{productDetail.price}
          </p>

          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            {productDetail.des}
          </p>

          {/* Sizes */}
          <div className="mt-6">
            <p className="mb-2 font-medium text-sm">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productDetail.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 text-sm border ${
                    size === s ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button 
            
            onClick={() => addToCart(productDetail, size)}
            className="mt-6 w-full sm:w-auto bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
           {productDetail.stock===0 ? " Out of stock " : "add to cart"}
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <RelatedProduct
        category={productDetail.category}
        subCategory={productDetail.subCategory}
      />
    </div>
  );
}

export default Product;
