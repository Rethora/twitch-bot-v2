const tmi = require("tmi.js")
const config = require("./config.json")
const { handleGoalWatch } = require("./util")
require("dotenv").config()

const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: config.botName,
    password: process.env.OAUTH_TOKEN
  },
  channels: [config.channelName]
})

client.connect()

client.on("join", (channel) => {
  handleGoalWatch(
    config.channelName,
    config.interval,
    config.rlName,
    client,
    channel
  )
  console.log(channel)
})

client.on("message", (channel, tags, message, self) => {
  if (self || !message.startsWith("!")) return
  const args = message.slice(1).split(" ")
  const command = args.shift().toLowerCase()
  if (command === "hello") {
    client.say(channel, `@${tags.username}, hi!`)
  }
})
