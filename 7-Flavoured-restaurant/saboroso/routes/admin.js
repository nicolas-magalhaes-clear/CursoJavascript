const express = require('express');
const router = express.Router();
const moment = require('moment')
const users = require('./../inc/users');
const admin = require('./../inc/admin');
const menus = require('./../inc/menus');
const reservations = require('../inc/reservations');
const contacts = require('../inc/contacts');
const emails = require('./../inc/emails')
var sessionData;


router.use(function (req, res, next) {
    console.log('Session data:', sessionData)
    console.log('Middleware1')
    if (['/login'].indexOf(req.url) === -1 && sessionData == undefined) {
        console.log('[MIDDLEWARE]Session data não definido! Redirecionando para login')
        res.redirect('/admin/login');
        return
    }
    else if (sessionData !== undefined) {
        console.log('[MIDDLEWARE]Session data ENCONTRADO! Prosseguindo para:', req.url)
        next()
    }
    else {
        console.log('[MIDDLEWARE] URlll Requisitada com sessionData definido', req.url)
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
            console.log('Login concluisdo')
            res.redirect('/admin')

        }).catch(err => {
            users.render(req, res, err.message)
        })
    }

})

router.get('/login', function (req, res, next) {


    users.render(req, res, null)
});



/*
Contacts routes
*/
router.get('/contacts', function (req, res, next) {

    contacts.getContacts().then(data => {
        res.render('admin/contacts', admin.getParams(req, { data }))
    })

});

router.delete('/contacts:id', function (req, res, next) {

    console.log('Chegou na rota delete de contacts')
    contacts.delete(req.params.id[1]).then(() => {
        res.redirect('/admin/contacts');
    }).catch(err => {
        console.log('Prosseguindo');
    })
})
/*
Contacts routes
*/





/*
Emails
*/
router.get('/emails', function (req, res, next) {

    emails.getEmails().then(data => {
        res.render('admin/emails', admin.getParams(req, { data }))
    })


});


/*
Emails
*/


/*
 Reservations routes
 */
router.get('/reservations', function (req, res, next) {
    console.log('Chegou no get reservations')
    let start = (req.query.start) ? req.query.start : moment().subtract(1, 'year').format('YYYY-MM-DD');
    let end = (req.query.end) ? req.query.end : moment().subtract(1, 'year').format('YYYY-MM-DD');
    
    console.log('Valor de req.query');
    console.log(req.query);

    console.log('Start e end na rota');
    console.log(start);
    console.log(end);

    reservations.getReservations(req).then(pag => {
        console.log('Get reservations finalizado')
        res.render('admin/reservations', admin.getParams(req, {
            date: {
                start,
                end
            },
            data: pag.data,
            moment,
            links: pag.links
        }))
    })

});


router.post('/reservations', function (req, res, next) {
    console.log('CHEGAMOS AONDE NINGUEM CHEGOU')
    reservations.save(req.fields).then(results => {

        console.log('Resultados:', results)
        res.redirect('/admin/reservations')
    }).catch(err => {
        console.log('Continuando')
    })
})

router.delete('/reservations:id', async function (req, res, next) {

    console.log('REQ.PARAMS', req.params.id[1]);
    const deleted = await reservations.delete(req.params.id[1]);

    res.end()



})


/*
End reservations routes
*/


/*
Users routes
*/
router.get('/users', function (req, res, next) {

    users.getUsers().then(data => {
        res.render('admin/users', admin.getParams(req, { data }));
    })

});

router.post('/users', async function (req, res, next) {

    await users.save(req.fields).then(result => {
        res.end()
    }).catch(err => {
        console.log('Erro=>', err);
        console.log('Prosseguindo')
    })

});

router.delete('/users:id', function (req, res, next) {

    console.log('Req params id1:', req.params.id[1])

    users.delete(req.params.id[1]).then(response => {
        res.redirect('/admin/users')
    }).catch(err => {
        console.log('Ocorreu um erro:', err)
    })
})
/*
Users routes
*/


/*
Menus routes
*/
router.get('/menus', function (req, res, next) {

    menus.getMenus().then(data => {
        res.render('admin/menus', admin.getParams(req, {
            data
        }))
    })

})

router.post('/menus', async function (req, res, next) {
    console.log('Chegou na rota /menus como post');

    try {
        const resultados = await menus.save(req.fields, req.files);

        console.log('Resultados ocorreram');
        console.log('Resultados:', resultados);

        res.send(resultados)
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        res.status(500).send({ 'error': 'Ocorreu um erro no servidor' });
    }
    console.log('fodassse')
});




router.delete('/menus:id', function (req, res, next) {


    menus.delete(req.params.id).then(result => {
        res.redirect('/admin/menus')
    })
})
/*
Menus routes
*/



module.exports = router