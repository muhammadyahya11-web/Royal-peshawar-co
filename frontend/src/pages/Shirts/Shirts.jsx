import React, { useContext } from 'react'
import products, { ShopContext } from "./../../Conntex/ShopContext"
import Product from '../../Components/Product'
import { useState ,useEffect } from 'react'
function Shirts() {

      const product= useContext(ShopContext)

     const [filteredproduct, setfilteredproduct] = useState([])

    useEffect(() => {
        setfilteredproduct( product.products)
       
     
    }, [])
  return (
   
    
    <div>
       <div className='flex flex-col mx-2 sm:flex-row sm:gap-10 gap-1 pt-10 border-t sm:mx-12'>

    
     

      {/* ========== RIGHT SIDE ========== */}
      <div className='w-full'>

        <div className='flex justify-between items-center gap-6 mt-5'>
          <p className='text-sm sm:text-2xl font-medium text-black'>
            SHIRTS <span className='text-red-700'>COLLECTION</span>
          </p>

          <select className='border-gray-600 border-2 px-3 py-2 text-sm'>
            <option>Sort by : Low to high</option>
            <option>Sort by : High to low</option>
            <option>Sort by : Relevant</option>
          </select>
        </div>

        <hr className='border-gray-300 my-3' />

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-4'>
          {
            filteredproduct.length > 0
              ?filteredproduct.map((item, id) => (
                  <Product product={item} key={id} />
                ))
              : <p className="col-span-full text-center text-gray-500">No products found</p>
          }
        </div>

      </div>

    
    </div>
    </div>
  )
}

export default Shirts


