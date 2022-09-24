const express = require('express');
const router = express.Router();

const structureController = require('../controllers/structure')


router.get('/structure', (req,res) =>{
    structureController.getJson(req.query)
    .then(result => res.json(result))
    .catch(result => res.status(result.code).json(result))
})

module.exports = router;
