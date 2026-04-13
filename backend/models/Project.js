const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        requires: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timeStamps: true});

module.exports = mongoose.model('Project', projectSchema);