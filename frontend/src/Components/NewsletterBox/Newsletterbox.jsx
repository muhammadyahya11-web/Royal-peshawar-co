import React from 'react'

function Newsletterbox() {

   const  submitHandler = (e) =>{
    e.preventDefault();
   }


  return (
    <div className=' text-center flex items-center   flex-col px-7 '>
        <p className=' text-2xl font-medium  text-gray-800 ' >Subscribe Now and Get 20% Off </p>
      <p className=' text-gray-400 mt-4 '> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, nobis!</p>
      <form onSubmit={submitHandler} className='  flex w-full  sm:w-1/2  items-center  gap-3 mx-auto my-6 border pl-3 ' >
         <input type="email" className=' w-full  text-gray-400 sm:flex-1 outline-0' placeholder='Enter Your Email  ' />
         <button type='submit' className=' text-xs text-white bg-black px-10 py-4' >SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default Newsletterbox
