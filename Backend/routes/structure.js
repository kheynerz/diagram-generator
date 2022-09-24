const express = require('express');
const router = express.Router();
const structureController = require('../controllers/structure')

router.get('/structure', (req,res) =>{
   structureController.getJson(req.query)
    .then(result => res.json({...result, res : JSON.parse(result.res[0].get_json) }))
    .catch(result => res.json(result))
})
module.exports = router;
