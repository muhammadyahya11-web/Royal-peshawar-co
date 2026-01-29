import jwt from "jsonwebtoken";

export const adminAuthorization = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
console.log("tookn " ,authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
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
