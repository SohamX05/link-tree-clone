const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
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

app.get('/api/projects', async (req, res) => {
    try{
        const allData = await Project.find();
        res.status(200).json({ message: "Data retrieved successfully", data: allData});
    } catch (error){
        res.status(500).json({ error: "Failed to fetch data", details: error.message});
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Link deleted successfully!"});
    } catch (error) {
        console.error("Error deleting link: ", error);
        res.status(500).json({ success: false, message: "Failed to delete link!"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});