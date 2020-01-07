var express = require('express');
var router = express.Router();
const fs = require('fs');
const url = require('url');
const imageDir = 'public/productsAvatar/';

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    var tenAnh=req.params.id;


    fs.readFile(imageDir + tenAnh, function (err, content) {
      if (err) {
          res.writeHead(400, {'Content-type':'text/html'})
          console.log(err);
          res.end("No such image");    
      } else {
          //specify the content type in the response will be an image
          res.writeHead(400,{'Content-type':'image/jpg'});
          res.end(content);
      }
  });
});

module.exports = router;
