const express = require('express');

const router = express.Router();
const axios = require("axios");

const User = require("../models/User");
const Match = require("../models/Match");



// HTTP GET - display details a specific match by id
// for prodaction
router.get('/match/details/:id', (req, res) => {
  /*
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {id: req.params.id},
    headers: {
      'x-rapidapi-key': process.env.APIKey,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(response => {
    console.log(response.data);
   //res.json({response : response.data});
    res.render("match/details" , {response : response.data}); 
  }).catch(error=> {
    console.error(error);
<<<<<<< HEAD
  }); 
  */
   res.redirect("/test/match/details/") 
});

// only for test
 router.get('/test/match/details/', (req, res) => {
=======
  });*/

  res.redirect("/test/match/details/"+req.params.id)
});

// only for test
router.get('/test/match/details/:id', (req, res) => {

let flag = true;
let arr;
let teamOne=0,teamTwo=0,tie=0;

>>>>>>> ac48c305875f7fd5e69fc8eb35dedce96e0add26
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cgsmbUXZki?indent=2',
  };

  axios.request(options).then(function (response) {
    console.log("match id"+ req.params.id);
    console.log("user id"+ req.user.id);
  
    User.findById(req.user.id).then(user=>{
      Match.findOne({fixtureID:req.params.id}).then(match=>{
        console.log(match);
        user.voteMatchs.forEach(elem=>{
        console.log(elem.match+" === "+match.id);
        if(flag && elem.match == match.id){
          flag = false;

          match.votes.forEach(eleme =>{ //localeCompare
            if(eleme.vote === "tie"){
            tie++
            }
            else if(eleme.vote === "teamOne"){
              teamOne++
            }
            else{
              teamTwo++
            }
          })

           arr=[
            (Math.round(((teamOne/match.votes.length)*100))+"%"),
            (Math.round(((teamTwo/match.votes.length)*100))+"%"),
            (Math.round(((tie/match.votes.length)*100))+"%")
          ]
          
          res.render("match/detailsAfterVote", { response: response.data, votedCount: arr});
          
        }
  
        })
        if (flag){
          res.render("match/details", { response: response.data});
        }
      }).catch(err =>{
        console.log(err)
      })
    })
  .catch(err =>{
    console.log(err)
  })
   
  }).catch(function (error) {
    console.error(error);
  });
}) 

router.post("/vote/:matchID", (req, res) => {

  User.findById(req.user.id)
    .then(user => {

      Match.findOneAndUpdate({ fixtureID: req.params.matchID }, { $push: { votes: [{ user: user, vote: req.body.vote }] } })
        .then(update => {
         

          User.findByIdAndUpdate(req.user.id, { $push: { voteMatchs: [{ match: update, vote: req.body.vote }] } })
          .then(result => {
            console.log(result);
            res.redirect("/vote/"+req.params.matchID);
          })
            .catch(err => {
              console.log(err);
            })
            .catch(err => {
              console.log(err);
            })

        }).catch(err => {
          console.log(err);
        })

    })
  
  })

  router.get("/vote/:matchID", (req, res) => {
   
   
    Match.findOne({ fixtureID: req.params.id })
    .then(match => {
      let teamOne=0,teamTwo=0,tie=0;

      console.log(match.votes)
      match.votes.forEach(eleme =>{ //localeCompare
        if(eleme.vote === "tie"){
        tie++
        }
        else if(eleme.vote === "teamOne"){
          teamOne++
        }
        else{
          teamTwo++
        }
      })
      console.log(`teamOne: ${Math.round(((teamOne/match.votes.length)*100))}% ! teamTwo: ${Math.round(((teamTwo/match.votes.length)*100))}% ! tie: ${Math.round(((tie/match.votes.length)*100))}%`);
  

      let arr=[
        Math.round(((teamOne/match.votes.length)*100)),
        Math.round(((teamTwo/match.votes.length)*100)),
        Math.round(((tie/match.votes.length)*100))
      ]
      res.redirect('/test/match/details/'+arr) 
    })
    .catch(err => {
      console.log(err);
    })





  })
  



  module.exports = router;