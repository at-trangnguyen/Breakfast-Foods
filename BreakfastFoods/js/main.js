var handlebars = require('handlebars');
var fs = require('fs');

$(document).ready(function() {
  var templateHeader = handlebars.compile($("#header-template").html());
  var templateFooter = handlebars.compile($('#footer-template').html());
  var templateNavBar = handlebars.compile($('#navbar-template').html());
  var templateBanner = handlebars.compile($('#banner-template').html());
  var templateSideBar = handlebars.compile($('#sidebar-template').html());

  var headerTemplate = fs.readFileSync('template/partials/header.html').toString('utf-8');
  var footerTemplate = fs.readFileSync('template/partials/footer.html').toString('utf-8');
  var navTemplate = fs.readFileSync('template/partials/navbar.html').toString('utf-8');
  var bannerTemplate = fs.readFileSync('template/partials/banner.html').toString('utf-8');
  var sidebarTemplate = fs.readFileSync('template/partials/sidebar.html').toString('utf-8');
  
  var header = handlebars.compile(headerTemplate);
  var footer = handlebars.compile(footerTemplate);
  var navbar = handlebars.compile(navTemplate);
  var banner = handlebars.compile(bannerTemplate);
  var sidebar = handlebars.compile(sidebarTemplate);

  handlebars.registerPartial({
    'header': header,
    'footer': footer,
    'navbar': navbar,
    'banner': banner,
    'sidebar': sidebar
  });

  var data = {
    products: [
      {
        index: 0,
        id: '1',
        name: "Coffee - 10oz Cup 92961",
        price: 111,
        old_price: 279,
        rating: 1,
        is_sale: false,
        color: "Green",
        size: "2XL"
      },
      {
        index: 1,
        id: '2',
        name: "Fenngreek Seed",
        price: 169,
        old_price: 132,
        rating: 2,
        is_sale: false,
        color: "Pink",
        size: "L"
      },
      {
        index: 2,
        id: '3',
        name: "Beer - Camerons Auburn",
        price: 255,
        old_price: 115,
        rating: 3,
        is_sale: false,
        color: "Turquoise",
        size: "2XL"
      },
      {
        index: 3,
        id: '4',
        name: "Sauce - Hoisin",
        price: 115,
        old_price: 85,
        rating: 4,
        is_sale: true,
        color: "Indigo",
        size: "XL"
      },
      {
        index: 4,
        id: '5',
        name: "Syrup - Kahlua Chocolate",
        price: 153,
        old_price: 160,
        rating: 5,
        is_sale: true,
        color: "Green",
        size: "XL"
      },
      {
        index: 5,
        id: '6',
        name: "Garlic - Peeled",
        price: 195,
        old_price: 203,
        rating: 6,
        is_sale: false, 
        color: "Blue", 
        size: "3XL" 
      },
      {
        index: 6,
        id: '7',
        name: "Chocolate - Mi - Amere Semi",
        price: 27,
        old_price: 194,
        rating: 7,
        is_sale: true,
        color: "Blue",
        size: "2XL"
      },
      {
        index: 7,
        id: '8',
        name: "Muffins - Assorted",
        price: 224,
        old_price: 192,
        rating: 8,
        is_sale: true,
        color: "Blue",
        size: "XL"
      },
      { 
        index: 8,
        id: '9',
        name: "Asparagus - Mexican",
        price: 69,
        old_price: 247,
        rating: 9,
        is_sale: true,
        color: "Teal",
        size: "L"
      }
    ]
  };

  $('#header').html(templateHeader);
  $('#footer').html(templateFooter);
  $('#navbar').html(templateNavBar);
  $('#banner').html(templateBanner);
  $('#sidebar').html(templateSideBar);

  if (window.location.href.indexOf('index') != -1) {
    var templateProducts = handlebars.compile($('#list-product-template').html());
    var productTemplate = fs.readFileSync('template/partials/product.html').toString('utf-8');
    var product = handlebars.compile(productTemplate);
    handlebars.registerPartial('product', product);
    $('#list').html(templateProducts(data));
  }
});
