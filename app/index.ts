import { config as dotEnvConfig } from 'dotenv';

import Telegraf, { Extra, session, Context } from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';

import { exit } from 'process';
import Help from './use-cases/help/index';
import { AppDataSource } from './data-source';
import Start from './use-cases/start';
import UserRepository from './repositories/user';

dotEnvConfig();

const token: string = process.env.TELEGRAM_BOT_TOKEN || '';
const env = process.env.ENVIRONMENT;
const telegrafBot = new Telegraf(token);

type BotOpts = {
  production?: boolean;
  url?: string;
  port?: number;
};

async function start(bot: Telegraf<TelegrafContext>, opts: BotOpts) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Could not connect to the database', err);
    exit(1);
  }
  bot.use(session());

  bot.help((ctx: Context) => {
    ctx.reply(Help.getCommands(), Extra.HTML());
  });

  bot.start(async (ctx: Context) => {
    const userRepository = new UserRepository();
    const useCase = new Start(userRepository);

    ctx.reply(await useCase.run(ctx.from), Extra.HTML());
  });

  bot.on('text', (ctx: Context) => {
    ctx.reply('I didn\'t learn that command');
  });

  if (opts.production) {
    bot.launch({
      webhook: {
        domain: opts.url,
        port: opts.port,
      },
    });
  } else {
    bot.launch();
  }
  // eslint-disable-next-line no-console
  console.log('Bot listening...');
}

if (env === 'production' || env === 'staging') {
  start(telegrafBot, {
    production: true,
    url: process.env.URL,
    port: Number(process.env.PORT),
  });
} else {
  start(telegrafBot, {});
}
