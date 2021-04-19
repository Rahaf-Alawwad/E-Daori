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



// router.get("/vote", (req, res) => {
//     res.render("home/vote")
//   })
  
 


module.exports = router;