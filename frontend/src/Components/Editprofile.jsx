import React, { useState, useEffect, useContext } from "react";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";
import axios from "axios";
import { ShopContext } from "../Conntex/ShopContext";

export default function EditProfile() {
  const { tooken } = useContext(ShopContext); // JWT token
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 🔹 Load existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/user/getcurrentuser",
          {
            headers: { Authorization: `Bearer ${tooken}` },
          }
        );
      
        console.log(res.data.user);
        
        setFormData(res.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (tooken) fetchProfile();
  }, [tooken]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:8000/api/user/updateprofile",
        formData,
        {
          headers: { Authorization: `Bearer ${tooken}` },
        }
      );
      alert(res.data.message);
      console.log("Updated Profile:", res.data.user);
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-6">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <p className="text-gray-300 text-sm">
            Update your personal information
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 mt-1">
              <User size={18} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 mt-1">
              <Mail size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium">Phone</label>
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 mt-1">
              <Phone size={18} />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium">Address</label>
            <div className="flex items-center gap-3 border rounded-lg px-3 py-2 mt-1">
              <MapPin size={18} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Save size={18} />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}