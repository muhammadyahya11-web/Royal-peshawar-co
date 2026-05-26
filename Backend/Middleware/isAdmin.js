import jwt from "jsonwebtoken";

export const adminAuthorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    
    

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // 👇 FIX: token extract karo
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    console.log(token);
    

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    

    if (!decoded.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }
      
    req.admin = decoded;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized admin",
    });
  }
};