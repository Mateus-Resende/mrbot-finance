require('dotenv').config()

const Telegraf = require('telegraf')
const mongoose = require('mongoose')
const ngrok = require('ngrok')

const token = process.env.TELEGRAM_BOT_TOKEN
const env = process.env.ENVIRONMENT
const bot = new Telegraf(token)

const dbHost = process.env.MONGO_DB_HOST
const dbPort = process.env.MONGO_DB_PORT
const dbName = process.env.MONGO_DB_NAME
const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`

mongoose.connect(mongoUri, { useNewUrlParser: true })

const start = function (url, port, bot) {
  bot.help((ctx) => {
    const availableCommands = '/addDespesa data(opcional) categoria valor'
    ctx.reply(availableCommands)
  })

  bot.on('text', (ctx) => {
    ctx.reply(`Echo: ${ctx.message.text}`)
  })

  bot.launch({
    webhook: {
      domain: url,
      port: port
    }
  })
}

if (env === 'production' || env === 'staging') {
  start(process.env.URL, process.env.PORT, bot)
} else {
  ngrok
    .connect(process.env.PORT)
    .then((url) => {
      start(url, process.env.PORT, bot)
    })
    .catch(e => console.error(e))
}
