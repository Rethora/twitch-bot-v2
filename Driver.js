const pngCrop = require("png-crop")
const { Builder } = require("selenium-webdriver")
require("chromedriver")

class Driver {
  constructor(channel) {
    this.channel = channel
    this.player = this.buildPlayer()
    this.makeFullScreen()
  }

  buildPlayer() {
    return new Builder().forBrowser("chrome").build()
  }

  makeFullScreen() {
    this.player.manage().window().maximize()
  }

  async loadChannel() {
    try {
      await this.player.get(
        `https://player.twitch.tv/?channel=${this.channel}&enableExtensions=true&muted=true&parent=twitch.tv&player=popout&quality=auto&volume=0.0`
      )
    } catch (err) {
      console.error(err)
    }
  }

  async takeCroppedScreenshot() {
    try {
      const screenshot = await this.player.takeScreenshot()
      const options = { width: 1200, height: 110, top: 275, left: 500 }
      pngCrop.crop(
        Buffer.from(screenshot, "base64"),
        "./cropped.png",
        options,
        (err) => {
          if (err) {
            console.error(err)
          }
        }
      )
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = Driver
