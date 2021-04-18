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


router.get("/vote", (req,res)=>{
    res.render("home/vote")
})

router.post("/vote", (req,res)=>{
User.findById(req.user.id)
.then(user=>{
    Match.findOneAndUpdate({fixtureID:req.body.matchID}, { $push:{vote : [{user: user} , {vote:req.body.vote}] }})
    .then(update=>{
        res.send("Done")
    })
    .catch(err=>{
        console.log(err);
    })
    
}).catch(err=>{
    console.log(err);
})

})

module.exports = router;