import {  ShoppingBag, Star, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { ShopContext } from "../Conntex/ShopContext";

export const ProductCard = ({ product, onQuickView }) => {



  const {addToCart} = useContext(ShopContext) ;
   const [size, setsize] = useState([])
const [show, setshow] = useState(false)

   const cart= (product ,sizes)=>{
    setshow(true)
   if(! size){
     console.log("select the size");
     
   }
  
   }
  return (
    <div className="group relative bg-white overflow-hidden">

      <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 z-10">
        BEST
      </span>

      <div className="overflow-hidden">
        <img
          src={product.images?.[0]}
          className="h-[420px] w-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Star size={14} className="fill-black" /> 4.8
        </div>
        <p className="text-lg font-semibold mt-1">
          Rs {product.price},
          
        </p>
      </div>

      {/* Hover Actions */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-4">
     {show ?  <div className="bg-white px-10 py-5 flex gap-2 "> {product.sizes.map((s ,i)=>{
       return <div
       className={`w-10 h-10 border border-gray-400 flex justify-center items-center cursor-pointer
${size === s ? "bg-gray-300" : "hover:bg-gray-200"}`}
        onClick={()=>{setsize(s)}} key={i}>{s} </div>
     })} </div> : null }
     <div className=" inset-0  opacity-0 group-hover:opacity-100 transition flex  items-center justify-center gap-4">
        {/* QUICK VIEW */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="bg-white p-3 rounded-full"
        >
          <Eye />
        </button>

        {/* ADD TO CART */}
       
        <button
            onClick={() => addToCart(product, size)}
          className="bg-white p-3 rounded-full"
        >
          <ShoppingBag />
        </button>

      
</div>
      </div>
    </div>
  );
};