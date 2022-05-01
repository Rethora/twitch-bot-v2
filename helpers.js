const { scoredMatches, roasts } = require("./assets")

const isGoal = (text) =>
  scoredMatches.some((match) => text.toLowerCase().includes(match))

const isGoalStreamers = (text, rlName) => {
  for (let i = 0; i < rlName.length; i++) {
    if (i + 2 < rlName.length) {
      if (text.toLowerCase().includes(`${rlName[i].toLowerCase()}${rlName[i + 1].toLowerCase()}`)) {
        return true
      }
    } else {
      if (text.toLowerCase().includes(`${rlName[i - 1].toLowerCase()}${rlName[rlName.length - 1].toLowerCase()}`)) {
        return true
      }
    }
  }
  return false
}

const usedIdxs = []
const getRandomRoast = () => {
  let randomIdx = getRandomIdx(roasts.length)
  while (usedIdxs.includes(randomIdx)) {
    randomIdx = getRandomIdx(roasts.length)
  }
  return roasts[randomIdx]
}

const getRandomIdx = (arrayLength) => Math.floor(Math.random() * arrayLength)

module.exports = {
  isGoal: isGoal,
  isGoalStreamers: isGoalStreamers,
  getRandomRoast: getRandomRoast
}
