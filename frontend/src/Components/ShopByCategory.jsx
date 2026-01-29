import React from 'react'
import { products } from '../assets/frontend_assets/assets';
import { useNavigate } from 'react-router-dom';
function ShopByCategory() {
    const nav= useNavigate()

    const handlecategory= (e)=>{
      
      if (e=== 0) { nav("/jacket") }
      if (e=== 1) { nav("/dropshouder") }
      if (e=== 2) { nav("/baggy") }
      if(e===3) { nav("/roundedNeckShirts") }
      

    }
  return (
    <div  className="max-w-7xl mx-auto px-6 z-50 bg-amber-90 ">
    
              
         
              <h2 className="text-4xl font-bold mb-12">Shop by Category</h2>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.slice(0,4).map((cat , i) => (
                  <div onClick={(e) => handlecategory(i)}
                    key={cat.name}
                    className="relative group cursor-pointer overflow-hidden"
                  >
                    <img
                     
                      src={cat.image[0]}
                      className="h-[320px] w-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <h3 className="text-white text-3xl font-bold">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            
      
    </div>
  )
}

export default ShopByCategory
