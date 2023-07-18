const scoresList = require("../Data/TestData.json").scoresList;
const wordsList = require("../Data/TestData.json").wordList;

exports.getWords = function (req, res) {
  // use getRandomWord Function to make sure that wordsList contain at least 1 adjective, 1 adverb, 1 noun, and 1 verb.
  const getRandomWord = (pos) => {
    const filterdPos = wordsList.filter((word) => word.pos === pos); // Array of same "pos" type
    const randomIndex = Math.floor(Math.random() * filterdPos.length);
    return filterdPos[randomIndex];
  };

  const adjective = getRandomWord("adjective");
  const adverb = getRandomWord("adverb");
  const noun = getRandomWord("noun");
  const verb = getRandomWord("verb");

  const newWordsList = [adjective, adverb, noun, verb];
  // Make Sure wordList not exceed 10
  while (newWordsList.length < 10) {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    // use if condition to make sure , there is no repeated words
    if (!newWordsList.includes(randomWord)) {
      newWordsList.push(randomWord);
    }
  }
  res.json(newWordsList);
};

exports.getRank = function (req, res) {
  const score = req.body.data.score; // get user Score
  const numsBelowScore = scoresList.filter((num) => num < score).length; // get # of numbers below score
  const rank = +((numsBelowScore / scoresList.length) * 100).toFixed(2); // calculte user's rank
  console.log(score, numsBelowScore, rank);
  res.json({ rank });
};
