var express = require('express');
var router = express.Router();
var bodyParser=require('body-parser');
const mongoose = require('mongoose');
const modelSanPham = require('../models/sanPham');

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
      if(req.isAuthenticated())
        res.render('trang_chu', {usr: "Xin chào:"+ req.user.email});
      else
        res.render('trang_chu', {usr: ""});
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

module.exports = router;
