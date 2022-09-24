const express = require('express');
const router = express.Router();

const projectsController = require('../controllers/projects')


router.get('/projects', (req,res) =>{
    projectsController.getProjects(req.query)
    .then(result => res.json({...result, res : JSON.parse(result.res[0].get_projects)}))
    .catch(result => res.status(result.code).json(result))
})

module.exports = router;