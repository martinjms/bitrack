const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather
const token = '502833326:AAEA9I93bLtjqEt-nJofUuUEuk6gi7sZK7Q';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });


bot.onText(/\/echo (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; 

    bot.sendMessage(chatId, 'I´m alive!!');
    console.log(chatId)
});
sendToGroup = msg => bot.sendMessage(-243701821, msg);
module.exports = { sendToGroup }