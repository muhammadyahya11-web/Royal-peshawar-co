import React from 'react'
import logo from './../../assets/logo.png'
import { Links, NavLink } from "react-router-dom"
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import AutoTextSlide from './AutoTextSlide';
import { useContext } from 'react';
import { ShopContext } from '../../Conntex/ShopContext';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isActive, setisActive] = useState(false)
  const {showSearch ,setshowSearch ,visible , setvisible ,cartlength} = useContext(ShopContext)
  
  
  
  return (
    <div>
      {/* ===============auto slider=============================== */}
      {/* <div> <AutoTextSlide /> </div> */}
      {/* ===============Navbar main =================================== */}

      <div className='   w-full shadow '>
      <div className="h-[70px]  bg-[#ffff] w-full   flex justify-between items-center ">

        <div className="logo -mt-3 ml-[-19px] cursor-pointer"><img className='h-[130px] md:h-[170px]' src={logo} alt="" /></div>
        <div className=" hidden  md:flex justify-around items-center  gap-8 font-bold text-[15px]">
           
            <div>
            <NavLink to="/">HOME  </NavLink>
            <hr className=' w-2/4 hr-line    border ' />
          </div>

          <div className='relative'>
            <NavLink to="/collaction">NEW COLLACTION</NavLink>
            <hr className=' w-2/4 hr-line border ' />
          </div>

          <div>
            <NavLink to="/shirts">SHIRTS </NavLink>
            <hr className='  w-2/4 hr-line  bg-amber-950 border ' />
          </div>

          <div>
            <NavLink to="/">SWEAT SHIRTS </NavLink>
            <hr className='  w-2/4 hr-line  bg-amber-950 border ' />
          </div>

          <div>
            <NavLink to="/contact" > PANTS</NavLink>
            <hr className='  w-2/4 hr-line bg-amber-950 border ' />
          </div>
         



        </div>

        <div className="icons-group flex justify-between  gap-4 md:gap-7  pr-6 ">
         {visible ?  <img onClick={(e)=>{ setshowSearch(true) }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> : ""}
          {/* =============Drop Down======================== */}
          <div className="group relative">
            <img className='w-5 min-w-5' src={assets.profile_icon} alt="" />
            <div className=' z-50 absolute right-0 hidden group-hover:block mt-2 bg-[#a2a2a2]'>
              <div className='flex flex-col gap-5 w-36 py-3 px-5'>
                <p>My Profile</p>
                <p> Order </p>
                <p>Log out</p>
              </div>
            </div>
          </div>
          {/* ====================cart icon============================= */}
          <div className='relative'>
            <Link to={"/cart"}> <img className='w-5 min-w-5' src={assets.cart_icon}/> </Link>
            
            <span className='bg-black absolute h-[15px] w-[15px] bottom-[-5px]  text-[9px] text-amber-50 text-center rounded-full right-0'>{cartlength}</span>

          </div>
          <div className="sidebar">
            <div className=' '>
              <img onClick={(e) => setisActive(true)} className='w-5 min-w-5 mt-1 block md:hidden' src={assets.menu_icon} alt="" />
            </div>
          </div>
        </div>

        {
          isActive ? <div className="sidebar-container  flex  flex-col min-w-full px-5 py-3 top-0 gap-6 bg-[#ffff] absolute   ">
            <p className='left-0' onClick={(e) => setisActive(false)} >Back</p>
            <div className='flex flex-col justify-center  '>
              <NavLink to="/" className="border-b p-3" onClick={(e) => setisActive(false)} >Home</NavLink>
            <NavLink to="/collaction" className="border-b p-3" onClick={(e) => setisActive(false)} >Collaction</NavLink>
            <NavLink to="/contact" className="border-b p-3" onClick={(e) => setisActive(false)} >Hoodies</NavLink>
            <NavLink to="/shirts" className="border-b p-3" onClick={(e) => setisActive(false)} >Shirts</NavLink>
             <NavLink to="/sweatshirt" className="border-b p-3" onClick={(e) => setisActive(false)} >Sweat-Shirts</NavLink>
              <NavLink to="/about" className="p-3" onClick={(e) => setisActive(false)} >Pants</NavLink>
            </div>
          </div> : ""
        }

      </div>
    </div>
      {/* ==============main Navbar end ================================= */}
    </div>
  )
}

export default Navbar
