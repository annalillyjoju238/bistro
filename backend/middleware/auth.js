import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized! Login Again" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ success: false, message: "Error verifying token" });
  }
};

export default authMiddleware;
