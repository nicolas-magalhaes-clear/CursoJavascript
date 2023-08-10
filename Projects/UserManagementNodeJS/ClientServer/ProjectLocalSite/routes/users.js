var express = require('express');
var restify = require('restify-clients');
var router = express.Router();

var client = restify.createJSONClient({
  url: 'http://localhost:4000'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  client.get('/users', function(err, request, response, obj){
    console.log(JSON.stringify(obj));
    res.json(obj)
    
  })


});

router.get('/:id', function(req, res, next) {
  
  client.get(`//users/${req.params.id}`, function(err, request, response, obj){
    
    console.log(JSON.stringify(obj));
    res.json(obj)
    
  })


});

router.put('/:id', function(req, res, next) {
  
  client.put('/users', req.body, function(err, request, response, obj){
    
    res.json(obj)
    
  })


});

router.delete('/:id', function(req, res, next) {
  

  //Restify only uses del instead of delete
  client.del('/users', function(err, request, response, obj){
    
    res.json(obj)
    
  })


});

router.post('/', function(req, res, next) {
  
  console.log('Route post reached')
  console.log('REQ.BODY=', req.body);
  
  client.post('/users', req.body, function(err, request, response, obj){
    
    res.json(obj)
    
  })

});

module.exports = router;
