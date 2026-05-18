require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');

const app = express();

connectDB();

app.use(express.json());                      // parse JSON bodies
app.use('/api/users', userRoutes);            // mount routes

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});