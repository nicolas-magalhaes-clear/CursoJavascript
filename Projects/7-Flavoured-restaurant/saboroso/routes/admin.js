const express = require('express');
const router = express.Router();
const users = require('./../inc/users');
const admin = require('./../inc/admin');
const menus = require('./../inc/menus');
const reservations = require('../inc/reservations');
var sessionData;


router.use(function (req, res, next) {

    console.log('Middleware1')
    if (['/login'].indexOf(req.url) === -1 && sessionData == undefined) {
        console.log('[MIDDLEWARE]Session data não definido! Redirecionando para login')
        res.redirect('/admin/login');
        return
    }
    else {
        console.log('[MIDDLEWARE]Session data ENCONTRADO! Prosseguindo para:', req.url)
        next()
    }

})


router.use(function (req, res, next) {
    console.log('MIddleware2')
    req.menus = admin.getMenus(req);
    console.log('middleware2 finalizado prosseguindo')
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
            sessionData = user
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


router.post('/menus', async function (req, res, next) {
        console.log('Chegou na rota', req.url)
        console.log('chegou na rota de menus')
        

        await new Promise((resolve, reject) => {
            menus.save(req.fields, req.files).then(results => {

                
                resolve(results)
            }).catch(err => {
                
                console.log('ERRO:', err)
                reject(err)
            })
        }).then(results=>{
            console.log('results:   ', results);
            res.send(results);
        })
    }
    
)

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

    reservations.getReservations().then(data => {

        res.render('admin/reservations', admin.getParams(req, {
            date: {},
            data
        }))
    })

});


router.post('/reservations', function (req, res, next) {
    console.log('CHEGAMOS AONDE NINGUEM CHEGOU')
    reservations.save(req.fields).then(results => {

        console.log('Resultados:', results)
        res.redirect('/admin/reservations')
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