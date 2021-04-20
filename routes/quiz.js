const express = require('express');
const router = express.Router();
const axios = require("axios");
let quizzes = require("../public/quiz.json")




router.get("/quiz/index1", (req, res) => {
    
    res.render("quiz/index" , {quizzes});

})



router.get("/quiz/index", (req, res) => {
   random = Math.floor(Math.random() * 10)
   question=  quizzes[random].question
   choices = [quizzes[random].choose1,quizzes[random].choose2,quizzes[random].correct]
    shuffled = choices.sort(() => Math.random() - 0.5)
   correct =quizzes[random].correct;
    res.render("quiz/index2" , {question,shuffled,correct});

})
module.exports = router;