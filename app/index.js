const dotenv = require('dotenv')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Session = require('telegraf/session')
const rollbar = require('../config/rollbar')
const db = require('../config/db')
const Help = require('./help/index.js')
const Category = require('./category/index.js')

dotenv.config()

const token = process.env.TELEGRAM_BOT_TOKEN
const env = process.env.ENVIRONMENT
const bot = new Telegraf(token)

const start = function (bot, opts) {
  // setup database
  db.createTables()

  bot.use(Session())

  bot.command('help', ({ reply }) => {
    reply(Help.getCommands(), Extra.HTML())
  })

  bot.command('addcategory', async (ctx) => {
    const replyMessage = await new Category(ctx).create()
    ctx.reply(replyMessage)
  })

  bot.on('text', (ctx) => {
    ctx.reply('I didn\'t learn that command')
  })

  bot.catch((err) => {
    rollbar.error(err)
    console.error(err)
  })

  if (opts.production) {
    bot.launch({
      webhook: {
        domain: opts.url,
        port: opts.port
      }
    })
  } else {
    rollbar.error('Started')
    bot.launch()
  }
}

if (env === 'production' || env === 'staging') {
  start(bot, {
    production: true,
    url: process.env.URL,
    port: process.env.PORT
  })
} else {
  start(bot, {})
}
