var express = require('express');
var router = express.Router();


router.get('/', function(_, res) {
  res.send('<center><h1>Bases de datos II:  DB PlantUML Generator </h1></center>')
});

module.exports = router;
