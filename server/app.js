const express = require('express');
//const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {});
//app.use(authRoutes);


module.exports = app;