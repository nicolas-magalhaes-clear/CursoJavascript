module.exports = {
    dashboard(){

        return new Promise((resolve, reject) =>{
            
        })

    },
    getParams(req, params){

        return Object.assign({}, {
            menus: req.menus,
            user: req.session.user
        }, params)
    },
    getMenus(req){

        let menus = [{
            text: 'Tela inicial',
            href: '/admin/',
            icon: 'home',
            active: false
        },
        {
            text: 'Menu',
            href: '/admin/menus',
            icon: 'cutlery',
            active: false
        },
        {
            text: 'Reservas',
            href: '/admin/reservations',
            icon: 'calendar-check-o',
            active: false
        },
        {
            text: 'Contatos',
            href: '/admin/contacts',
            icon: 'comments',
            active: false
        },
        {
            text: 'Usuarios',
            href: '/admin/users',
            icon: 'users',
            active: false
        },
        {
            text: 'Email',
            href: '/admin/emails',
            icon: 'envelope',
            active: false
        }
    ]

    menus.map(menu =>{

        if(menu.href === `/admin${req.url}`) menu.active = true
        console.log('Menu agora:', menu)
    })

    return menus
    }
}