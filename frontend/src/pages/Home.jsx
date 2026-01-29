import React, { useState, useEffect } from "react";
import hero1 from "./../assets/frontend_assets/hero1.png"
import {
  ShoppingBag,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { products } from "../assets/frontend_assets/assets";
import ImgSlider from "../Components/Slider";
import ShopByCategory from "../Components/ShopByCategory";
import BestSeller from "../Components/BestSeller";
import FeaturedProduct from "../Components/FeaturedProduct";
import Tshirts from "../Components/Tshirts";
import Hoodies from "../Components/Hoodies";

import Quickview from "./../Components/Quickview"
import { useContext } from "react";
import { ShopContext } from "../Conntex/ShopContext";



export default function Home() {
  const [quickView, setQuickView] = useState(null);
  const [loading, setLoading] = useState(true);
  const {addToCart} = useContext(ShopContext)
  const [size, setsize] = useState(null)

  /* ===== FAKE API LOADING (SKELETON) ===== */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="   h-[90vh] p-0 md:py-10 z-0  md:px-40">
         <ImgSlider />
      </section>

      {/* ================= BUY BY CATEGORY ================= */}
      <section className="max-w-7xl mx-auto px-6 z-50  py-24">
         <ShopByCategory />
              
      </section>

      {/* ================= BEST SELLERS ================= */}
      <section className="bg-gray-50 z-100 py-24">
  
      <BestSeller setQuickView={setQuickView} />
      <Quickview quickView={quickView} setQuickView={setQuickView} />
  
  

        <Hoodies />
        
      </section>

      {/* ================= FEATURED ================= */}
       <section className="max-w-7xl mx-auto px-6 py-24">
       
          
         <FeaturedProduct />
       <img className="w-full" src={hero1} alt="" />
         <Tshirts />
        
      </section>

      {/* ================= BRAND ================= */}
      <section className="bg-black text-white py-28 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Crafted for Royalty
        </h2>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg">
          Premium fashion inspired by heritage & confidence.
        </p>
      </section> 

      {/* ================= QUICK VIEW ================= */}
      {quickView && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full p-6 relative">
            <button
              onClick={() => setQuickView(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            <img
              src={quickView.images[0]}
              className="h-64 w-full object-cover mb-4"
            />

            <h3 className="text-2xl font-bold mb-2">
              {quickView.name}
            </h3>

            <div className="flex items-center gap-1 mb-4">
              <Star size={16} className="fill-black" /> 4.8
            </div>

            <p className="text-xl font-semibold mb-6">
              Rs {quickView.price}
            </p>
     <div className="flex gap-2">
  {quickView.sizes.map((s) => (
    <div
      key={s}
      onClick={() => setsize(s)}
      className={`h-7 w-7 border border-gray-400 flex justify-center items-center cursor-pointer 
        ${size === s ? "bg-gray-300" : "hover:bg-gray-200"}`}
    >
      {s}
    </div>
  ))}
</div>
        

           <button 
             
            onClick={() => addToCart(quickView, size)}
            className="mt-6 w-full sm:w-auto bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
           {quickView.stock===0 ? " Out of stock " : "add to cart"}
          </button>
          </div>
        </div>
      )}
    </div>
  );
}

