require('dotenv').config()

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const mongoose = require('mongoose')
const ngrok = require('ngrok')

const HelpController = require('./use-case/help/help')

const token = process.env.TELEGRAM_BOT_TOKEN
const env = process.env.ENVIRONMENT
const bot = new Telegraf(token)

const dbHost = process.env.MONGO_DB_HOST
const dbPort = process.env.MONGO_DB_PORT
const dbName = process.env.MONGO_DB_NAME
const mongoUri = `mongodb://${dbHost}:${dbPort}/${dbName}`

mongoose.connect(mongoUri, { useNewUrlParser: true })

const start = function (url, port, bot) {
  bot.command('help', ({ reply }) => {
    reply(HelpController.getCommands(), Extra.HTML())
  })

  bot.on('text', (ctx) => {
    ctx.reply(`Echo: ${ctx.message.text}`)
  })

  bot.catch((err) => {
    console.log(err)
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
