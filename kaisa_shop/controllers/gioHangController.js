const modelGioHang = require('../models/gioHang');

exports.gioHang = function (req, res, next) {
    if (req.isAuthenticated()) {
        modelGioHang.find({ "idUser": req.user._id }).exec(function (err, cart) {
            if (err) {
                console.log("Thông báo: Không kết nối được với chi tiết giỏ hàng!\n");
            } else {
                res.render('./user/mua_hang/gio_hang', {
                    title: 'Giỏ Hàng',
                    cartData: cart,
                    currentUser: req.user
                });
            }
        });
    }
    else {
        res.render('./user/mua_hang/gio_hang', {
            title: 'Giỏ Hàng',
            currentUser: req.user
        });
    }
    //res.send('user/san_pham');
}

// sleep time expects milliseconds
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

exports.themGioHang = function (req, res, next) {
    modelGioHang.collection.insertOne({
        idUser: req.body.iduser,
        hinh: req.body.hinh,
        ten: req.body.ten,
        gia: req.body.gia,
        soLuong: req.body.soluong
    });
sleep(2000).then(() => {
    modelGioHang.find({ "idUser": req.user._id }).exec(function (err, cart) {
        if (err) {
            console.log("Thông báo: Không kết nối được với chi tiết giỏ hàng!\n");
        } else {
            res.render('./user/mua_hang/gio_hang', {
                title: 'Giỏ Hàng',
                cartData: cart,
                currentUser: req.user
            });
        }
    });
});
}