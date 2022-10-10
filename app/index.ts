import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

import { Context } from 'telegraf';
import Telegraf, { Extra, session } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

import Help from './help/index';
import { AppDataSource } from "./data-source"
import { exit } from 'process';

const token: string = process.env.TELEGRAM_BOT_TOKEN || '';
const env = process.env.ENVIRONMENT;
const bot = new Telegraf(token);

type BotOpts = {
  production?: boolean;
  url?: string;
  port?: number;
}

const start = async function (bot: Telegraf<TelegrafContext>, opts: BotOpts) {
  try {
    await AppDataSource.initialize();
  } catch (err) {
    console.error('Could not connect to the database', err);
    exit(1)
  }
  bot.use(session());

  bot.command('help', (ctx: Context) => {
    ctx.reply(Help.getCommands(), Extra.HTML())
  });

  bot.on('text', (ctx: Context) => {
    ctx.reply('I didn\'t learn that command')
  });

  if (opts.production) {
    bot.launch({
      webhook: {
        domain: opts.url,
        port: opts.port
      }
    });
  } else {
    bot.launch();
  }
  console.log('Bot listening...');
}

if (env === 'production' || env === 'staging') {
  start(bot, {
    production: true,
    url: process.env.URL,
    port: Number(process.env.PORT)
  })
} else {
  start(bot, {})
}
