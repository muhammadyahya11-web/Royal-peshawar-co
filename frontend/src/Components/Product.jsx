import { Link } from "react-router-dom";
import Button from "./button/Button";

function Product({product}) {
   
    return (
       <Link to={`/product/ ${product._id}`} >
       <div className=" sm:text-sm md:lg lg:lg xl:xl cursor-pointer shadow-gray-900  ">
        {/*  ==========================product img =================== */}
         <div className='sm:m-2  m-1  overflow-hidden   sm:mb-10 mb-5   '>
          <div className="img-container relative flex flex-col items-center ">
             <img className="  rounded overflow-hidden  hover:scale-110 transition   ease-in-out  " src={product.images[0]} alt="product" />
            <div className="eye-container absolute ">
            </div>
          </div>

             {/* ====================product detail========================= */}

            <div className=" flex flex-col  mt-4 text-sm w-full ">
            <p className="  text-sm text-green-800 font-bold ">RS: {product.price} </p>
            <div className=" text-sm   "><p>{product.name}</p></div>
           
            <div className=" text-end ">
            </div>
            {/* <span className=" mt-5 h-[17px] w-[17px] bg-amber-950 rounded-full  "></span> */}
        </div>
        </div>
       </div>
       </Link>
    );
}
export default Product
