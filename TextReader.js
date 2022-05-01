const { createWorker } = require("tesseract.js")

class TextReader {
  constructor() {
    this.worker = this.makeWorker()
    this.isReading = false
  }

  makeWorker() {
    return createWorker({
      // logger: (m) => console.log(m),
      errorHandler: (e) => console.error(e)
    })
  }

  async initializeWorker() {
    try {
      await this.worker.load()
      await this.worker.loadLanguage("eng")
      await this.worker.initialize("eng")
    } catch (err) {
      console.error(err)
    }
  }

  async readText() {
    this.isReading = true
    try {
      const {
        data: { text }
      } = await this.worker.recognize("./cropped.png")
      // await this.worker.terminate()
      return text
    } catch (err) {
      console.error(err)
      return ""
    } finally {
      this.isReading = false
    }
  }
}

module.exports = TextReader
