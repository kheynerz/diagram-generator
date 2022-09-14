const express = require('express');
const router = express.Router();

const installController = require('../controllers/install')


router.post('/install', function(req, res) {
    installController
      .installProcedures(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.status(err.code).json(err));
});
  
module.exports = router;

router.get('/checkInstall', (req,res) => {
    installController
      .checkSchema(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(err.code).json(err))
})