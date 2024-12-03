const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const Razorpay = require('razorpay');
const errorMiddleware = require('./middlewares/error');
const connectDatabase = require('./config/database');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config/config.env') });

const app = express();

// Call the function to connect to the database
connectDatabase();

// Middleware
app.use(cors({
    origin: 'http://3.110.194.242:5001' // Replace with your frontend's domain
  }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/order');
const paymentRouter = require('./routes/payment');
const fishRouter = require('./routes/fish');
const dogRouter = require('./routes/dog');
const catRouter = require('./routes/cat');
const birdsRouter = require('./routes/birds');
const fishaccessoriesRouter = require('./routes/fishAccessories');
const dogaccessoriesRouter = require('./routes/dogaccessories');
const cataccessoriesRouter = require('./routes/catAccessories');
const birdsaccessoriesRouter = require('./routes/birdsAccessories');
const importedtanksRouter = require('./routes/Tanks');

// Mount routers
app.use('/api/v1/', fishaccessoriesRouter);
app.use('/api/v1/', authRouter);
app.use('/api/v1/', orderRouter);
app.use('/api/v1/', paymentRouter);
app.use('/api/v1/', fishRouter);
app.use('/api/v1/', dogRouter);
app.use('/api/v1/', catRouter);
app.use('/api/v1/', birdsRouter);
app.use('/api/v1/', dogaccessoriesRouter);
app.use('/api/v1/', cataccessoriesRouter);
app.use('/api/v1/', birdsaccessoriesRouter);
app.use('/api/v1/', importedtanksRouter);

// Razorpay Instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Razorpay Order Creation Route
app.post('/api/v1/payment/process', async (req, res) => {
    try {
        const options = {
            amount: 50000,  // amount in paise (for INR)
            currency: "INR",
            receipt: "receipt#1",
            payment_capture: 1
        };
        
        const order = await razorpayInstance.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ error: 'An error occurred while creating the Razorpay order' });
    }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
}

// Error Middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app for testing or server.js
module.exports = app;
