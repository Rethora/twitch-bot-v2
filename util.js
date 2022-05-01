const Driver = require("./Driver")
const { isGoal, isGoalStreamers, getRandomRoast } = require("./helpers")
const TextReader = require("./TextReader")

const handleGoalWatch = async (
  channelName,
  interval,
  rlName,
  client,
  channel
) => {
  let driver, textReader
  // intialize driver and text reader
  try {
    driver = new Driver(channelName)
    await driver.loadChannel()
    textReader = new TextReader()
    await textReader.initializeWorker()
  } catch (err) {
    console.error(err)
  }
  // set repeating task to check read text from image
  setInterval(async () => {
    // if an image is in progress of being read, don't start another one until it is done
    if (textReader.isReading) return
    await driver.takeCroppedScreenshot()
    const text = await textReader.readText()
    // say something if streamer scored a goal
    if (isGoal(text)) {
      if (isGoalStreamers(text, rlName)) {
        client.say(channel, `@${channelName} ${getRandomRoast()}`)
        await new Promise(r => setTimeout(r, 5000))
      }
    }
  }, interval)
}

module.exports = {
  handleGoalWatch: handleGoalWatch
}
