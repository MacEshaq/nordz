const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// GET ALL PROJECTS
const getProjects = async (req, res) => {
    const projects = await Project.find({})

    res.status(200).json(projects)
}

// GET SINGLE PROJECT
const getProject = async (req, res) => {
    const { id } = req.params

    // when the id is not mongoose id object type.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID is not mongoose type' })
    }
    const project = await Project.findById(id);
    if (!project) {

        // the id project type is according to mongoose type but the id simply not exist.
        return res.status(404).json({ msg: "No such project" })
    }

    res.json(project)
}

//CREATE PROJECT
const createProject = async (req, res) => {
    const {
        projectRef,
        projectName,
        owner,
        duration,
        start,
        end,
        status
    } = req.body
    // add to db
    console.log(req.body)

    // error if ie 'req.body.projectRef' is empty (user did not enter any info) then push string text pf 'projectRef' into the emptyFields.
    let emptyFields = []

    if (!projectRef) {
        emptyFields.push('projectRef')
    }
    if (!projectName) {
        emptyFields.push('projectName')
    }
    if (!owner) {
        emptyFields.push('owner')
    }
    if (!duration) {
        emptyFields.push('duration')
    }
    if (!start) {
        emptyFields.push('start')
    }
    if (!end) {
        emptyFields.push('end')
    }
    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {

        //this wil be send to the browser and wont proceed to create the project in the DB.
        //in the client's will have the access to 'emptyFields' and 'ProjectForm.js' which being render to (pages > Home.js component) will use it to display any error.
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const project = await Project.create({
            projectRef,
            projectName,
            owner,
            duration,
            start,
            end,
            status
        })
        return res.status(200).json(project)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }

}

//UPDATE PROJECT
const updateProject = async (req, res) => {
    const { id } = req.params
    // when the id is not mongoose id object type.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID is not mongoose type' })
    }

    const project = await Project.findByIdAndUpdate({ _id: id }, { ...req.body });
    if (!project) {

        // the id project type is according to mongoose type but the id simply not exist.
        return res.status(404).json({ msg: "No such project" })
    }
    res.status(200).json(project)
}

//DELETE PROJECT
const deleteProject = async (req, res) => {
    const { id } = req.params

    // when the id is not mongoose id object type.
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: 'ID is not mongoose type' })
    }

    const project = await Project.findByIdAndDelete({ _id: id });
    if (!project) {

        // the id project type is according to mongoose type but the id simply not exist.
        return res.status(404).json({ msg: "No such project" })
    }

    res.status(200).json(project)
}

module.exports = {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}