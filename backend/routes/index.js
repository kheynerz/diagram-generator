var express = require('express');
var router = express.Router();


router.get('/', function(_, res) {
  let data = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
]
  res.json(data);
});

module.exports = router;
