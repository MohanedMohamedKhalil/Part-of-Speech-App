const express = require("express");
const router = express.Router();
const quizController = require("../Controllers/quizController");

router.get("/words", quizController.getWords);

router.post("/rank", quizController.getRank);

module.exports = router;
