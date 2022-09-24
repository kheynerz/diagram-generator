const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects')

router.get('/projects', (req,res) =>{
    console.log(req.query);
    projectsController.getProjects(req.query)
    .then(result => res.json({...result}))
    .catch(res => console.log(res))
})

module.exports = router;