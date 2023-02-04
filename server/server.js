const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

// mongodb database connection
mongoose.set("strictQuery", false);
try {
    mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("Connect mongo database successfully.");
} catch (err) {
    console.log(err.message);
}

const port = '5000';
const server = app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
});