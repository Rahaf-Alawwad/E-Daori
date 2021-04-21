const express = require('express');

const router = express.Router();

const axios = require("axios");

const User = require("../models/User");
const Match = require("../models/Match");
const Quizzes = require("../models/Quizzes");



// add matches to the DB
router.get("/admin/match", (req,res)=>{

    const options = {
        method: 'GET',
        url:'http://www.json-generator.com/api/json/get/cenUDEiMmW?indent=2',
    
      };
      
      axios.request(options).then(function (response) {
       console.log(response)
        response.data.response.forEach(element => {
            let newMatch= new Match();
            newMatch.fixtureID = element.fixture.id;
            newMatch.teamOne= element.teams.home.name;
            newMatch.teamTwo= element.teams.away.name;
            newMatch.matchTime = element.fixture.date;
            newMatch.save().then(user=>{
                res.send("")
            }).catch(err=>{
                console.log(err);
            })
            
            
        });      
    
    });


})

// show all element
 router.get("/admin/index", (req, res) => {  
    Quizzes.find().then(result =>{
        res.render("admin/index",{question :result})
    }).catch(err =>{
        console.log(err);
    })
   })
   // open add page
   router.get("/admin/add", (req, res) => {
       res.render("admin/add")
    })
    // add qustion
 router.post("/admin/add", (req, res) => {
     let newQuiz = new Quizzes(req.body)
     newQuiz.save()
     .then(()=>{
         res.redirect('/admin/index')
     })
     .catch(err =>{
        console.log(err);
    })
    
  })
  


// router.get("/vote", (req, res) => {
//     res.render("home/vote")
//   })
router.get("/admin/edit", (req, res) => {

    
    Quizzes.findById(req.query.id).then(result =>{
        console.log(result);
        res.render("admin/edit",{question :result})
    }).catch(err =>{
        console.log(err);
    })
 })
 
 router.post("/admin/edit", (req,res)=>{
     console.log('req.query.id')
     console.log(req.query.id)
    Quizzes.findByIdAndUpdate(req.query.id,req.body).then(()=>{
        res.redirect('/admin/index')
    }).catch(err =>{
        console.log(err);
    })
})
  
 
router.post("/admin/delete", (req, res) => {
    Quizzes.findByIdAndDelete(req.query.id)
        .then(() => {
                res.redirect("/admin/index")
        })
        .catch (err => {
        console.log(err)
})
})

module.exports = router;