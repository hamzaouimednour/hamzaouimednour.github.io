/* globals Docute */

new Docute({
    target: '#docute',
    title: 'Dragunov - Writeups',
    sourcePath: './docs/',
    darkThemeToggler: true,
    logo: '<img src="/assets/img/github.png" width="32px"/>',
    
    /* css */
    cssVariables: {
        headerHieght: '50px'
    },

    /* navbar */
    nav: [
        {
            title: 'contact',
            link: '/#contact'
        }
    ],

    /* sidebar */
    sidebar: [
        {
            title: 'root@dragunov',
            links: [
                {
                    title: 'Whoami',
                    link: '/'
                }
            ]
        },
        {
            title: 'HTB',
            links: [
                {
                    title: 'Paper',
                    link: '/HTB/paper'
                }
            ]
        },
        {
            title: 'THM',
            links: [
                {
                    title: '',
                    link: '/THM/'
                }
            ]
        },
    ]
})