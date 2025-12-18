import React from 'react'

import herosection from './../assets/banner.jpg'
import mbl from './../assets/mbl.jpeg'
import Button from '../Components/button/Button'
import LatestCollaction from '../Components/LatestCollaction'
import  banner2 from './../assets/banner2.jpg'
import Blankhoodies from '../Components/Blankhoodies'
import Blanktshirt from '../Components/BlankTshirt'
import HeroHeading from '../Components/HeroSection/HeroHeading'
import Footer from '../Components/Footer/Footer'
import Newsletterbox from '../Components/NewsletterBox/Newsletterbox'
import OurPolicy from '../Components/Ourpolicy/OurPolicy'

function Home() {
  return (
  
    <div className=' max-w-fit overflow-x-hidden p-0 m-0  z-0   '>
      
      <div className=' top-[70px]  left-0'> 
       
     
        <img src={mbl} alt="" className='h-full w-full sm:hidden' />
         <img  className='h-140   md:w-full hidden md:block ' src={herosection} alt="" />
             <HeroHeading />
           <LatestCollaction/> 

           <img className='h-130 w-full ' src={banner2} alt="" />

           <Blankhoodies />
           <Blanktshirt />
           <OurPolicy />
           <Newsletterbox />
           <Footer />
    
    </div>
    </div>
  )
}

export default Home
