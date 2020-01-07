$(function () {
  "use strict";

  //------- Parallax -------//
  skrollr.init({
    forceHeight: false
  });

  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- hero carousel -------//
  $(".hero-carousel").owlCarousel({
    items: 3,
    margin: 10,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      810: {
        items: 3
      }
    }
  });

  //------- Best Seller Carousel -------//
  if ($('.owl-carousel').length > 0) {
    $('#bestSellerCarousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        900: {
          items: 3
        },
        1130: {
          items: 4
        }
      }
    })
  }

  //------- single product area carousel -------//
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false
  });

  //------- mailchimp --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();

  //------- fixed navbar --------//  
  $(window).scroll(function () {
    var sticky = $('.header_area'),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

  //------- Price Range slider -------//
  if (document.getElementById("price-range")) {

    var nonLinearSlider = document.getElementById('price-range');

    noUiSlider.create(nonLinearSlider, {
      connect: true,
      behaviour: 'tap',
      start: [500, 4000],
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        'min': [0],
        '10%': [500, 500],
        '50%': [4000, 1000],
        'max': [10000]
      }
    });


    var nodes = [
      document.getElementById('lower-value'), // 0
      document.getElementById('upper-value')  // 1
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
      nodes[handle].innerHTML = values[handle];
    });

  }

});
function dangxuat() {
  wasSigin = false;
  document.getElementById('xinchao').style.display = "none";
}

function dangnhap() {
  // wasSigin = true;
  //document.getElementById('xinchao').innerHTML="asddddddddddddddd";

  window.alert("aaaaaaaaaaaaa");
}

function getCurrentPage(currentURL) {
  var currentPage = currentURL.substring(currentURL.lastIndexOf("/") + 1);
  return currentPage;
}

function loadGioHang() {
  var gioHang = sessionStorage.getItem('gioHang');
  if (gioHang == null)
    return;
  var listGioHang = gioHang.split("\n");
  var row;
  var listGioHangHTML = "";
  for (row of listGioHang) {
    var item = row.split("|");
    listGioHangHTML = listGioHangHTML +
      `
    <tr>
      <td>
          <div class='media'>
              <div class='d-flex'>
                  <img src="` + item[0] + `"alt='Hình sản phẩm'>
              </div>
              <div class='media-body'>
                  <p>` + item[1] + `</p>
              </div>
          </div>
      </td>
      <td>
          <h5 class="price">VND ` + item[2] + `</h5>
      </td>
      <td>
          <div class='product_count'>
              <input type='number' name='qty' min='1' value="` + item[3] + `" title='Quantity:' class='input-text qty'>
          </div>
      </td>
      <td>
          <h5 class="total">VND ` + (parseInt(item[2]) * parseInt(item[3])).toString() + `</h5>
      </td>
      <td>
        <button onclick="xoaGioHang($(this)); "><i class="fa fa-trash" aria-hidden="true"></i></button>
      </td>
</tr>
    `;
  }

  $("tbody").first().prepend(listGioHangHTML);
  updateCart();
}

function updateCart() {
  var price = [];
  var quantity = [];
  var total = [];
  $(".price").each(function () {
    var priceText = $(this).text();
    price.push(parseInt(priceText.substring(4)));
  });
  $("input[name='qty']").each(function () {
    quantity.push($(this).val());
  });
  $(".total").each(function (index) {
    var totalOneItem = price[index] * quantity[index];
    $(this).text("VND " + totalOneItem);
    total.push(totalOneItem);
  });
  var sumPriceOfAllItem = 0;
  for (item of total) {
    sumPriceOfAllItem = sumPriceOfAllItem + item;
  }
  $(".total-price").text("VND " + sumPriceOfAllItem);
}

function xoaGioHang(currentElement) {
  var td = currentElement.parent();
  var tr = td.parent();
  var idx = tr.index();
  var gioHang = sessionStorage.getItem('gioHang');
  var listGioHang = gioHang.split("\n");
  var newGioHang = "";
  for (var i = 0; i < listGioHang.length; i++) {
    if (i != idx) {
      newGioHang = newGioHang + listGioHang[i] + "\n";
    }
  }
  newGioHang = newGioHang.substring(0, newGioHang.length - 1);
  if (newGioHang == "") {
    sessionStorage.removeItem('gioHang');
    sessionStorage.removeItem('soLuongGioHang');
  }
  else {
    sessionStorage.setItem('gioHang', newGioHang);
    sessionStorage.setItem('soLuongGioHang', (listGioHang.length - 1).toString());
  }
  window.location.assign('/users/mua_hang/gio_hang');
}

function searchKetHop() {
  var noiDungSearchKetHop = "";
  noiDungSearchKetHop = noiDungSearchKetHop + $("[name='category']:checked").siblings().eq(0).children().eq(0).text() + "|";
  noiDungSearchKetHop = noiDungSearchKetHop + $("[name='brand']:checked").siblings().eq(0).children().eq(0).text() + "|";
  noiDungSearchKetHop = noiDungSearchKetHop + $("[name='color']:checked").siblings().eq(0).children().eq(0).text() + "|";
  var tmp = $("[name='price']:checked").siblings().eq(0).children().eq(0).text();
  if (tmp == "Nhỏ hơn 1000000")
    tmp = "0-1000000";
  else if (tmp == "Lớn hơn 30000000")
    tmp = "30000000-Infinity";
  noiDungSearchKetHop = noiDungSearchKetHop + tmp + "|";
  noiDungSearchKetHop = noiDungSearchKetHop.substring(0, noiDungSearchKetHop.length - 1);
  return noiDungSearchKetHop;
}