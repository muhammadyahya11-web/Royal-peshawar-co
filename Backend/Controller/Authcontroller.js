import User from "../Module/UUserModule.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { genToken } from "../Config/token.js";

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
    const token = await genToken(user._id);

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
      user,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(404).json({ message: "Some error in signup" });
  }
};

// ============================login ============================================
 export const login = async (req , res)=>{
    try {
        const {email , password} = req.body
       const user = await User.findOne({email})
        if(!user){
           return res.send({ status : 404 , message : "this user cannot exist"})
        }
       const  passwordCom = await bcrypt.compare(password ,user.password)
       if(!passwordCom){
           return  res.send({ status : 404 , message : "invalid pasword"})
       }
        
    const token = await genToken(user._id);

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true if using HTTPS
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
        
      return res.send({ status : "400" , message : "Sucessful Login "})
    } catch (error) {
          return res.send({ status : "404" , message : "Login error "})
    }
}
// =================logOut====================================================

export const  logout = async (req ,res) =>{
   try {
      await res.clearCookie("token")
    return res.send({ status : "200" , message : "Logout Successfuly"})
    
   } catch (error) {
    return res.send({ status : "404" , message : "Logout error "})
   }


}