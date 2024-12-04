const mongoose = require('mongoose');

const connectDatabase = () => {
  const dbURI = process.env.MONGODB_URI || 'mongodb+srv://sowmiya:Dharshan123@cluster0.mongodb.net/ktspets?retryWrites=true&w=majority';

  // Options நீக்கப்பட்டது
  mongoose.connect(dbURI)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      process.exit(1); // Connection தோல்வியில் process நிறுத்தப்படுகிறது
    });
};

module.exports = connectDatabase;
