var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modelSanPham = require('../models/sanPham');
var User = require('../models/user.model');
const { check, validationResult } = require('express-validator');
var passport = require('passport')



router.get('/index', function (req, res, next) {

  res.render('trang_chu', {});

});

router.get('/', function (req, res, next) {

  modelSanPham.find().exec((err, docs) => {
    if (err) {
      res.render('layout', {});
    }
    else {
      //console.log(docs);    
      console.log(req.user);
      if (req.isAuthenticated()) {

        console.log('thacog');
        res.render('trang_chu', {isAuthenticated: req.isAuthenticated(),usr: "Xin chào: " + req.user.local.email });
      }
      else {
        console.log('thatbai');
        res.render('trang_chu', { usr: "" });
      }
    }
  });
});
router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});


router.get('/', function (req, res) {
  res.redirect('/catalog');
});

router.get('/comfirmation/:token', function (req, res, next) {
  console.log('Dang o day !!!!!!!!!!!!!!!!!!!!!');
  User.findOneAndUpdate({ "local.verify_token": req.params.token }, { $set: { "local.verified": true } }, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result)
  });

  res.redirect('/');
})



router.get('/profile', function (req, res, next) {
  res.render('profile', {});
})
module.exports = router;
