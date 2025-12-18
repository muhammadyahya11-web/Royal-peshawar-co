import React from 'react'
import logo from './../assets/logo.png'
import googlelogo from './../assets/google-icon.png'
import axios from "axios"
import { useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../Firebase/Firebase'

function Register() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")
 const [message, setmessage] = useState()
 const [name, setname] = useState("")

  const handleSignup = async(e) => {
    e.preventDefault();
   
    
    try {
       const response = await axios.post("http://localhost:8000/api/auth/register", {name,email,password})
       if(response.status===200){
        setmessage(response.data.message)
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
          <div className="login-container  flex flex-col items-center -mt-12">

            <p className=' my-3 font-raleway text-[13px] text-gray-700'>Choose how you'd like to sign in </p>
            <button onClick={handlegoogleSigin} className='bg-[#f6f6f6] text-[15px] rounded-[7px] flex gap-3.5 justify-center items-center px-7 py-3 w-70'> <img className='h-[22px] rounded-full' src={googlelogo} alt="" />Signup with Google </button>

            <div className='flex my-2 justify-center items-center '>
              <hr className='border border-gray-500 w-30' />
              <p className='px-2.5 '>or</p>
              <hr className='border border-gray-500 w-30' />

            </div>


            <form onSubmit={handleSignup} className='mt-1   flex items-center flex-col gap-3 '>
               <input type="text" value={name} onChange={ (e)=>{setname(e.target.value)}} placeholder='Name' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <input type="Email" value={email} onChange={ (e)=>{setemail(e.target.value)}} placeholder='Email' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <input type="password"  value={password} onChange={ (e)=>{setpassword(e.target.value)}}  placeholder='Password' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
              <button type='submit' className='  rounded-[7px] bg-[#f6f6f6] px-7 py-3 w-70 '>Submit </button>
               <p className='text-[13px] mb-1 text-gray-700'>{message}</p>
              <p className='text-[13px] m-4 text-gray-700'>You have Already an Account click here <span className='text-blue-600 bold '>Login</span></p>

            </form>

          </div>

        </div>



      </div>

    </>
  )
}

export default Register
