import React from 'react'
import logo from './../../assets/logo.png'
import { Links, NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import AutoTextSlide from './AutoTextSlide';
import { useContext } from 'react';
import { ShopContext } from '../../Conntex/ShopContext';
import { Link } from 'react-router-dom';
import { BackpackIcon, CroissantIcon, Cross, CrosshairIcon, CrossIcon, LogOutIcon } from 'lucide-react';

function Navbar() {
  const [isActive, setisActive] = useState(false)
  const naviigate= useNavigate()
  const [RegActive, setRegActive] = useState(false)
  const { showSearch, setshowSearch, visible, tooken, settooken, setvisible, cartlength, LogOut } = useContext(ShopContext)



  return (
    <div className=' bg-[#ffff] '>
    

      <div className='   w-full shadow sm:px-20 px-5 '>
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
              <NavLink to="/aboutus" > ABOUT UA</NavLink>
              <hr className='  w-2/4 hr-line bg-amber-950 border ' />
            </div>
            <div>
              <NavLink to="/contact" > CONTACT</NavLink>
              <hr className='  w-2/4 hr-line bg-amber-950 border ' />
            </div>
          </div>

          <div className="icons-group flex justify-between  gap-4 md:gap-7  pr-6 ">
            {visible ? <img onClick={(e) => { setshowSearch(true) }} src={assets.search_icon} className='w-5 cursor-pointer' alt="" /> : ""}
            {/* =============Drop Down======================== */}
            <div className="relative group">
              {/* Profile Icon */}
               <div onClick={()=>{tooken ? null : naviigate("/login") }}  >
                <img
                  className="w-5 min-w-5 cursor-pointer"
                  src={assets.profile_icon}
                  alt="profile"
                />
               </div>

              {/* Dropdown (ONLY when token exists) */}
              {tooken && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="flex flex-col gap-3 py-3 px-4 text-sm text-gray-700">
                    <Link to="/profile" className="hover:text-black">
                      My Profile
                    </Link>

                    <Link to="/order" className="hover:text-black">
                      My Orders
                    </Link>

                    <button
                      onClick={LogOut}
                      className="text-left text-red-500 hover:text-red-600"
                    >
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ====================cart icon============================= */}
            <div className='relative'>
              <Link to={"/cart"}> <img className='w-5 min-w-5' src={assets.cart_icon} /> </Link>

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
              <p className='left-0' onClick={(e) => setisActive(false)} > <CrossIcon />  </p>
              <div className='flex flex-col justify-center  '>
                <NavLink to="/" className="border-b p-3" onClick={(e) => setisActive(false)} >Home</NavLink>
                <NavLink to="/collaction" className="border-b p-3" onClick={(e) => setisActive(false)} >Collaction</NavLink>
                <NavLink to="/hoodies" className="border-b p-3" onClick={(e) => setisActive(false)} >Hoodies</NavLink>
                <NavLink to="/aboutus" className="p-3 border-b" onClick={(e) => setisActive(false)} >About Us</NavLink>
                <NavLink to="/contact" className="border-b p-3" onClick={(e) => setisActive(false)} >Contact us</NavLink>
                <NavLink to="http://localhost:5175/" className=" p-3" onClick={(e) => setisActive(false)} >Admin</NavLink>
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
