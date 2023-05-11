const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const undergraduateRoutes = require('./routes/undergraduateRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const companyRoutes = require('./routes/companyRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const { checkUser } = require('./middleware/authMiddleware.js');

const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
// app.use(cors());
app.use(cookieParser());

// routes
app.get('*', checkUser);
// app.get('/', (req, res) => { });
app.get("/test", (req, res) => {
    res.send("Success");
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', checkUser, adminRoutes);
app.use('/api/v1/undergraduate', checkUser, undergraduateRoutes);
app.use('/api/v1/supervisor', checkUser, supervisorRoutes);
app.use('/api/v1/alumni', checkUser, alumniRoutes);
app.use('/api/v1/company', checkUser, companyRoutes);
app.use('/api/v1/notice', checkUser, noticeRoutes);



module.exports = app;