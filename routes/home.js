require('dotenv').config();
const express = require('express');

const User = require("../models/User");
const Match = require("../models/Match");

const router = express.Router();
const axios = require("axios");

const isLoggedIn = require("../helper/isLoggedIn");
const { render } = require('ejs');

function getDate(currentDate, addDays) {
  let year = currentDate.getFullYear()
  let month = parseInt(currentDate.getMonth()) + 1 < 10 ? "0" + (parseInt(currentDate.getMonth()) + 1) : parseInt(currentDate.getMonth()) + 1
  let day = parseInt(currentDate.getDate()) + addDays < 10 ? "0" + (parseInt(currentDate.getDate()) + addDays) : parseInt(currentDate.getDate()) + addDays
  return (year + "-" + month + "-" + day)
}

router.get("/test/button",(req,res)=>{
  res.render("test")
})
router.get("/home/current", (req, res) => {
  //let currrentDate = getDate(new Date(),0)
  // const options = {
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {date: currrentDate,  league: '307',  season: '2020'},
  //   headers: {
  //     'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //   }
  // };
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/coDSWWSOmq?indent=2',

  };

  axios.request(options).then(function (response) {

    res.render("home/home", { response: response.data });
  }).catch(function (error) {
    console.error(error);
  });
})




router.get("/home/last", (req, res) => {
  var currentDate = new Date();
  let toDate = getDate(currentDate, -1);
  let fromDate = getDate(currentDate, -8)

  // const options = {
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: '307', season: '2020', from: fromDate, to: toDate},
  //   headers: {
  //     'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //   }
  // };
  const options = {
    method: 'GET',
    url: ' http://www.json-generator.com/api/json/get/bSaXFoeTCa?indent=2',

  };

  axios.request(options).then(function (response) {

    res.render("home/home", { response: response.data });
  }).catch(function (error) {
    console.error(error);
  });
})
router.get("/home/next", (req, res) => {
  var currentDate = new Date();
  let fromDate = getDate(currentDate, 1);
  let toDate = getDate(currentDate, 8)

  // const options = {
  //   method: 'GET',
  //   url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
  //   params: {league: '307', season: '2020', from: fromDate, to: toDate},
  //   headers: {
  //     'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //   }
  // };
  const options = {
    method: 'GET',
    url: ' http://www.json-generator.com/api/json/get/bZHPYNcOaa?indent=2',

  };


  axios.request(options).then(function (response) {
    res.render("home/home", { response: response.data });
  }).catch(function (error) {
    console.error(error);
  });
})

router.get('/home/previous', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: '307', season: '2020', status: 'FT' },
    headers: {
      'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    res.render("home/home", { response: response.data });
  }).catch(function (error) {
    console.error(error);
  });
})


router.get('/home/upcoming', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    params: { league: '307', season: '2020', status: 'NS' },
    headers: {
      'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    res.render("home/home", { response: response.data });
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

// router.get("/vote", (req, res) => {
//   res.render("home/vote")
// })

// router.post("/vote", isLoggedIn, (req, res) => {
//   User.findById(req.user.id)
//     .then(user => {
//       Match.findOneAndUpdate({ fixtureID: req.body.matchID }, { $push: { votes: [{ user: user, vote: req.body.vote }] } })
//         .then(update => {
//           res.render("home/vote")
//         })
//         .catch(err => {
//           console.log(err);
//         })

//     }).catch(err => {
//       console.log(err);
//     })

// })

router.post("/search", isLoggedIn, (req, res) => {


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
      res.render("home/favoriteTeam", { response: favTeam })
    }).catch(err => console.log(err))


  }).catch(function (error) {
    console.error(error);
  });

})





module.exports = router;