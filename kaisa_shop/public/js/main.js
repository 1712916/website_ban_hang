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

function prevPagination() {
  var currentURL = window.location.href;
  var currentPage = parseInt(getCurrentPage(currentURL));
  if (currentPage == 1) {
    return;
  }
  currentURL = currentURL.substring(0, currentURL.lastIndexOf("/")) + "/" + (currentPage - 1);
  window.location.assign(currentURL);
}

function nextPagination() {
  var itemPerPage = 3;
  var itemTotal = 10;
  var pageTotal = Math.ceil(itemTotal / itemPerPage);
  var currentURL = window.location.href;
  var currentPage = parseInt(getCurrentPage(currentURL));
  if (currentPage == pageTotal) {
    return;
  }
  currentURL = currentURL.substring(0, currentURL.lastIndexOf("/")) + "/" + (currentPage + 1);
  window.location.assign(currentURL);
}

function goToPage2() {
  var currentURL = window.location.href;
  var currentPage = parseInt(getCurrentPage(currentURL));
  currentURL = currentURL.substring(0, currentURL.lastIndexOf("/")) + "/" + (currentPage + 1);
  window.location.assign(currentURL);
}

function goToPage3() {
  var currentURL = window.location.href;
  var currentPage = parseInt(getCurrentPage(currentURL));
  currentURL = currentURL.substring(0, currentURL.lastIndexOf("/")) + "/" + (currentPage + 2);
  window.location.assign(currentURL);
}

function updatePagination() {
  var itemPerPage = 3;
  var itemTotal = 10;
  var pageTotal = Math.ceil(itemTotal / itemPerPage);
  var currentURL = window.location.href;
  var currentPage = parseInt(getCurrentPage(currentURL));
  var pagination = $("#pagination");
  var maxViewPage = pageTotal - currentPage + 1;
  if (maxViewPage > 3) {
    maxViewPage = 3;
  }
  //pagination.empty();
  pagination.append('<li class="page-item"><a class="page-link" onclick="prevPagination();">Trước</a></li>');
  pagination.append('<li class="active page-item"><a class="page-link" id="link1">' + currentPage + '</a></li>');
  for (i = 2; i <= maxViewPage; i++) {
    pagination.append('<li class="page-item"><a class="page-link" onclick="goToPage' + i + '()" id="link' + i + '">' + (currentPage + i - 1) + '</a></li>');
  }
  pagination.append('<li class="page-item"><a class="page-link" onclick="nextPagination(); ">Sau</a></li>');
}