const express = require('express');
const router = express.Router();
const axios = require("axios");
let quizzes = require("../public/quiz.json")



let quizzQuestions = []
let score=0
for(let i=0; i<10;i++){quizzQuestions.push(i)}
shuffledQuestions = quizzQuestions.sort(() => Math.random() - 0.5)
quizzQuestions =[...shuffledQuestions]

router.get("/quiz", (req,res)=>{
    

     res.redirect("/quiz/index");
})
router.get("/quiz/index", (req, res) => {

    currentQuestion = shuffledQuestions.pop()
    question = quizzes[currentQuestion].question
    choices = [quizzes[currentQuestion].choose1, quizzes[currentQuestion].choose2, quizzes[currentQuestion].correct]
    shuffled = choices.sort(() => Math.random() - 0.5)
    
   
    res.render("quiz/index2", { question, shuffled });

})

router.post("/quiz/index", (req, res) => {

    if( req.body.choice == quizzes[quizzQuestions[shuffledQuestions.length]].correct &&shuffledQuestions.length >0){
        score++
    currentQuestion = shuffledQuestions.pop()
    question = quizzes[currentQuestion].question
    choices = [quizzes[currentQuestion].choose1, quizzes[currentQuestion].choose2, quizzes[currentQuestion].correct]
    shuffled = choices.sort(() => Math.random() - 0.5)
    
   
    res.render("quiz/index2", { question, shuffled });
    }

    else{
        res.render("home/current");
    }
    

})

module.exports = router;