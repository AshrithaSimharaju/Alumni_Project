import jwt from 'jsonwebtoken';

// Middleware to authenticate the user using JWT
export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId; // Attach userId to request object
    next(); // Pass control to the next middleware/route handler
  });
};
