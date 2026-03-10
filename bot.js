const { Client, GatewayIntentBits } = require("discord.js")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
})

client.login(process.env.BOT_TOKEN)

module.exports = client