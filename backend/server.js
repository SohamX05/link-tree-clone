const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is successfully connected"))
    .catch(() => console.log("Database connection failed: ", err));

app.get('/', (req, res) => {
    res.json({
        status: "Success",
        message: "API is fully operational",
        developer: "Soham",
        technologies: ["Node.js", "Express"]
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});