var express = require('express');
var restify = require('restify-clients');
var router = express.Router();

var client = restify.createJSONClient({
  url: 'http://localhost:4000'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  client.get('/users', function(err, req, res, obj){
    
    res.end("teste");
  })


});

module.exports = router;
