require('dotenv').config()

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const ngrok = require('ngrok')
const Rollbar = require('rollbar')

const HelpController = require('./use-case/help/help')

const token = process.env.TELEGRAM_BOT_TOKEN
const env = process.env.ENVIRONMENT
const bot = new Telegraf(token)

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
})

const start = function (url, port, bot) {
  bot.command('help', ({ reply }) => {
    rollbar.log('help command')
    reply(HelpController.getCommands(), Extra.HTML())
  })

  bot.on('text', (ctx) => {
    ctx.reply(`Echo: ${ctx.message.text}`)
  })

  bot.catch((err) => {
    rollbar.error(err)
    console.log(err)
  })

  bot.launch({
    webhook: {
      domain: url,
      port: port
    }
  })
}

rollbar.log(process.env.ENVIRONMENT)

if (env === 'production' || env === 'staging') {
  rollbar.log('Hello world!')
  rollbar.log(process.env.URL)
  start(process.env.URL, process.env.PORT, bot)
} else {
  ngrok
    .connect(process.env.PORT)
    .then((url) => {
      rollbar.log(url)
      start(url, process.env.PORT, bot)
    })
    .catch(e => console.error(e))
}
