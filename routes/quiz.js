const express = require('express');
const router = express.Router();
const axios = require("axios");
let quizzes = require("../public/quiz.json")



let quizzQuestions = []
for(let i=0; i<10;i++){quizzQuestions.push(i)}
shuffledQuestions = quizzQuestions.sort(() => Math.random() - 0.5)

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
    console.log(shuffledQuestions)
    console.log(req.body.choice )
    console.log(quizzes[shuffledQuestions[shuffledQuestions.length-2]].correct)
    if( req.body.choice == quizzes[shuffledQuestions[shuffledQuestions.length-2]].correct ){
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