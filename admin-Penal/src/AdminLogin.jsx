import axios from 'axios'
import React, { useContext, useEffectEvent } from 'react'
import { useState, useEffect } from 'react'
import { AdminCotext } from './AdminCotext'

function AdminLogin() {
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const { tooken, settooken } = useContext(AdminCotext)
    const [error, seterror] = useState(null)

    const loginhandler = async (e) => {

        e.preventDefault()
        
        try {
            

            const res = await axios.post("http://localhost:8000/api/auth/adminlogin", { email, password } ,{ withCredentials: true })
            console.log(res.data.token);
            
            if (res.status === 200) {
                settooken(res.data.token);
             localStorage.setItem("tooken" , res.data.token )
            

                
            }
            if (res.status === 401) {
                console.log("api nott working");
            }
        } catch (error) {
            seterror("some error in api ", error);
        }
    }

    setTimeout(() => {
        seterror(null)
    }, 4000);
    // ===============================================================================
    
      
    return (
        <>
            <div className="customer-login-page font-raleway  h-screen w-full flex justify-center items-center bg-[#ffff] ">

                <div className="customer-login-cart  flex items-center flex-col   w-[400p] bg-[#e5e5f0] py-[6%] px-[2%] shadow-amber-950 rounded-2xl">

                    <h1 className='font-bold text-2xl mb-7'>ADMIN LOGIN</h1>
                    <div className="login-container  flex flex-col items-center ">

                        <form onSubmit={loginhandler} className='mt-1   flex items-center flex-col gap-3 '>

                            <input type="Email" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Email' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
                            <input type="text"  value={password} onChange={(e) => { setpassword(e.target.value) }} placeholder='Password' className=' w-70 bg-[#f6f6f6] rounded-[7px] px-7 py-3' />
                            <button type='submit' className='  rounded-[7px] bg-[#f6f6f6] px-7 py-3 w-70 '>Submit </button>
                            <p className='text-[13px] mb-1 text-gray-700'>{error}</p>


                        </form>

                    </div>

                </div>



            </div>
        </>
    )
}

export default AdminLogin
