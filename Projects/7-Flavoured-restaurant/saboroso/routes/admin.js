const express = require('express');
const router = express.Router();
const users = require('./../inc/users');
const admin = require('./../inc/admin');
const menus = require('./../inc/menus');
const reservations = require('../inc/reservations');

router.use(function (req, res, next) {
    console.log('OK')
    console.log('req fields no middleware,', req.fields)
    reservations.testConsole();
    if (['/login'].indexOf(req.url) === -1 && !req.session.user) {
        res.redirect('/admin/login');
    }
    else {
        next()
    }
})


router.use(function (req, res, next) {
    
    req.menus = admin.getMenus(req);

    next();
})

router.get('/logout', function (req, res, next) {

    delete req.session.user;

    res.redirect('/admin/login');

})

router.get('/', function (req, res, next) {

    admin.dashboard().then(data => {

        res.render('admin/index', admin.getParams(req, {
            data
        }))
    }).catch(err => {
        console.log(err)
    })



});

router.post('/login', function (req, res, next) {
    console.log('chegou no admin login kkkkk')

    req.body.email = req.fields.email;
    req.body.password = req.fields.password
    if (!req.body.email) {
        users.render(req, res, 'preencha o campo email');
    }
    else if (!req.body.password) {
        users.render(req, res, 'preencha o campo senha');
    }
    else {
        users.login(req.body.email, req.body.password).then(user => {

            req.session.user = user;
            console.log('Login concluido')
            res.redirect('/admin')

        }).catch(err => {
            users.render(req, res, err.message)
        })
    }

})

router.get('/login', function (req, res, next) {


    users.render(req, res, null)
});

router.get('/contacts', function (req, res, next) {

    res.render('admin/contacts', admin.getParams(req))
});


router.post('/menus', function (req, res, next) {

    console.log('chegou')
    console.log('menus')

    menus.save(req.fields, req.files).then(results => {

        console.log('Resultados:', results)
        res.send(results);
    }).catch(err => {
        res.send(err);
    })
})

router.get('/menus', function (req, res, next) {

    menus.getMenus().then(data => {
        res.render('admin/menus', admin.getParams(req, {
            data
        }))
    })

})

router.delete('/menus:id', function (req, res, next) {


    menus.delete(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})



router.get('/emails', function (req, res, next) {

    res.render('admin/emails', admin.getParams(req))
});



/*
 Reservations routes
 */
router.get('/reservations', function (req, res, next) {


    res.render('admin/reservations', admin.getParams(req, {
        date: {}
    }))
});


router.post('/reservations', (req,res,next)=>{
    console.log('CHEGAMOS AONDE NINGUEM CHEGOU')
    reservations.save(req.fields).then(results => {

        console.log('Resultados:', results)
        res.send(results);
    }).catch(err => {
        console.log('Deu erro:', err)
        res.send(err);
    })
})

router.delete('/reservations:id', function (req, res, next) {

/*
    reservations.delete(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })

    */
})


/*
End reservations routes
*/

router.get('/users', function (req, res, next) {

    res.render('admin/users', admin.getParams(req))
});

module.exports = router