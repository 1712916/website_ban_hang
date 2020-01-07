const modelSanPham = require('../models/sanPham');
var itemPerPage = 3;
const storage = require('node-sessionstorage');

exports.vaoTimKiemTuHeader = function (req, res, next) {
    res.render('./user/tim_kiem', {
        title: 'Kaisa Shop',
        baseUrl: '/users/tim_kiem'
    });
}

exports.timKiemGet = function (req, res, next) {
    //Gọi timKiemGet từ method get từ form trong tim_kiem.hbs
    if (req.query.noiDungSearch != undefined) {
        storage.setItem('noiDungSearch', req.query.noiDungSearch);
    }
    var noiDungSearch = storage.getItem('noiDungSearch');
    if (noiDungSearch == null) {
        noiDungSearch = req.query.noiDungSearch;
    }
    var listWord = noiDungSearch.split(" ");
    var regex = "";
    for (word of listWord) {
        regex = regex + "(";
        for (letter of word) {
            letter = letter.toLowerCase();
            regex = regex + "[" + letter.toUpperCase() + letter + "]";
        }
        regex = regex + ")|";
    }
    regex = regex.substring(0, regex.length - 1);

    modelSanPham.find(
        {
            $or:
                [
                    {
                        tenSanPham:
                        {
                            $regex: regex
                        }
                    },
                    {
                        loaiSanPham:
                        {
                            $regex: regex
                        }
                    },
                    {
                        nhaSanXuat:
                        {
                            $regex: regex
                        }
                    },
                    {
                        moTaSanPham:
                        {
                            $regex: regex
                        }
                    },
                    {
                        mauSac:
                        {
                            $regex: regex
                        }
                    }
                ]
        })
        .skip(req.params.current_page * itemPerPage - itemPerPage)
        .limit(itemPerPage)
        .exec(function (err, products) {
            modelSanPham.count().exec(function (err, count) {
                if (err) {
                    return next(err);
                }
                res.render('./user/tim_kiem', {
                    title: 'Kaisa Shop',
                    data: products,
                    current: req.params.current_page,
                    pages: Math.ceil(count / itemPerPage),
                    baseUrl: '/users/tim_kiem',
                    currentUser: req.user
                });
            });
        });
}

exports.timKiemKetHop = function (req, res, next) {
    //Gọi timKiemKetHop từ method get từ form trong danh_muc_san_pham.hbs
    if (req.query.noiDungSearchKetHop != undefined) {
        storage.setItem('noiDungSearchKetHop', req.query.noiDungSearchKetHop);
    }
    var noiDungSearchKetHop = storage.getItem('noiDungSearchKetHop');
    if (noiDungSearchKetHop == null) {
        noiDungSearchKetHop = req.query.noiDungSearch;
    }
    console.log(noiDungSearchKetHop);
    var listKeywordSearch = noiDungSearchKetHop.split("|");
    var listLoaiSearch = [];

    if (listKeywordSearch[0] != "")
        listLoaiSearch.push({ loaiSanPham: listKeywordSearch[0] });
    if (listKeywordSearch[1] != "")
        listLoaiSearch.push({ nhaSanXuat: listKeywordSearch[1] })
    if (listKeywordSearch[2] != "")
        listLoaiSearch.push({ mauSac: listKeywordSearch[2] });
    if (listKeywordSearch[3] != "") {
        let min, max;
        let regex = /(.+)-(.+)/g;
        let match = regex.exec(listKeywordSearch[3]);
        min = match[1];
        max = match[2];
        listLoaiSearch.push({ giaSanPham: { $gt: min, $lt: max } });
    }
        modelSanPham.find(
        {
            $and:
                listLoaiSearch
        })
        .skip(req.params.current_page * itemPerPage - itemPerPage)
        .limit(itemPerPage)
        .exec(function (err, products) {
            modelSanPham.count().exec(function (err, count) {
                if (err) {
                    return next(err);
                }
                res.render('./user/tim_kiem', {
                    title: 'Kaisa Shop',
                    data: products,
                    current: req.params.current_page,
                    pages: Math.ceil(count / itemPerPage),
                    baseUrl: '/users/tim_kiem_ket_hop',
                    currentUser: req.user
                });
            });
        });
}