import jwt from "jsonwebtoken";

export const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // token 7 دن بعد expire ہوگا
    );
    return token;
  } catch (error) {
    console.error("JWT Token generation error:", error);
    return null;
  }
};
