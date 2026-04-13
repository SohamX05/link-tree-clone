const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.port || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB is successfully connected"))
    .catch((err) => console.log("Database connection failed: ", err));

app.get('/', (req, res) => {
    res.json({
        status: "Success",
        message: "API is fully operational",
        developer: "Soham",
        technologies: ["Node.js", "Express"]
    });
});

const Project = require('./models/Project');

app.post('/api/projects', async (req, res) => {
    try{
        const projectData = req.body;
        const newProject = new Project(projectData);
        await newProject.save();
        res.status(201).json({message: "Project saved successfully.", data: newProject});
    }catch (error){
        res.status(400).json({message: "Failed to save the Project.", details: error.message});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});