/* globals Docute */

new Docute({
    target: '#docute',
    title: 'Infosec Writeups',
    sourcePath: './docs/',
    darkThemeToggler: true,
    highlight: ['python', 'php'],
    logo: '<img src="/assets/img/github.png" width="32px" onclick="location.href=\'//github.com/hamzaouimednour\'"/>',
    
    /* css */
    cssVariables: {
        headerHieght: '50px'
    },
    cssVariables(theme) {
        return theme === 'dark' ? {pageBackground: '#292a2d'} :{pageBackground: '#fff'}
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
                },
                {
                    title: 'Meta',
                    link: '/HTB/meta/'
                },
                {
                    title: 'Acute',
                    link: '/HTB/acute/'
                },
                {
                    title: 'RouterSpace',
                    link: '/HTB/routerspace/'
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
        {
            title: 'Cybertalents',
            links: [
                {
                    title: '',
                    link: '/Cybertalents/'
                },
                {
                    title: 'Zain CTF',
                    link: '/Cybertalents/ZainCTF/',
                    toc: false
                },
            ]
        },
    ]
})
