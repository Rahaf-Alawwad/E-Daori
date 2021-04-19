require('dotenv').config();
const express = require('express');

const User = require("../models/User");
const Match = require("../models/Match");

const router = express.Router();
const axios = require("axios");


router.get('/test', (req, res) => {

  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cenUDEiMmW?indent=2',

  };

  axios.request(options).then(function (response) {
    res.render("home/home", { response: response.data });

  }).catch(function (error) {
    console.error(error);
  });
})

/* router.get('/fetch', (req,res)=>{
 
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: {league: '307', season: '2020'},
    headers: {
      'x-rapidapi-key': process.env.APIKey,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
 
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})
 
 
 
router.get('/prediction', (req,res)=>{
 
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    params: {league: '307', season: '2020'},
    headers: {
      'x-rapidapi-key': process.env.APIKey,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}) */

router.get("/vote", (req, res) => {
  res.render("home/vote")
})

router.post("/vote", (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      Match.findOneAndUpdate({ fixtureID: req.body.matchID }, { $push: { votes: [{ user: user , vote: req.body.vote }] }})
        .then(update => {
          res.render("home/vote")
        })
        .catch(err => {
          console.log(err);
        })

    }).catch(err => {
      console.log(err);
    })

})

module.exports = router;