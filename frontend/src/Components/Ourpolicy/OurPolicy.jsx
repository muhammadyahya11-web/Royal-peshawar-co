import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

function OurPolicy() {
  return (
    <div className=' sm:flex grid grid-cols-1 gap-12  w-full justify-center gap-x-15 my-20 '>
      <div className='flex flex-col items-center'>
        <img className='w-12 m-auto mb-4' src={assets.exchange_icon} alt="" />
        <p  className=' font-semibold'>Easy Exchange Polcy </p>
        <p className=' text-gray-400'>We offer free heesle free exchange policy</p>
      </div>

       <div className=' flex flex-col items-center'>
        <img className='w-12 m-auto mb-4' src={assets.quality_icon} alt="" />
        <p  className=' font-semibold'>7 Days Return POlicy  </p>
        <p className=' text-gray-400'>We offer free heesle free exchange policy</p>
      </div>

       <div className='flex flex-col items-center '>
        <img className='w-12 m-auto mb-4' src={assets.support_img} alt="" />
        <p  className=' font-semibold'>Best Customer Support </p>
        <p className=' text-gray-400'>We offer free heesle free exchange policy</p>
      </div>

    </div>
  )
}

export default OurPolicy
