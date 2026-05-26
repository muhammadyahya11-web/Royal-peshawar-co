import React, { useContext, useState } from "react";
import logo from "./../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Conntex/ShopContext";
import { API_BASE } from "../config/api.js";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [message, setmessage] = useState("");

  const { settooken } = useContext(ShopContext);

  /* ================= SIGNUP ================= */

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setmessage("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      if (response.data?.token) {
        settooken(response.data.token);

        toast.success(
          response.data.message || "Account created successfully"
        );

        navigate("/");
      } else {
        setmessage(response.data?.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);

      setmessage(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }

    setTimeout(() => {
      setmessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#f5f5f7] px-4">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-xl border border-gray-100 p-8">
        {/* LOGO */}

        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="logo"
            className="h-24 object-contain"
          />

          <h1 className="text-3xl font-bold text-gray-900 mt-2">
            Create Account
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Join Royal Peshawar Store
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-5"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Full Name"
            className="w-full h-14 bg-[#fafafa] border border-gray-200 rounded-2xl px-5 outline-none focus:border-black transition"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email Address"
            className="w-full h-14 bg-[#fafafa] border border-gray-200 rounded-2xl px-5 outline-none focus:border-black transition"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="w-full h-14 bg-[#fafafa] border border-gray-200 rounded-2xl px-5 outline-none focus:border-black transition"
          />

          <button
            type="submit"
            className="w-full h-14 bg-black hover:bg-gray-900 text-white rounded-2xl font-semibold transition-all duration-300"
          >
            Create Account
          </button>

          {message && (
            <p className="text-sm text-center text-red-500">
              {message}
            </p>
          )}

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;