require('dotenv').config();
const express = require('express');

const User = require("../models/User");
const Match = require("../models/Match");

const router = express.Router();
const axios = require("axios");




router.get("/home", (req, res) => {
  d = req.query.current
  //new Date(<your-date-object>.toDateString());
  let currrentDate = new Date("2020-10-17T18:15:00+00:00").getTime();
  //let currrentDate= d//new Date(d)
  console.log("d Date: " + d)
  console.log("cur Date: " + currrentDate)
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cenUDEiMmW?indent=2',

  };

  axios.request(options).then(function (response) {

    let flag = true;
    let first = true;
    let currentWeekStored = true;

    let counter = 0;
    let days = 0
    let todayMatches = [];
    let currentWeek = [];
    while (flag) {
      responseDate = new Date(response.data.response[counter].fixture.date).getTime();
      if (responseDate > currrentDate) {
        flag = false
      }
      else {
        if ((Math.ceil((currrentDate - responseDate) / (1000 * 60 * 60 * 24))) <= 1) {
          todayMatches.push(response.data.response[counter])

        }
        counter++
      }
    }
    // while(flag){
    //   responseDate = new Date(response.data.response[counter].fixture.date)

    //     while((Math.ceil((currrentDate - responseDate.getTime()) / (1000 * 60 * 60 * 24))) <= 7){
    //       console.log(counter)
    //      if (first){
    //       days = responseDate.getDay()
    //       first = false
    //      }
    //       responseDate.getDay()
    //       if ( responseDate.getDay()%days!=0){
    //       currentWeek.push(response.data.response[counter])
    //       if(currrentDate == responseDate.getTime()){
    //       todayMatches =push(response.data.response[counter])

    //       }


    //     }
    //     else{
    //       flag=false
    //     }
    //     counter++
    //     }


    //   counter++
    //   console.log("outter while "+counter)



    //   }




    res.render("home/home", { response: todayMatches });

  }).catch(function (error) {
    console.error(error);
  });


})

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
      Match.findOneAndUpdate({ fixtureID: req.body.matchID }, { $push: { votes: [{ user: user, vote: req.body.vote }] } })
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

router.post("/search", (req, res) => {


  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
    params: { name: req.body.search },
    headers: {
      'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    // todo alret can not be null
    res.redirect("/team/details?teamID=" + response.data.response[0].team.id)
  }).catch(function (error) {
    console.error(error);
  });
})




// get all match not started that matchs with user favo 
router.get('/favoriteteams', (req, res) => {
  let favTeam = [];
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cbewZOFixu?indent=2',
  };
  // http://www.json-generator.com/api/json/get/cbewZOFixu?indent=2

  // const options2 = {
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: '307', season: '2020', status: 'NS'},
  //   headers: {
  //     'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //   }
  // };


  axios.request(options).then(function (response) {

    User.findById(req.user.id).then(result => {
      result.favoriteTeams.forEach(id => {
        response.data.response.forEach(match => {

          if (match.teams.home.id == id || match.teams.away.id == id) {
            favTeam.push(match);
          }

        })
      });
      res.render("home/favoriteTeam",{response :favTeam})
    }).catch(err => console.log(err))


  }).catch(function (error) {
    console.error(error);
  });

})





module.exports = router;