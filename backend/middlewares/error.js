// error.js

module.exports = (err, req, res, next) => {
    // Set the status code for the error response
    err.statusCode = err.statusCode || 500;

    // Development error handler
    if (process.env.NODE_ENV === 'development') {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            stack: err.stack, // Include the stack trace for debugging
            error: err // Include the error object
        });
    }

    // Production error handler
    if (process.env.NODE_ENV === 'production') {
        let message = err.message;
        let error = new Error(message);

        // Handle validation errors
        if (err.name === "ValidationError") {
            message = Object.values(err.errors).map(value => value.message).join(', ');
            error = new Error(message);
            err.statusCode = 400; // Bad Request
        }

        // Handle cast errors (e.g., invalid ObjectId)
        if (err.name === 'CastError') {
            message = `Resource not found: ${err.path}`;
            error = new Error(message);
            err.statusCode = 404; // Not Found
        }

        // Handle duplicate key errors
        if (err.code === 11000) {
            message = `Duplicate field value: ${Object.keys(err.keyValue).join(', ')}`;
            error = new Error(message);
            err.statusCode = 400; // Bad Request
        }

        // Handle JWT errors
        if (err.name === 'JsonWebTokenError') {
            message = `JSON Web Token is invalid. Try again`;
            error = new Error(message);
            err.statusCode = 401; // Unauthorized
        }

        if (err.name === 'TokenExpiredError') {
            message = `JSON Web Token is expired. Try again`;
            error = new Error(message);
            err.statusCode = 401; // Unauthorized
        }

        // Send error response
        res.status(err.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error',
        });
    }
};
