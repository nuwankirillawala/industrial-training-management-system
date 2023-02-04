const mongoose = require('mongoose');
const app = require('./app');

// mongodb database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECTION_URL);

const port = '5000';
const server = app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
});