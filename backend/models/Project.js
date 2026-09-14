const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Image URL
    liveLink: { type: String, required: true },
    githubLink: { type: String },
    category: { type: String, default: 'MERN' } 
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);