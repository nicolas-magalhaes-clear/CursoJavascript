var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {

    res.json({
      files
    });

  })
  
})

router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  })

  form.parse(req, (err, fields, files) => {
    
    

    let pathObj = fields.path;  
    let path = pathObj[0].toString();
    
    let keyObj = fields.key;
    let key = keyObj[0].toString();
  


    if(fs.existsSync(path)){
      //Path exists, then deletes the file  
      fs.unlink(path, (err) => {
        if(err){
          res.status(400).json({
            err
          });
        }
        else{
          res.json({
            filePath: path,
            key
          });
        }
        
      })
    }
    

    

  })
})

module.exports = router;
