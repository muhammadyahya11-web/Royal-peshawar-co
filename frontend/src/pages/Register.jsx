import React, { useContext } from 'react'
import logo from './../assets/logo.png'

import axios from "axios"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../Conntex/ShopContext'

function Register() {
   const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
 const [message, setmessage] = useState();
 const [name, setname] = useState("");
 const {tooken ,settooken} = useContext(ShopContext);

  const handleSignup = async(e) => {
    e.preventDefault();
   
    
    try {
       const response = await axios.post("https://royal-peshawar-server.vercel.app/api/auth/register", {name,email,password})
       if(response.status===200){
        setmessage(response.data.message)
        settooken(response.data.token)
        navigate("/")
       }
        if(response.status===500){
        setmessage(response.data.message)
       }

      
 
    } catch (error) {
       
        setmessage(response.data.message)
       
    }
    
      setTimeout(() => {
       setmessage("")
    }, 3000)
      
    
    


  }

 const  handlegoogleSigin = async (e)=>{
  e.preventDefault();
  try {
     signInWithPopup(auth ,provider)
     
     
    
  } catch (error) {

    
  }
  setTimeout(() => {
       setmessage("")
    }, 3000)
 }

  return (
    <>
      <div className="customer-login-page font-raleway  h-screen w-full flex justify-center items-center bg-[#ffff] ">
        <div className="customer-login-cart  flex items-center flex-col  w-[400px] bg-[#e5e5f0] shadow-amber-950 rounded-2xl">
         
          <h1 className='font-bold text-2xl mt-[2%]'>SignUp</h1>
          <img src={logo} alt="logo" className='-mt-10 h-35 hover:w-[50] ' />
          <div className="login-container  flex flex-col items-center mt-5">


            <form onSubmit={handleSignup} className='mt-1   flex items-center flex-col gap-3 '>
               <input type="text" value={name} onChange={ (e)=>{setname(e.target.value)}} placeholder='Name' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <input type="Email" value={email} onChange={ (e)=>{setemail(e.target.value)}} placeholder='Email' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <input type="password"  value={password} onChange={ (e)=>{setpassword(e.target.value)}}  placeholder='Password' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <button type='submit' className='  rounded-[7px] bg-[#f6f6f6] px-7 py-3 w-70 '>Submit </button>
               <p className='text-[13px] mb-1 text-gray-700'>{message}</p>
              <p className='text-[13px] m-4 text-gray-700'>You have Already an Account click here
                <Link to={"/login"} > <span className='text-blue-600 bold '>Login</span></Link></p>

            </form>

          </div>

        </div>



      </div>

    </>
  )
}

export default Register
