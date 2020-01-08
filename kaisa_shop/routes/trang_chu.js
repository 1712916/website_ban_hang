var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modelSanPham = require('../models/sanPham');
var User = require('../models/user.model');
const { check, validationResult } = require('express-validator');
var passport = require('passport')
var order = require('../models/order');
var Cart = require('../models/gioHang');


router.get('/index', function (req, res, next) {

  res.render('trang_chu', {});

});
var usercurrent;
router.get('/', function (req, res, next) {

  modelSanPham.find().exec((err, docs) => {
    if (err) {
      res.render('layout', {});
    }
    else {
      //console.log(docs);    
      console.log(req.user);
      if (req.isAuthenticated()) {
        usercurrent = req.user;
        console.log('thacog');
        res.render('trang_chu', { isAuthenticated: req.isAuthenticated(), usr: "Xin chào: " + req.user.local.email });
      }
      else {
        console.log('thatbai');
        res.render('trang_chu', { usr: "" });
      }
    }
  });
});
router.get('/logout', function (req, res, next) {
  usercurrent = null;
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

router.get('/profile_edit', function (req, res, next) {
  res.render('profile_edit');
})
router.post('/profile_edit', function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.body.fullname !== "") {
      User.findOneAndUpdate({ "local.email": usercurrent.local.email }, { $set: { "local.info.fullname": req.body.fullname } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    }

    if (req.body.address !== "") {
      User.findOneAndUpdate({ "local.email": usercurrent.local.email }, { $set: { "local.info.address": req.body.address } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    }

    if (req.body.phone !== "") {
      User.findOneAndUpdate({ "local.email": usercurrent.local.email }, { $set: { "local.info.phone": req.body.phone } }, function (err, result) {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
    }
    res.redirect('/profile');
  }
})
router.get('/profile', async function (req, res, next) {
  if (req.isAuthenticated()) {
    var listOrder1;
    order.find({ "nguoiMua": usercurrent._id }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      listOrder1 = result;
    })
    User.findOne({ "local.email": usercurrent.local.email }, function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      usercurrent = result;

      res.render('profile', {listOrder: listOrder1, email: usercurrent.local.email, fullname: usercurrent.local.info.fullname, address: usercurrent.local.info.address, phone: usercurrent.local.info.phone });
    })
  }
})

module.exports = router;
