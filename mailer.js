
const Email = require('email-templates');
const emailList = require('./emails.json')

sendEmails = event => {
    const email = new Email({
        message: {
            from: 'cryptonews@gmail.com'
        },
        transport: {
            sendmail: true,
            newline: 'unix',
            path: '/usr/lib/sendmail'
        }
    });
    emailList.forEach(address => {
        console.log('sending Email to ' + email + ' about ' + event.user.screen_name)
        email.send({
            template: 'twitter',
            message: {
                to: address
            },
            locals: {
                name: event.user.screen_name,
                text: event.text
            }
        })
        .then(console.log)
        .catch(console.error);
    })

}

module.exports = {sendEmails}