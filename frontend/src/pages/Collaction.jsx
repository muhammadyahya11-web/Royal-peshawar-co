import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Footer from '../Components/Footer/Footer'
import { ShopContext } from '../Conntex/ShopContext'
import Product from '../Components/Product'

function Collaction() {
  const [showfilter, setshowfilter] = useState(true)

  const { products , showSearch , visible ,search, setsearch  } = useContext(ShopContext)

  const [filterproducts, setfilterproducts] = useState([])
  const [category, setcategory] = useState([])
  const [subCategory, setsubCategory] = useState([])
  const [sortProduct, setsortProduct] = useState([])

  /* ================= CATEGORY TOGGLE ================= */
  const toggleCategory = (e) => {
    const value = e.target.value

    setcategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  /* ================= SUB CATEGORY TOGGLE ================= */
  const togglesubCategory = (e) => {
    const value = e.target.value

    setsubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  /* ================= FILTER PRODUCTS (FIXED) ================= */
  const filterdproduct = () => {
    let copyproduct = [...products]

    if(showSearch && search) {
       copyproduct = copyproduct.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // category filter
    if (category.length > 0) {
      copyproduct = copyproduct.filter(item =>
        category.includes(item.category.toLowerCase())
      )
    }
    
    // subCategory filter
    if (subCategory.length > 0) {
      copyproduct = copyproduct.filter(item =>
        subCategory.includes(item.subCategory.toLowerCase())
      )
    }

    setfilterproducts(copyproduct)
  }
  
    //=================PRODUCT SORTING==================
const productSorting = () => {

  let sortedproduct = [...filterproducts]
   switch (sortProduct) {
    case "low":
      sortedproduct.sort((a,b)=> a.price - b.price)
      break;

       case "high":
      sortedproduct.sort((a,b)=> b.price - a.price)
      break;
   
    default:
         return
    
   }
   setfilterproducts(sortedproduct);
}



   

  /* ================= RUN FILTER ================= */
  useEffect(() => {
    filterdproduct()
     console.log(search);
     
     
     
  
   
  }, [category, subCategory, products ,search ,showSearch ])

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    setfilterproducts(products)
  }, [products])
  // ==================SORT LOADING.=====================
  useEffect(() => {
    productSorting();
  }, [sortProduct])

  return (
    <div className='flex flex-col mx-2 sm:flex-row sm:gap-10 gap-1 pt-10 border-t sm:mx-12'>

      {/* ========== FILTER ========== */}
      <div className='min-w-60'>
        <p className='text-xl flex gap-2 items-center'>
          FILTERS
          <img
            onClick={() => setshowfilter(!showfilter)}
            className={`h-3 sm:hidden ${showfilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        <div className={`flex-col ${showfilter ? "sm:flex" : "hidden"}`}>

          {/* CATEGORY */}
          <div className='text-gray-800 border-gray-300 px-10 py-3 border mt-10 flex flex-col gap-2'>
            <p className='font-medium text-black text-sm mb-2'>CATEGORIES</p>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="men" onChange={toggleCategory} />
              Men
            </label>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="women" onChange={toggleCategory} />
              Women
            </label>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="kids" onChange={toggleCategory} />
              Kids
            </label>
          </div>

          {/* TYPE */}
          <div className='text-gray-800 border-gray-300 px-10 py-3 border mt-5 flex flex-col gap-2'>
            <p className='font-medium text-black text-sm mb-2'>TYPE</p>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="topwear" onChange={togglesubCategory} />
              Top Wear
            </label>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="bottomwear" onChange={togglesubCategory} />
              Bottom Wear
            </label>

            <label className='text-sm flex gap-2'>
              <input type="checkbox" value="winterwear" onChange={togglesubCategory} />
              Winter Wear
            </label>
          </div>

        </div>
      </div>

      {/* ========== RIGHT SIDE ========== */}
      <div className='w-full'>

        <div className='flex justify-between items-center gap-6 mt-5'>
          <p className='text-sm sm:text-2xl font-medium text-black'>
            NEW <span className='text-red-700'>COLLECTION</span>
          </p>

          <select onChange={(e)=>{setsortProduct(e.target.value)}} className='border-gray-600 border-2 px-3 py-2 text-sm'>
            <option value={"low"}>Sort by : Low to high</option>
            <option value={"high"}>Sort by : High to low</option>
            <option value={"relevent"}>Sort by : Relevant</option>
          </select>
        </div>

        <hr className='border-gray-300 my-3' />

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
          {
            filterproducts.length > 0
              ? filterproducts.map((item, id) => (
                  <Product product={item} key={id} />
                ))
              : <p className="col-span-full text-center text-gray-500">No products found</p>
          }
        </div>

      </div>

    
    </div>
  )
}

export default Collaction