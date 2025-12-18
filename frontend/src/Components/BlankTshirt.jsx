import React, { useContext, useEffect ,useState} from 'react'
import { ShopContext } from '../Conntex/ShopContext'
import Button from './button/Button';
import Product from './Product';


function Blantshirt() {
    const { products } = useContext(ShopContext);
    const [latestproduct, setlatestproduct] = useState([])
    
    
    
    useEffect(() => {

        setlatestproduct(products.slice(10,14))
     
    }, [])
    

  return (
  <div className="bg-white w-full p-3 flex flex-col">

    <h2 className="text-3xl ml-3 mt-6 sm:text-4xl sm:ml-7 sm:mt-9">
      Blank T-Shirts
    </h2>

    <div
      className="
         hidde-scrol
        prodct-list 
        grid 
        grid-flow-col-2
        gap-4
        overflow-x-auto 
        hide-scroll
        grid-cols-2
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        mt-6
      "
    >
      {latestproduct.map((item, index) => (
        <Product key={item.id || index} product={item} />
      ))}
    </div>

    <div className="w-full flex justify-center mt-4">
      <Button
        title="view more"
        clr="black"
        bgclr="white"
        border={2}
        
      />
    </div>

  </div>
);

}

export default Blantshirt;

