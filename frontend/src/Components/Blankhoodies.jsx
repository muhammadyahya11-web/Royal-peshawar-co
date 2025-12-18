import React, { useContext, useEffect ,useState} from 'react'
import { ShopContext } from '../Conntex/ShopContext'
import Button from './button/Button';
import Product from './Product';


function Blankhoodies() {
    const { products } = useContext(ShopContext);
    const [latestproduct, setlatestproduct] = useState([])
    
    
    
    useEffect(() => {

        setlatestproduct(products.slice(8,12))
     
    }, [])
    

    return (
        <div className='bg-[#ffff] max-w-full p-3    flex flex-col ' >
          
            <h2 className='text-4xl mt-10  ml-7  '>Blank Hoodies</h2>
             <div className="prodct-list hidde-scrol grid gap-4 grid-flow-col overflow-x-scroll   sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  grid-cols-2 mt-6  ">
             {
                 latestproduct.map((item, index) => (
                <Product key={item.id || index} product={item} />
                 ))   
             }
             </div>
             {/* ====================================== */}
              <div className=' w-full flex justify-center  ' ><Button  title={"view more"}  clr={"black"} bgclr={"white"} border={2}   /></div>
             

        </div>
    );
}

export default Blankhoodies;

