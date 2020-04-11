const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
    // eslint-disable-next-line
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (err) {
    // eslint-disable-next-line
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
