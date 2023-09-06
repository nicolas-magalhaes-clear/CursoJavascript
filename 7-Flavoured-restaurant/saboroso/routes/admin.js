const express = require('express');
const router = express.Router();
const moment = require('moment')
const users = require('./../inc/users');
const admin = require('./../inc/admin');
const menus = require('./../inc/menus');
const reservations = require('../inc/reservations');
const contacts = require('../inc/contacts');
const emails = require('./../inc/emails')
const Colors = require('./../inc/ConsoleColors')
var sessionData;

let prefix;
router.use(function (req, res, next) {
    prefix = Colors.red('[MIDDLEWARE-ADMIN-1]')
    console.log(prefix, 'Validating login data')
    if (['/login'].indexOf(req.url) === -1 && sessionData == undefined) {
        console.log(prefix, 'Session data not defined, redirecting to /admin/login');
        res.redirect('/admin/login');
        return
    }
    else if (sessionData !== undefined) {
        console.log(prefix, 'Session data FOUND! proceding to the next middleware')
        next()
    }
    else {
        console.log(prefix, 'Redirecting to proceding to the next middleware')
        next()
    }

})


router.use(function (req, res, next) {
    prefix = Colors.red('[MIDDLEWARE-ADMIN-2]')
    console.log(prefix, 'Adding menus values to req.menus')
    req.menus = admin.getMenus(req);
    console.log(prefix, 'Redirecting to proceding to', req.url)
    next();
})

router.get('/logout', function (req, res, next) {
    prefix =  Colors.blue('[ROUTE]')+Colors.magenta('[LOGOUT]')+Colors.green('[GET]')
    console.log(prefix, 'Route accessed')
    delete req.session.user;
    console.log(prefix, 'User logged out')

    console.log(prefix, 'Redirecting to /admin/login')
    res.redirect('/admin/login');

})

router.get('/', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[DEFAULT]')+Colors.green('[GET]')
    console.log(prefix, 'Route accessed')
    admin.dashboard().then(data => {

        res.render('admin/index', admin.getParams(req, {
            data
        }))
    }).catch(err => {
        console.log(err)
    })



});

router.post('/login', function (req, res, next) {
    prefix =  Colors.blue('[ROUTE]')+Colors.magenta('[LOGIN]')+Colors.yellow('[POST]')
    console.log(prefix, 'Route accessed')

    req.body.email = req.fields.email;
    req.body.password = req.fields.password
    if (!req.body.email) {
        users.render(req, res, 'Preencha o campo email');
    }
    else if (!req.body.password) {
        users.render(req, res, 'Preencha o campo senha');
    }
    else {
        users.login(req.body.email, req.body.password).then(user => {
            sessionData = user
            req.session.user = user;
            console.log(prefix, 'Login concluded')
            res.redirect('/admin')

        }).catch(err => {
            console.log(prefix, 'Login failed')
            users.render(req, res, err.message)
        })
    }

})

router.get('/login', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[LOGIN]')+Colors.green('[GET]');
    console.log(prefix, 'Login concluded')
    users.render(req, res, null)
});



/*
Contacts routes
*/
router.get('/contacts', function (req, res, next) {
    prefix = Colors.yellow('[ROUTE]')+Colors.magenta('[CONTACTS]')+Colors.green('[GET]')
    console.log(prefix, 'Route accessed')
    contacts.getContacts().then(data => {
        res.render('admin/contacts', admin.getParams(req, { data }))
    })

});

router.delete('/contacts:id', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[LOGIN]')+Colors.red('[DELETE]')
    console.log(prefix, 'Route accessed')
    
    console.log(prefix, 'Requesting method delete in contacts')
    contacts.delete(req.params.id[1]).then(() => {
        console.log(prefix, 'Delete completed, reloading page');
        res.redirect('/admin/contacts');
    }).catch(err => {
        console.log(prefix, 'Error ocurred when deleting\n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    })
})
/*
Contacts routes
*/





/*
Emails
*/
router.get('/emails', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[EMAILS]')+Colors.green('[GET]')

    console.log(prefix, 'Route accessed')
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
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[RESERVATIONS]')+Colors.green('[GET]') 
    console.log(prefix, 'Route accessed'); 
    let start = (req.query.start) ? req.query.start : moment().subtract(1, 'year').format('YYYY-MM-DD');
    let end = (req.query.end) ? req.query.end : moment().subtract(1, 'year').format('YYYY-MM-DD');
        
    console.log(prefix, 'Requesting method getReservations in reservations.js')
    reservations.getReservations(req).then(pag => {
        console.log(prefix, 'Method getReservations complete, Results obtained:', pag)
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
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[RESERVATIONS]')+Colors.yellow('[POST]')

    console.log(prefix, 'Route accessed')

    console.log(prefix, 'Requesting method save in reservations')
    reservations.save(req.fields).then(results => {

        console.log(prefix, 'Request complete, results obtained:', results)
        
        res.redirect('/admin/reservations')
    }).catch(err => {
        console.log(prefix, 'Error ocurred \n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    })
})

router.delete('/reservations:id', async function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[RESERVATIONS]')+Colors.red('[DELETE]')
    console.log(prefix, 'Route accessed')

    console.log(prefix, 'Requesting method delete to reservations id:', req.params.id[1])
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
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[USERS]')+Colors.green('[GET]')
    console.log(prefix, 'Route accessed')
    users.getUsers().then(data => {
        res.render('admin/users', admin.getParams(req, { data }));
    })

});

router.post('/users', async function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[RESERVATIONS]')+Colors.yellow('[POST]')

    console.log(prefix, 'Route accessed')
    console.log(prefix, 'Requesting method save in users with fields:', req.fields);
    await users.save(req.fields).then(result => {
        res.end()
    }).catch(err => {        
        console.log(prefix, 'Error ocurred\n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    })

});

router.delete('/users:id', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[RESERVATIONS]')+Colors.red('[DELETE]')
    console.log(prefix, 'Route accessed')

    console.log(prefix, 'Requesting method delete to reservations id:', req.params.id[1])
    users.delete(req.params.id[1]).then(response => {
        res.redirect('/admin/users')
    }).catch(err => {
        console.log(prefix, 'Error ocurred when deleting\n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    })
})
/*
Users routes
*/


/*
Menus routes
*/
router.get('/menus', function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[MENUS]')+Colors.green('[GET]')
    console.log(prefix, 'Route accessed')
    menus.getMenus().then(data => {
        res.render('admin/menus', admin.getParams(req, {
            data
        }))
    })

})

router.post('/menus', async function (req, res, next) {
    prefix = Colors.blue('[ROUTE]')+Colors.magenta('[MENUS]')+Colors.yellow('[POST]')

    console.log(prefix, 'Requesting method save in menus with req.fields:', req.fields, 'and req.files:', req.files)
    try {
        const results= await menus.save(req.fields, req.files);

        console.log(prefix, 'Results obtained from method save', results)
        

        res.send(results)
    } catch (error) {
        console.log(prefix, 'Error ocurred\n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    }
    console.log('fodassse')
});




router.delete('/menus:id', function (req, res, next) {


    menus.delete(req.params.id[1]).then(result => {
        res.redirect('/admin/menus')
    }).catch(err=>{
        console.log(prefix, 'Error ocurred when deleting\n', Colors.red('[Error]\n'), Colors.yellow('######################\n'), err, Colors.yellow('\n######################'));
        console.log(prefix, 'Reloading page')
    })
})
/*
Menus routes
*/



module.exports = router