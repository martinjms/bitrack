var Twitter = require('twitter')
var mailer = require('./mailer.js')
var telegram = require('./telegram.js')
let companies =  require('./handles1.json')
companies = companies.filter(x => x.handle != "").map(x => x.handle)

var client = new Twitter({
    consumer_key: 'HLeKbWoneTqD7PbSmsoyJORM0',
    consumer_secret: 'xqIzXqBK3QGKoXMHSnTINWyHfTPIX3wFTHfIxpkJbTUq9bA4Ig',
    access_token_key: '172611603-qQkJuOnFMkd6U7SS1QdnJHUuFLIlQ6b1HOaxKCBO',
    access_token_secret: 'ZBMMWEm6y6LMInAnREyJoeCGPsV3xgnlstIIjJSDmi1wa'
});
function paginate(array, page_size, page_number) {
    --page_number; // because pages logically start with 1, but technically with 0
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
}
interestingCompanies = paginate(companies,100,1)
console.log(interestingCompanies)
client.get('users/lookup', { screen_name: interestingCompanies.join(',') })
.then(users => {
    var params = { 
        follow: users.map(x => x.id).join(','),
        track:"announcement, announcements, announce, news, exchange, listing, listed, list, burn, partnership, partnerships, partnering, partner, partnered" 
    }
    var stream = client.stream('statuses/filter', {track:"javascript"});
    stream.on('data', function (event) {
        console.log(event && event.text);
        if(event.user && interestingCompanies.some(x => event.user.screen_name == x)){
            mailer.sendEmails(event)
            telegram.sendToGroup(event.user.screen_name + ':\n'+ event.text)
        }
    });
    stream.on('error', function(e){console.log(e)})
})



