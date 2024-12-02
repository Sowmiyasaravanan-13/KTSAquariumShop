const ErrorHandler = require("../utils/errorHandler");
const User = require('../models/userModel');
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies; // Assuming JWT token is stored in cookies
    
    // Check if token is not available
    if (!token) {
        return next(new ErrorHandler('Login first to access this resource', 401));
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID stored in the token payload and attach user to req object
    req.user = await User.findById(decoded.id);

    // If user is found, proceed to the next middleware/route handler
    next();
});

// Middleware to authorize users based on roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource`, 403)); // 403 Forbidden
        }
        // If user is authorized, proceed to the next middleware/route handler
        next();
    };
};
