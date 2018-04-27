var express = require('express');
var router = express.Router();

router.get('/log.html',function(req, res, next){
  alert(1);
  res.send('sup');
});

module.exports = router;
