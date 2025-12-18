


import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Conntex/ShopContext'
import Button from './button/Button';
import Product from './Product';


function LatestCollaction() {
    const { products } = useContext(ShopContext);
    const [latestproduct, setlatestproduct] = useState([])



    useEffect(() => {

        setlatestproduct(products.slice(5, 15))

    }, [])


    return (
        <div className="  w-full p-3 flex  justify-center  flex-col">




            <div
                className=" grid grid-cols-2  sm:grid-cols-5  ">
                {latestproduct.map((item, index) => (
                    <Product key={item.id || index} product={item} />
                ))}
            </div>



        </div>
    );

}

export default LatestCollaction;



