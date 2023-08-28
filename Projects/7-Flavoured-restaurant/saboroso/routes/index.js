var express = require('express');

var conn = require('./../inc/db')
var router = express.Router();
var menus = require('./../inc/menus')

/* GET home page. */
router.get('/', function (req, res, next) {


  menus.getMenus().then(results=>{

    res.render('index',
    {
      title: 'Restaurante Saboroso',
      menus: results,
      isHome: true
    });

  })

  

});


router.get('/contacts', function (req, res) {

  res.render('contacts', {
    title: 'Contato - Restaurante Saboroso!',
    background: 'images/img_bg_3.jpg',
    h1: 'Diga um oi contato!'
  })
})

router.get('/menus', function (req, res) {

  menus.getMenus().then(results=>{

    res.render('menus', {
      title: 'Menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menus',
      menus: results
    });

  })
  
})

router.get('/reservations', function (req, res) {
  res.render('reservations', {
    title: 'Reservas - Restaurante Saboroso!',
    background: 'images/img_bg_2.jpg',
    h1: 'Reserve uma mesa'
  })
})

router.get('/services', function (req, res) {
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É uma prazer poder servir'
  })
})

module.exports = router;
