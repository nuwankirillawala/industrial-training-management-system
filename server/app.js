const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {});
app.get("/test", requireAuth, (req, res) => {
    res.send("Success");
})
app.use(authRoutes);
app.use(adminRoutes);


module.exports = app;