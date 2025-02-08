const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoroutes');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;