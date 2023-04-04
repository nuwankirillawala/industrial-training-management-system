const express = require('express');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const undergraduateRoutes = require('./routes/undergraduateRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const companyRoutes = require('./routes/companyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');

const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('*', checkUser);
app.get('/', (req, res) => {});
app.get("/test",  (req, res) => {
    res.send("Success");
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/undergraduate', undergraduateRoutes);
app.use('/api/v1/supervisor', supervisorRoutes);
app.use('/api/v1/alumni', alumniRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/notice', noticeRoutes);



module.exports = app;