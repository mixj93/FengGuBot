const Telegraf = require('telegraf')
const SocksProxyAgent = require('socks-proxy-agent')
const express = require('express')
const expressApp = express()
const DATA = require('./data')

const API_TOKEN = process.env.API_TOKEN || ''
const PORT = process.env.PORT || 3000
const URL = process.env.URL || ''
const BOT_USERNAME = process.env.BOT_USERNAME || ''

const logger = (msg) => `[${msg.from.id}] ${msg.from.first_name} ${msg.from.last_name} (${msg.from.username}) ${msg.from.language_code}`

if (!BOT_USERNAME) {
  console.error('Please set bot username.')
  return
}

let agent = null
if (process.env.SOCKS_PROXY) {
  agent = new SocksProxyAgent(process.env.SOCKS_PROXY)
}

const bot = new Telegraf(process.env.BOT_TOKEN, { telegram: { agent } })

bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
expressApp.use(bot.webhookCallback(`/bot${API_TOKEN}`));
expressApp.get('/ping', (req, res) => {
  res.send('pong');
});
expressApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

bot.help((ctx) => {
  console.log(`[HELP] ${logger(ctx.update.message)}`)
  ctx.reply(DATA.HELP_MSG)
})

bot.command('movies', (ctx) => {
  const msg = ctx.update.message
  console.log(`[MOVIES] ${logger(ctx.update.message)}`)
  ctx.reply(DATA.MOVIES_INFO)
})

bot.command('tv', (ctx) => {
  const msg = ctx.update.message
  console.log(`[TV] ${logger(ctx.update.message)}`)
  ctx.reply(DATA.TV_INFO)
})
bot.mention(process.env.BOT_USERNAME, ctx => {
  const msg = ctx.update.message
  const keyword = msg.text.split(`@${BOT_USERNAME}`).join(' ').trim().replace(/\s\s+/g, ' ')
  console.log(`[SEARCH] ${logger(ctx.update.message)}, ${keyword}`)
  ctx.reply(DATA.getSearchRes(keyword), {
    reply_to_message_id: msg.message_id
  })
})
bot.launch()
