import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import logo from "./../../assets/logo.png"

function Footer() {
  return (
    <div>
    <div className='bg-white felx flex-col justify-center px-10  sm:grid  grid-cols-[3fr_1fr_1fr] '>
      

        <div className='py-3 '>
            <img className=' w-42 sm:ml-[-5%] ml-[-9%] mb-5'  src={logo} alt="" />
            <p className=' text-gray-600 md:w-2/3 text-small font-medium mt-[-7%] '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vero suscipit obcaecati a dignissimos. Accusantium, odio tenetur. Ipsa ex neque necessitatibus deleniti corporis dicta assumenda consequuntur enim quastionem nemo sunt error animi tempore earum odio alias maxime, quam totam, tenetur iure omnis nam eius laborum.</p>

        </div>

        <div className='py-20'>
            <h2 className=' text-xl font-medium mb-5 '>COMPNY</h2>
            <ul className=' text-gray-600 flex flex-col gap-1 '>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                
            </ul>

        </div>

          <div className='py-20 '>
            <h2 className=' text-xl font-medium mb-5 '>GET IN TOUCH</h2>
            <ul className=' text-gray-600 flex flex-col gap-1 '>
                <li>+92341-9090218</li>
                <li>royalpeshawarco.@gmail.com</li>
               
                
            </ul>
          </div>

        
        </div>

          <div>
            <hr />
            <p className=' py-5 text-sm text-center '>Copyright 2025@ RoyalPeshawarco. ALL Rights</p>
        </div>
      
    </div>
  )
}

export default Footer
