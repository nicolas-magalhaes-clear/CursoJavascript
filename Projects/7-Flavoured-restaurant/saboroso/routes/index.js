var express = require('express');

var conn = require('./../inc/db')
var reservations = require('./../inc/reservations')
var router = express.Router();
var menus = require('./../inc/menus');
const contacts = require('../inc/contacts');

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

  contacts.render(req, res);
})

router.post('/contacts', function(req, res){

  if(!req.body.name){
    contacts.render(req, res, 'Digite o nome')
  }
  else if(!req.body.email){
    contacts.render(req, res, 'Digite o email')
  }
  else if(!req.body.message){
    contacts.render(req, res, 'Digite a mensagem')
  }
  else{
    
    contacts.save(req.body)
    .then(results =>{
      req.body = {}
      contacts.render(req, res, null, 'Contato enviado com sucesso');
    })
    .catch(err=>{
      contacts.render(req, res, err.message);
    })
  }
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

  reservations.render(req, res)
  
})

router.post('/reservations', function (req, res) {
  
  if(!req.body.name){
    reservations.render(req, res, 'Digite o nome')
  }
  else if(!req.body.email){
    reservations.render(req, res, 'Digite o email')
  }
  else if(!req.body.people){
    reservations.render(req, res, 'Selecione o numero de pessoas')
  }
  else if(!req.body.date){
    reservations.render(req, res, 'Selecione uma data')
  }
  else if(!req.body.time){
    reservations.render(req, res, 'Selecione uma hora')
    
  }
  else{
    reservations.save(req.body)
    .then(result=>{
      req.body = {}
      reservations.render(req, res, null, "Reserva realizada com sucesso")
    })
    .catch(err =>{
      
      reservations.render(req, res, err.message);
    })
  }
  
})

router.get('/services', function (req, res) {
  res.render('services', {
    title: 'Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É uma prazer poder servir'
  })
})

module.exports = router;
