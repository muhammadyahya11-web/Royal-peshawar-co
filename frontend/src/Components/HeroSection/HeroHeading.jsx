import React from 'react'
import Button from '../button/Button'


function HeroHeading() {
  return (
    <div>
          
           <div className=' m-auto flex flex-col mt-11  items-center'>
                <p className='text-2xl'>Winter XV-25</p>
                <h2 className=' mb-4 mt-2 sm:text-xl md:text-xl lg:text-4xl '>Winter New Arrivall</h2>
                <Button
                    title="view more"
                    clr="black"
                    bgclr="white"
                    border={2}
                    fntSize={"20px"}
                    pading={ "5px 15px"}
                />

            </div>
    </div>
  )
}

export default HeroHeading
