import React, { useContext, useState } from "react";
import logo from "./../assets/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../Conntex/ShopContext";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { settooken } = useContext(ShopContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      // ✅ Success
      settooken(res.data.token);
      setMessage("Login successful");
      navigate("/collaction");

    } catch (error) {
      // ✅ Proper error handling
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server error. Try again later.");
      }
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-white">
      <div className="w-[400px] bg-[#e5e5f0] rounded-2xl shadow-lg p-6 flex flex-col items-center">

        <h1 className="font-bold text-2xl">Login</h1>
        <img src={logo} alt="logo" className="h-24 -mt-4" />

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 mt-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f6f6f6] rounded-md px-4 py-3"
          />

          {/* PASSWORD WITH SHOW / HIDE */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f6f6f6] rounded-md px-4 py-3 pr-10"
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <p className="text-sm text-center text-red-600">{message}</p>
          )}

          <p className="text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold">
              Signup
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
