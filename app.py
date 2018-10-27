from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import requests
import logging
import os

logger = logging.getLogger(__name__)

PORT = os.getenv('PORT', 5000)
TOKEN = os.getenv('TELEGRAM_API_TOKEN')

def start(bot, update):
    update.message.reply_text('Hi!')


def help(bot, update):
    update.message.reply_text('Help!')


def echo(bot, update):
    update.message.reply_text(update.message.text)


def error(bot, update, error):
    logger.warning('Update "%s" caused error "%s"', update, error)


def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher

    # on different commands - answer in Telegram
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("help", help))
    dp.add_handler(MessageHandler(Filters.text, echo))
    dp.add_error_handler(error)

    updater.start_webhook(listen="0.0.0.0",
                    port=PORT,
                    url_path=TOKEN)
    updater.bot.set_webhook("https://70c25774.ngrok.io/" + TOKEN)
    updater.idle()


if __name__ == '__main__':
    main()
