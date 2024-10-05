const mongoose = require('mongoose');


const Schema = mongoose.Schema

const projectSchema = new Schema({
    projectRef: {
        type: String,
        required: true,
        unique: true
    },
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)