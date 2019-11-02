var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('trang_chu', { title: 'KaiSa Shop' });
});




module.exports = router;
