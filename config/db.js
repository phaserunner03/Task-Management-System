const mongoose = require('mongoose');
const uri ="mongodb+srv://bhavyashah:fjUbcQPNOPgQpzo8@cluster0.v1wyx.mongodb.net/taskmanagement?retryWrites=true&w=majority&appName=Cluster0"
// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDB };


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTA5MDVmYjFiODE3YzM5NGMxMTk5NSIsImlhdCI6MTczNzUzMDI5MCwiZXhwIjoxNzM3NTMzODkwfQ.Pq3ZF-pxOK7Ts9BtzF_V6JpWcPDtL_YDz0mEasGHuu0