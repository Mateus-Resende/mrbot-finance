require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const ngrok = require('ngrok');

const host = process.env.MONGO_DB_HOST;
const port = process.env.MONGO_DB_PORT;
const dbName = process.env.MONGO_DB_NAME;
const mongoUri = `mongodb://${host}:${port}/${dbName}`;
const token = process.env.TELEGRAM_BOT_TOKEN;
const env = process.env.ENVIRONMENT;
const options = {
  webHook: {
    port: process.env.PORT
  }
};
const bot = new TelegramBot(token, options);

mongoose.connect(mongoUri, { useNewUrlParser: true });

let start = function (url, bot) {
  bot.setWebHook(`${url}/bot${token}`);

  bot.onText(/\/help/, function onMessage(msg) {
    bot.sendMessage(msg.chat.id, '/addDespesa data(opcional) categoria valor')
  });

  bot.onText(/\/addDespesa/, function onMessage(msg) {
    bot.sendMessage(msg.chat.id, 'I am alive on Zeit Now!');
  });

  bot.on('message', function onMessage(msg) {
    bot.sendMessage(msg.chat.id, `Echo: ${msg.text}`)
  })
};


if (env === "production" || env === "staging") {
  start(process.env.URL, bot)
} else {
  ngrok
  .connect(process.env.PORT)
  .then((url) => {
    start(url, bot);
  })
  .catch(e => console.error(e));
}

