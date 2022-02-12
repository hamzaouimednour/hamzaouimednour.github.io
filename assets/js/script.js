/* globals Docute */

new Docute({
    target: '#docute',
    title: 'Infosec Writeups',
    sourcePath: './docs/',
    darkThemeToggler: true,
    logo: '<img src="/assets/img/github.png" width="32px"/>',
    
    /* css */
    cssVariables: {
        headerHieght: '50px'
    },
    cssVariables(theme) {
        return theme === 'dark' ? {pageBackground: '#292a2d'} : {pageBackground: 'var(--page-background)'}
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
                    link: '/HTB/paper/'
                },
                {
                    title: 'Pandora',
                    link: '/HTB/pandora/'
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
