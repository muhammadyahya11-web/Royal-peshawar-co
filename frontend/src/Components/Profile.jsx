import React from "react";
import { User, Mail, Phone, MapPin, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../Conntex/ShopContext";
import { useState ,useEffect } from "react";
import axios from "axios";

export default function MyProfile() {
  const navigate = useNavigate();
const { tooken} = useContext(ShopContext)
const [data, setdata] = useState('')
const [orderslength, setorderslength] = useState(null)
   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/user/getcurrentuser",
          
          {
            headers: { Authorization: `Bearer ${tooken}` },
          }
         

        );
        setdata(res.data.user);
      
        
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (tooken) fetchProfile();
  }, [tooken]);
  // ====================================================================
      useEffect(() => {
    const fetchorder = async () => {
      try {
        const orders = await axios.get(
          "http://localhost:8000/api/order/orders",
          
          {
            headers: { Authorization: `Bearer ${tooken}` },
          }
         

        );
        
        setorderslength(orders.data.orders.length)
        
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (tooken) fetchorder();
  }, [tooken]);


  const user = {
    name: data.name ,
    email: data.email ,
    phone: data.phone ,
    address: data.address,
    orders: orderslength,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-black text-white px-8 py-6">
          <h2 className="text-3xl font-semibold tracking-wide">My Profile</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {/* Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="font-semibold text-xl mb-6">Personal Information</h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-4">
                <User size={20} className="text-gray-500" />
                <span className="font-medium">{user.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <Mail size={20} className="text-gray-500" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gray-500" />
                <span>{user.phone}</span>
              </div>

              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-gray-500" />
                <span>{user.address}</span>
              </div>
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-xl mb-6">Account Summary</h3>

              <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-xl shadow-inner">
                <Package size={36} className="text-black" />
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold">{user.orders}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/edit-profile")}
              className="mt-8 w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-900 transition shadow-md"
            >
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
