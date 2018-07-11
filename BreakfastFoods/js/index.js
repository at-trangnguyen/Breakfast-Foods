var products = [
  {
    "id": '1',
    "name": "Coffee - 10oz Cup 92961",
    "price": 111,
    "old_price": 279,
    "rating": 1,
    "is_sale": false,
    "color": "Green",
    "size": "2XL"
  },
  {
    "id": '2',
    "name": "Fenngreek Seed",
    "price": 169,
    "old_price": 132,
    "rating": 2,
    "is_sale": false,
    "color": "Pink",
    "size": "L"
  },
  {
    "id": '3',
    "name": "Beer - Camerons Auburn",
    "price": 255,
    "old_price": 115,
    "rating": 3,
    "is_sale": false,
    "color": "Turquoise",
    "size": "2XL"
  },
  {
    "id": '4',
    "name": "Sauce - Hoisin",
    "price": 115,
    "old_price": 85,
    "rating": 4,
    "is_sale": true,
    "color": "Indigo",
    "size": "XL"
  },
  {
    "id": '5',
    "name": "Syrup - Kahlua Chocolate",
    "price": 153,
    "old_price": 160,
    "rating": 5,
    "is_sale": true,
    "color": "Green",
    "size": "XL"
  },
  {
    "id": '6',
    "name": "Garlic - Peeled",
    "price": 195,
    "old_price": 203,
    "rating": 6,
    "is_sale": false, 
    "color": "Blue", 
    "size": "3XL" 
  },
  {
    "id": '7',
    "name": "Chocolate - Mi - Amere Semi",
    "price": 27,
    "old_price": 194,
    "rating": 7,
    "is_sale": true,
    "color": "Blue",
    "size": "2XL"
  },
  {
    "id": '8',
    "name": "Muffins - Assorted",
    "price": 224,
    "old_price": 192,
    "rating": 8,
    "is_sale": true,
    "color": "Blue",
    "size": "XL"
  },
  { "id": '9',
    "name": "Asparagus - Mexican",
    "price": 69,
    "old_price": 247,
    "rating": 9,
    "is_sale": true,
    "color": "Teal",
    "size": "L"
  }
];

var keyLocalStorage = {
  count: 'count',
  total: 'total',
  cart: 'cart'
};

var cart = [];
var count = 0;
var subTotal = 0;
var listProducts = [];
var total = 0;

