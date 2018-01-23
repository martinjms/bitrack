const fetch = require('node-fetch');
const fs = require('mz/fs')
let coinsInfo = []
const coinlist = fetch('https://files.coinmarketcap.com/generated/search/quick_search.json')
    .then(res => res.text())
    .then(body => JSON.parse(body))
    .then(body => body.map(x => x.slug))
    .then(body => iterateBody(body))
    


iterateBody = body => {
    if(!body.length) return Promise.resolve()
        .then(console.log(coinsInfo))
    else return getHandle(body.shift())
        .then(data => coinsInfo.push(data))
        .then(() => iterateBody(body))
    }
getHandle = slug => fetch('https://coinmarketcap.com/currencies/' + slug + '/#social')
        .then(res => res.text())
        .then(body => body.match(/(https:\/\/twitter.com\/)([A-z]+)/g))
        .then(data => data.map(x => x.substr(x.lastIndexOf('/') + 1)).filter(x => x !== 'CoinMarketCap'))
        .then(data => ({ name: slug, handle: data.join() }))
    .then(data => fs.appendFileSync('handles.json', JSON.stringify(data)+',\n'))

