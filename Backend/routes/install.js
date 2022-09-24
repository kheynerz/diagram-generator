const express = require('express');
const router = express.Router();

const installController = require('../controllers/install')

router.post('/install', function(req, res) {
  console.log(req.body);
    installController
      .installProcedures(req.body)
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
});
  
router.get('/install', (req,res) => {
    installController
      .checkSchema(req.query)
      .then(result => res.json({...result, res : result.res[0].check_schema}))
      .catch(err => res.json(err))
})

module.exports = router;
