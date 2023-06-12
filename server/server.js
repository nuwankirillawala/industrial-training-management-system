const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

class Database {
    constructor() {
        this.isConnected = false;
        this.connect();
    }

    connect() {
        if (!this.isConnected) {
            mongoose.set("strictQuery", false);
            try {
                mongoose.connect(process.env.MONGODB_CONNECTION_URL);
                console.log("Connect mongodb successfully.");
                this.isConnected = true;
            } catch (err) {
                console.log(err.message);
            }
        }
    }
}

// Singleton instance of the Database class
const database = new Database();

const port = '5000';
const server = app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
});
