// config/database.js
const mongoose = require('mongoose');

const connectDatabase = () => {
  const dbURI = process.env.MONGODB_URI || 'mongodb+srv://sowmiya:Dharshan123@cluster0.mongodb.net/ktspets?retryWrites=true&w=majority';

  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB:', err.message);
      process.exit(1);  // Exit the process if database connection fails
    });
};

module.exports = connectDatabase;
