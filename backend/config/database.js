const mongoose = require('mongoose');

const connectDatabase = async () => {
    const dbUri =
        process.env.NODE_ENV === 'production'
            ? process.env.MONGODB_URI
            : process.env.DB_LOCAL_URI;

    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Database connected successfully!');
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

module.exports = connectDatabase;
