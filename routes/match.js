const express = require('express');

const router = express.Router();
const axios = require("axios");

const User = require("../models/User");
const Match = require("../models/Match");



// HTTP GET - display details a specific match by id
// for prodaction
router.get('/match/details/:id', (req, res) => {
  /* const options = {
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
   // res.render("match/details" , {match : response.data});
   res.render("match/details" , {match : response.data});
  }).catch(error=> {
    console.error(error);
  }); */

  res.redirect("/test/match/details/")
});

// only for test
router.get('/test/match/details/', (req, res) => {
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cgsmbUXZki?indent=2',
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.render("match/details", { response: response.data });
  }).catch(function (error) {
    console.error(error);
  });
})

router.post("/vote/:matchID", (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      console.log("=====================================");
      console.log(user);
      console.log("=====================================");

      Match.findOneAndUpdate({ fixtureID: req.params.matchID }, { $push: { votes: [{ user: user, vote: req.body.vote }] } })
        .then(update => {
          console.log("=======--------------------=========");

          console.log(update);
          console.log("=======--------------------=========");

          User.findByIdAndUpdate(req.user.id, { $push: { voteMatchs: [{ match: update, vote: req.body.vote }] } })
          .then(result => {
            console.log(result);
            res.redirect("/test/match/details/");
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
  
  



  module.exports = router;