$(document).ready(function() {
  window.onscroll = function() { myFunction(); };

  var sticky = header.offsetTop;

  function myFunction() {
    if (window.pageYOffset > sticky) {
      $('#header').addClass("sticky");
    } else {
      $('#header').removeClass("sticky");
    }
  }

  initData();
  showCart();

  function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalStorge(key, value) {
    var temp = JSON.parse(localStorage.getItem(key));
    if (temp) {
      return temp;
    } else {
      setLocalStorage(key, value);
      return value;
    }
  }

  function showProduct() {
    var html = '';
    products.forEach(function(element, index) {
      html += '<li class="product-item">\
                <div class="product-image">\
                  <span class="product-label">Sale</span>\
                  <a href="" class="image">\
                    <img src="../image/product'+ element.id + '.jpg">\
                  </a>\
                  <div class="action">\
                    <ul class="action-list">\
                      <li class="action-item">\
                        <button type="button">\
                          <i class="fa fa-external-link" aria-hidden="true"></i>\
                        </button>\
                      </li>\
                      <li class="action-item">\
                        <button type="button">\
                          <i class="fa fa-search" aria-hidden="true"></i>\
                        </button>\
                      </li>\
                      <li class="action-item">\
                        <button type="button">\
                          <i class="fa fa-exchange" aria-hidden="true"></i>\
                        </button>\
                      </li>\
                      <li class="action-item">\
                        <button type="button">\
                          <i class="fa fa-heart" aria-hidden="true"></i>\
                        </button>\
                      </li>\
                    </ul>\
                  </div>\
                </div>\
                <div class="product-meta">\
                  <h6 class="product-name">\
                    <a href="">' + element.name + '</a>\
                  </h6>\
                  <div class="product-price">\
                    <span class="new-price">$' + element.price + '</span>\
                    <span class="old-price">$' + element.old_price + '</span>\
                  </div>\
                  <div class="rating">\
                    <span class="rating-icon">\
                      <i class="fa fa-star" aria-hidden="true"></i>\
                    </span>\
                    <span class="rating-icon">\
                      <i class="fa fa-star" aria-hidden="true"></i>\
                    </span>\
                    <span class="rating-icon">\
                      <i class="fa fa-star" aria-hidden="true"></i>\
                    </span>\
                    <span class="rating-icon">\
                      <i class="fa fa-star" aria-hidden="true"></i>\
                    </span>\
                    <span class="rating-icon">\
                      <i class="fa fa-star-o" aria-hidden="true"></i>\
                    </span>\
                  </div>\
                  <button class="btn-cart js-btn-add-cart" data-id="' + element.id + '" data-index="' + index + '">\
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>\
                    ADD TO CART\
                  </button>\
                </div>\
              </li>';
    });
    $('.list-product').html(html);
  }

  function initData() {
    count = getLocalStorge(keyLocalStorage.count, 0);
    subTotal = getLocalStorge(keyLocalStorage.total, 0);
    cart = getLocalStorge(keyLocalStorage.cart, []);

    $('.js-count').html(count);
    $('.js-total').html(subTotal);

    $('.js-btn-add-cart').each(function() {
      if (cart.indexOf($(this).attr('data-id')) >= 0) {
        $(this).prop('disabled', true);
      } else {
        $(this).prop('disabled', false);
      }
    });
  }

  function showCart() {
    var html = '';
    var cartId = [];
    var cart = getLocalStorge(keyLocalStorage.cart, []);
    
    cart.map(function(element) {
      cartId.push(element.id);
    });
 
    products.forEach(function(element) {
      var idx = cartId.indexOf(element.id);
      if (idx > -1) {
        element.count = cart[idx].count;
        element.subTotal = element.price * element.count;
        listProducts.push(element);
      }
    });
 
    listProducts.map(function(element, index) {
      html += '<tr data-id="'+ element.id +'">\
                <td>' + (index + 1) + '</td>\
                <td class="col-name">' + element.name + '</td>\
                <td>\
                  <img src="../image/product'+ element.id + '.jpg" alt="">\
                </td>\
                <td class="col-unit"><span>$</span><span class="unit-price">' + element.price + '</span></td>\
                <td class="col-quality">\
                  <div class="group-touchspin">\
                    <button class="btn-cart btn-touchspin-down js-btn-touchspin-down">-</button>\
                    <input class="quality-number" type="text" value="' + element.count + '">\
                    <button class="btn-cart btn-touchspin-up js-btn-touchspin-up">+</button>\
                  </div>\
                </td>\
                <td class="col-sub-total"><span>$</span><span class="sub-total">' + element.subTotal + '</span></td>\
                <td>\
                  <button class="btn-cart btn-delete js-btn-delete">x</button>\
                </td>\
              </tr>';
      total += element.subTotal;
    });
 
    html += '<tr">\
              <td colspan="5">Total</td>\
              <td><span>$</span><span class="total">' + total + '</span></td>\
              <td></td>\
            </tr>';
 
    $('tbody').html(html);
  }

  $('.js-btn-add-cart').on('click', function() {
    var idx = $(this).attr('data-index');
    var product = products[idx];
    var cartIcon = $('.cart');
    var imgToDrag = $(this).parent('.product-item').find("img").eq(0);
    
    cart.push({id: product.id, count: 1});
    count += 1;
    total += product.price;

    $(this).prop('disabled', true);
    
    if (imgToDrag) {
      var imgClone = imgToDrag.clone().offset({
        top: imgToDrag.offset().top,
        left: imgToDrag.offset().left
      }).css({
        'opacity': '0.5',
        'position': 'absolute',
        'height': '150px',
        'width': '150px',
        'z-index': '100'
      }).appendTo($('body')).animate({
        'top': cartIcon.offset().top + 10,
        'left': cartIcon.offset().left + 10,
        'width': 75,
        'height': 75
      }, 800, 'easeInOutExpo');

      setTimeout(function () {
        cartIcon.effect("shake", {
          times: 1
        }, 200);
        $('.js-count').html(cart.length);
        $('.js-total').html(total);
      }, 1000);

      imgClone.animate({
        'width': 0,
        'height': 0
      }, function () {
        $(this).detach()
      });
    }

    setLocalStorage(keyLocalStorage.count, count);
    setLocalStorage(keyLocalStorage.total, total);
    setLocalStorage(keyLocalStorage.cart, cart);
  });

  $('.js-btn-touchspin-down').on('click', function() {
    var id = $(this).parents('tr').attr('data-id');
    var idx = cart.findIndex(function(item) { return item.id === id; });
    var $count = $('.js-count');
    var $qualityNumber = $(this).parents('tr').find(".quality-number");
    var $subTotal = $(this).parents('tr').find(".sub-total");
    var $unitPrice = $(this).parents('tr').find(".unit-price");
    var currentSubTotal = parseFloat($subTotal.html()) - parseFloat($unitPrice.html());
    var currentQuality = parseInt($qualityNumber.val()) - 1;
    var currentCount = parseInt($count.html()) - 1;
    $subTotal.html(currentSubTotal);
    $qualityNumber.val(currentQuality);
    $count.html(currentCount);
    sumTotal();
    cart.splice(idx, 1, {id: id, count: currentCount});

    if (currentQuality === 0) {
      cart.splice(idx, 1);
      $(this).parents('tr').remove();
    }

    setLocalStorage(keyLocalStorage.count, currentCount);
    setLocalStorage(keyLocalStorage.cart, cart);
  });

  $('.js-btn-touchspin-up').on('click', function() {
    var id = $(this).parents('tr').attr('data-id');
    var idx = cart.findIndex(function(item) { return item.id === id; });
    var $count = $('.js-count');
    // var $qualityNumber = $(this).parents('tr').children(".col-quality").children(".group-touchspin").children(".quality-number");
    var $qualityNumber = $(this).parents('tr').find(".quality-number");    
    var $subTotal = $(this).parents('tr').find(".sub-total");
    var $unitPrice = $(this).parents('tr').find(".unit-price");
    var currentSubTotal = parseFloat($subTotal.html()) + parseFloat($unitPrice.html());
    var currentQuality = parseInt($qualityNumber.val()) + 1;
    var currentCount = parseInt($count.html()) + 1;
    $subTotal.html(currentSubTotal);
    $qualityNumber.val(currentQuality);
    $count.html(currentCount);
    sumTotal();
    cart.splice(idx, 1, {id: id, count: currentQuality});
    setLocalStorage(keyLocalStorage.count, currentCount);
    setLocalStorage(keyLocalStorage.cart, cart);
  });

  $('.js-btn-delete').on('click', function() {
    var idx = $(this).attr('data-index');
    var $count = $('.js-count');
    var currentCount = parseInt($count.html());
    cart.splice(idx, 1);
    listProducts.splice(idx, 1);
    $(this).parents('tr').remove();
    $count.html(currentCount - 1);
    sumTotal();
  });

  function sumTotal() {
    var $td = $('.sub-total');
    var total = 0;
    $td.each(function() {
      total += parseFloat($(this).html());
    });
    $('.total').html(parseFloat(total));
    $('.js-total').html(parseFloat(total))
    setLocalStorage(keyLocalStorage.total, total);
  }
});
