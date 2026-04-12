const express = require('express');
const app = express();
const port = 5000;

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