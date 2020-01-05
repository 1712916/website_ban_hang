var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const modelSanPham = require('../models/sanPham');

const { check, validationResult } = require('express-validator');
var passport = require('passport')

// =====================================
// FACEBOOK ROUTES =====================
// =====================================
// yêu cầu xác thực bằng facebook
router.get('/facebook', passport.authenticate('facebook'));
// xử lý sau khi user cho phép xác thực với facebook
router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/index',
        failureRedirect: '/users/tai_khoan/dang_nhap'
    })
);

module.exports = router;