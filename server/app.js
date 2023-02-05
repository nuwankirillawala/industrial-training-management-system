const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {});
app.use(authRoutes);
app.use(adminRoutes);


module.exports = app;