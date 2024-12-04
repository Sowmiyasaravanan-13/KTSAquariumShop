const dotenv = require('dotenv');
const path = require('path');
const connectDatabase = require('./config/database');
const app = require('./app');

// Load environment variables
dotenv.config({ path: path.join(__dirname, './config/config.env') });

// Connect to database
connectDatabase();

// Start the server
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`❌ Error: ${err.message}`);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);  // Log stack trace for development mode
    }
    console.error('Shutting down server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`❌ Error: ${err.message}`);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);  // Log stack trace for development mode
    }
    console.error('Shutting down server due to uncaught exception');
    server.close(() => {
        process.exit(1);
    });
});

// Graceful shutdown on SIGINT (Ctrl + C)
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

// Optional: Health Check route
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});
