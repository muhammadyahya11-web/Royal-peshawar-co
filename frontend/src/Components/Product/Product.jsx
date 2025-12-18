import React, { useContext } from 'react';
import { ShopContext } from '../../Conntex/ShopContext';
import { useParams } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { DivideIcon } from '@heroicons/react/24/solid';
import RelatedProduct from '../RelatedProduct/RelatedProduct';

function Product() {
  const { products ,currency , addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [image, setimage] = useState()
  const [productDetail, setproductDetail] = useState("")
   const [Size, setSize] = useState(null)

// ===============DATA FETCH ===================================
const fetchData =async ()=>{
    products.map((item)=>{
        if(productId.trim()== item._id){
            setproductDetail(item)
           setimage(item.image[0])

        
        }
    })



}
// ====================================================================

    useEffect(() => {
        fetchData()
    
    }, [productId])
    
// =====================================================================
 


  if (!productDetail) return <h2>Product not found</h2>;
return (
  <div className="border-t pt-6 sm:pt-10 px-3 sm:px-10">

    {/* MAIN CONTAINER */}
    <div className="flex flex-col lg:flex-row gap-6">

      {/* ================= IMAGE SECTION ================= */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 w-full lg:w-1/2">

        {/* Thumbnails */}
        <div className="flex sm:flex-col gap-2 sm:w-24 overflow-x-auto sm:overflow-y-auto">
          {productDetail.image.map((item, index) => (
            <img
              key={index}
              onClick={() => setimage(item)}
              src={item}
              className="w-20 sm:w-full cursor-pointer border"
              alt=""
            />
          ))}
        </div>

        {/* Main Image */}
        <img
          src={image}
          className="w-full  sm:h-[450px] sm:min-w-fit object-contain"
          alt=""
        />
      </div>

      {/* ================= PRODUCT INFO ================= */}
      <div className="w-full lg:w-1/2">

        <h1 className="text-lg sm:text-2xl font-semibold mt-2">
          {productDetail.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <img src={assets.star_icon} className="w-4" />
          <img src={assets.star_icon} className="w-4" />
          <img src={assets.star_icon} className="w-4" />
          <img src={assets.star_icon} className="w-4" />
          <img src={assets.star_dull_icon} className="w-4" />
          <p className="text-sm ml-2">(122)</p>
        </div>

        {/* Price */}
        <p className="mt-4 text-xl sm:text-3xl font-medium">
          {currency}{productDetail.price}
        </p>

        {/* Description */}
        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
          {productDetail.description}
        </p>

        {/* Sizes */}
        <div className="mt-6">
          <p className="mb-2 font-medium text-sm">Select Size</p>
          <div className="flex gap-2 flex-wrap">
            {productDetail.sizes.map((item, index) => (
              <button
                key={index}
                onClick={() => setSize(item)}
                className={`px-4 py-2 text-sm border 
                ${Size === item ? "border-orange-500" : "border-gray-300"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(productDetail, Size)}
          className="mt-6 w-full sm:w-auto bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
        >
          Add to Cart
        </button>

        <hr className="my-6" />

        {/* Info */}
        <div className="text-xs sm:text-sm text-gray-500 space-y-1">
          <p>✔ Easy return & exchange in 7 days</p>
          <p>✔ 100% original product</p>
          <p>✔ Cash on delivery available</p>
        </div>
      </div>
    </div>

    {/* ================= DESCRIPTION ================= */}
    <div className="mt-16">
      <div className="flex gap-3">
        <b className="text-sm border px-4 py-2">Description</b>
        <p className="text-sm border px-4 py-2">Reviews (122)</p>
      </div>

      <div className="border p-4 mt-4 text-sm text-gray-500 space-y-3">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>

    {/* ================= RELATED PRODUCTS ================= */}
    <RelatedProduct
      category={productDetail.category}
      subCategory={productDetail.subCategory}
    />
  </div>
); 

}

export default Product;
