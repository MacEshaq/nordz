const express = require('express');

const router = express.Router();

const {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectsController')

// my own middleware
const requireAuth = require('../middleware/requireAuth')

// require auth for all projects routes
router.use(requireAuth)

router.get('/', getProjects)
router.get('/:id', getProject)
router.post('/', createProject)
router.patch('/:id', updateProject)
router.delete('/:id', deleteProject)


module.exports = router