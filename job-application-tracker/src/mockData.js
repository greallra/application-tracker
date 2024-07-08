export default {
    applicationsGeneral: [
        { id: 1, appliedVia: 'Linkedin', applicationsAmount: 19,  }, 
        { id: 2, appliedVia: 'We Work Remotely', applicationsAmount: 7 }, 
        { id: 3, appliedVia: 'Indeed', applicationsAmount: 4,  }
    ],
    appliedVia: [
        { id: 10, name: 'Linkedin' },
        { id: 11, name: 'We Work Remotely' },
        { id: 12, name: 'Indeed' },
        { id: 13, name: 'Cord' },
        { id: 14, name: 'Wellfound' },
        { id: 15, name: 'Other' },
    ],
    applications: [
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Boomer', status: 0 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Bank Of Ireland', status: 0 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Drooper', status: 0 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Minecraft', status: 0 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Datadog', status: 1 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Swift', status: 2 }, 
        { id: Math.round(Math.random()), appliedVia: 'Linkedin', name: 'Lark', status: 2 }, 
        { id: Math.round(Math.random()), appliedVia: 'We Work Remotely', name: 'Toggle', status: 0 }, 
        { id: Math.round(Math.random()), appliedVia: 'We Work Remotely', name: 'Saver', status: 1 }, 
        { id: Math.round(Math.random()), appliedVia: 'We Work Remotely', name: 'Rinse Let', status: 3 }, 
        { id: Math.round(Math.random()), appliedVia: 'Indeed', name: 'Zark', status: 0 }
    ],
    statuses: {
        0: {
            name: 'no reponse',
            hex: 'black'
        },
        1: {
            name: 'rejected application',
            hex: '#ff0000'
        },
        2: {
            name: 'accepted application',
            hex: '#ff6600'
        },
        3: {
            name: 'failed technical',
            hex: '#ffcc00'
        },
        4: {
            name: 'passed technical',
            hex: '#ffff00'
        },
        5: {
            name: 'last round',
            hex: '#66ff33'
        },
    },
    locations: [
        'EU', 'Ireland', 'Americas'
    ],
    sites: ['Remote', 'onsite', 'hybrid']
}