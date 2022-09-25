const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects')

router.get('/projects', (req,res) =>{
    projectsController.getProjects(req.query)
    .then(result => res.json({...result, res : JSON.parse(result.res[0].get_projects)}))
    .catch(result => res.json(result))
})

router.put('/projects', (req,res) =>{
    projectsController.newProjects(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})


module.exports = router;