import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
try {
// Get Authorization header

const authHeader = req.headers.authorization;
if (!authHeader) {
return res.status(401).json({
message: "No authentication token provided",
});
}
if (!authHeader.startsWith("Bearer ")) {
return res.status(401).json({
message: "Invalid authentication format",
});
}

// Get token
    
const token = authHeader.split(" ")[1];
if (!token) {
return res.status(401).json({
message: "Invalid token",
});
}
const decoded = jwt.verify(
token,
process.env.JWT_SECRET
);

req.student = {
id: decoded.id,
};
next();
} catch (error) {
console.error(
"Authentication Error:",
error.message
);
return res.status(401).json({
message: "Invalid or expired token",
});
}
};
export default authMiddleware;