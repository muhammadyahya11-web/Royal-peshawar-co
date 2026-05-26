import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext  ,useEffect} from 'react'
import { ShopContext } from '../../Conntex/ShopContext'
import { useLocation } from 'react-router-dom'
function Search() {

     const {showSearch ,setshowSearch ,visible ,search, setsearch, setvisible} = useContext(ShopContext)
     const Location= useLocation();
        

     const checkLocation = ()=>{
          if(location.pathname === "/collaction" ||"/home" ){
          setvisible(true)
       }
       else{
         setvisible(false)
       }
     }

     useEffect(() => {
         checkLocation()
        
         
    
     }, [Location])
     
     
  return  showSearch && visible ?  (
    <div className=' border-b border-t py-3   text-center bg-gray-50'>
       
         <div className="inline-flex justify-center items-center border border-gray-400 px-5 py-2 rounded-full w-2/4 sm:3/4 md:2/4">
            <input onChange={(e)=>{setsearch(e.target.value)}} className='w-[90%] outline-0 inline-flex ' type="text" placeholder='Search' />
            <img className='w-4 inline cursor-pointer' src={assets.search_icon} alt="" />
        </div>
         <img onClick={(e)=>{ setshowSearch(false) }} className='w-4 inline  ml-5   cursor-pointer' src={assets.cross_icon} />
      
    </div>
    

  ) :null
}

export default Search
