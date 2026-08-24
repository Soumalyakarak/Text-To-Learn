import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      _id: decoded.id || decoded._id, // Standardize to _id
      email: decoded.email
    };
    // console.log("✅ User attached to request:", req.user); // Debugging line
    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

