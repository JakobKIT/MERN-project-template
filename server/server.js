const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
// eslint-disable-next-line
const colors = require('colors');
const helmet = require('helmet');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');
const initializeTestUser = require('./utils/initializeTestUser');
const initializeTestPosts = require('./utils/initializeTestPosts');

// Change between production and dev settings
dotenv.config({ path: path.resolve(__dirname, 'config', `config.${process.env.NODE_ENV}.env`) });

// Setup DB Connection
connectDB();

const app = express();

// Development Setup
if (process.env.NODE_ENV === 'development') {
  // Data Seeding here
  initializeTestUser();
  initializeTestPosts();
  // eslint-disable-next-line
  app.use(require('morgan')('dev'));
}

// Put all the server-wide middleware here
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
app.use(express.json());

// All routes here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

// Custom middleware here
app.use(notFound);
app.use(errorHandler);

// Production setup
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,
  // eslint-disable-next-line
  console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
