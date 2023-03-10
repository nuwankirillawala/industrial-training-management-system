const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const undergraduateRoutes = require('./routes/undergraduateRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const companyRoutes = require('./routes/companyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const { requireAuth } = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {});
app.get("/test",  (req, res) => {
    res.send("Success");
});

app.use(authRoutes);
app.use(adminRoutes);
app.use(undergraduateRoutes);
app.use(supervisorRoutes);
app.use(alumniRoutes);
app.use(companyRoutes);
app.use(noticeRoutes);



module.exports = app;