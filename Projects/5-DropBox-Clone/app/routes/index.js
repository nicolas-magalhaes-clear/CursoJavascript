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
    console.log('pathObj:', pathObj);
    console.log('pathObj type:', typeof(pathObj));

    let path = pathObj[0].toString();
    console.log('path', path);
    console.log('path type', typeof(path))
  


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
            files: path
          });
        }
        
      })
    }
    

    

  })
})

module.exports = router;
