require('dotenv').config()

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const ngrok = require('ngrok')

const rollbar = require('../config/rollbar')
const db = require('../config/db')

const Help = require('./use-case/help/index.js')
const Category = require('./use-case/category/create.js')

const token = process.env.TELEGRAM_BOT_TOKEN
const env = process.env.ENVIRONMENT
const bot = new Telegraf(token)

const start = function (url, port, bot) {
  db.createTables()

  bot.command('help', ({ reply }) => {
    reply(Help.getCommands(), Extra.HTML())
  })

  bot.command('addCategory', async ({ reply, message }) => {
    const msg = await Category.create(message)
    reply(msg)
  })

  bot.on('text', (ctx) => {
    ctx.reply(`Echo: ${ctx.message.text}`)
  })

  bot.catch((err) => {
    rollbar.error(err)
    console.error(err)
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
