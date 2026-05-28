import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { genToken } from "../config/token.js";
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "This user already exists" });
    }

    // 2️⃣ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid Email" });
    }

    // 3️⃣ Check password strength
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // 4️⃣ Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // 6️⃣ Generate token
    const token = genToken(user._id);

    // 7️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if using HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // 8️⃣ Send response
    return res.status(200).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    console.error("Error in register:");
    res.status(404).json({ message: "Some error in signup "  ,error :error});
  }
};

// ============================login ============================================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = genToken(user._id);

    if (!token) {
      return res.status(500).json({ message: "Could not create session" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};
// =================logOut====================================================

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};



// =================================ADMIN============================================


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password ,process.env.ADMIN_EMAIL ,process.env.ADMIN_PASSWORD);
    
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { isAdmin: true, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("toooken" ,token);
      

      return res.status(200).json({
        success: true,
        token,
        message: "Admin login successful",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
