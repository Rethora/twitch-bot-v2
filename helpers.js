const { scoredMatches, roasts } = require("./assets")

const isGoal = (text) =>
  scoredMatches.some((match) => text.toLowerCase().includes(match))

const isGoalStreamers = (text, rlName) => {
  for (let i = 0; i < rlName.length; i++) {
    if (i + 2 < rlName.length) {
      if (text.includes(`${rlName[i]}${rlName[i + 1]}`)) {
        return true
      }
    } else {
      if (text.includes(`${rlName[i - 1]}${rlName[rlName.length - 1]}`)) {
        return true
      }
    }
  }
  return false
}

const usedIdxs = []
const getRandomRoast = () => {
  let randomIdx = getRandomIdx()
  while (usedIdxs.includes(randomIdx)) {
    randomIdx = getRandomIdx()
  }
  return roasts[randomIdx]
}

const getRandomIdx = (arrayLength) => Math.floor(Math.random() * arrayLength)

module.exports = {
  isGoal: isGoal,
  isGoalStreamers: isGoalStreamers,
  getRandomRoast: getRandomRoast
}
