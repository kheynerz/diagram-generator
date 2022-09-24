const express = require('express');
const router = express.Router();
const structureController = require('../controllers/structure')

router.get('/structure', (req,res) =>{
<<<<<<< HEAD
   structureController.getJson(req.query)
    .then(result => res.json({...result, res : JSON.parse(result.res[0].get_json) }))
    .catch(result => res.json(result))
=======
    structureController.getJson(req.query)
    .then(result => res.json(result))
    .catch(result => res.status(result.code).json(result))
>>>>>>> 2ba3a74de166c02471e4681b33aebe0adf0b016f
})
module.exports = router;
