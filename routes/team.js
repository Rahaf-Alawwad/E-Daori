
const express = require('express');

const router = express.Router();

const axios = require("axios");
const User = require('../models/User');


const isLoggedIn = require("../helper/isLoggedIn");


<<<<<<< HEAD
/* router.get("/team/details/:teamID", (req,res)=>{
=======
/* router.get("/team/details/:teamID",isLoggedIn, (req,res)=>{

>>>>>>> bc97f97cd3fec4a60439f816c7883c0b657772bc
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {id: "2939"},
        headers: {
          'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
      };
<<<<<<< HEAD
// router.get("/team/details/:teamID", (req,res)=>{
=======
// router.get("/team/details/:teamID",isLoggedIn, (req,res)=>{

>>>>>>> bc97f97cd3fec4a60439f816c7883c0b657772bc
//     const options = {
//         method: 'GET',
//         url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
//         params: {id: "2939"},
//         headers: {
//           'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
//           'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
//         }
//       };
      
//       axios.request(options).then(function (response) {
        res.render("team/details" , {response : response.data});
      }).catch(function (error) {
          console.error(error);
      }); 
      res.redirect('/team/details')
}) */
/*
router.get("/team/details/:matchID",isLoggedIn, (req,res)=>{

 // let flag = true;
         
//         res.render("team/details" , {team : response.data});
//       }).catch(function (error) {
//           console.error(error);
//       });
// })
<<<<<<< HEAD
// router.get("/team/details/", (req,res)=>{
=======

// router.get("/team/details/",isLoggedIn, (req,res)=>{

>>>>>>> bc97f97cd3fec4a60439f816c7883c0b657772bc
//     const options = {
//         method: 'GET',
//         url: 'http://www.json-generator.com/api/json/get/cpOuuObTKG?indent=2'};
        // axios.request(options).then(function (response) {
//         axios.request(options).then(function (response) {
            
//             res.render("team/details" , {response : response.data});
//         })
//         .catch(function (error) {
//                    console.error(error);
       //          });
})
*/
router.get("/team/details",isLoggedIn, (req, res) => {
  let flag = true
  console.log('req.query.teamID')

  console.log(req.query.teamID)
  const options = {
    method: 'GET',
    url: 'http://www.json-generator.com/api/json/get/cfzvjdcvdu?indent=2'
  };
  
  axios.request(options).then(function (team) {
    // res.render("team/details" , {team : team.data });
    
    
    const options2 = {
      method: 'GET',
      url: 'http://www.json-generator.com/api/json/get/bVGcPdYhQi?indent=2'
    };
    
    axios.request(options2).then(function (player) {
      console.log(req.query.teamID)
      
      User.findById(req.user.id).then(result => {
       console.log(result)
        result.favoriteTeams.forEach(element => {
          if (flag && element === req.query.teamID) {
            flag = false;
            res.render('team/favodetails', { team: team.data, player: player.data })
            /*res.json({response : response.data})  */
          }
        });
        if (flag) {
          res.render("team/details", { team: team.data, player: player.data });
        }

      }).catch(err => console.log(err))

      // res.render("team/details" , {team : team.data , player:player.data});
    }).catch(function (error) {
      console.error(error);
    });
  }).catch(function (error) {
    console.error(error);
  });



})




// i am
router.post("/team/favorite",isLoggedIn, (req, res) => {
  console.log("==============");
  console.log(req.query.teamName)
  console.log("==============");

  User.findOneAndUpdate(req.user.id, { $push: { favoriteTeams:  [{name: req.query.teamName,logo:req.query.img}] }})
    .then(user => {
      console.log("USer in fav"+user)
      res.redirect("/team/details?teamID=" + req.query.teamID)
      /* res.render('team/favoDetails', {response : response.data}) */
    })
    .catch(err => {
      console.log(err);
    })
}) 




router.get("/player/statstics",isLoggedIn, (req, res) => {
  //=================================
  // by LEAGUE ID
  //http://www.json-generator.com/api/json/get/cgCTTDPUjm?indent=2
  //=================================

  // const options = {
  //     method: 'GET',
  //     url: 'https://api-football-v1.p.rapidapi.com/v3/players',
  //     params: {league: '307', season: '2020'},
  //     headers: {
  //       'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //     }
  //   };

  //   axios.request(options).then(function (response) {
  //       res.json(response.data);
  //   }).catch(function (error) {
  //       console.error(error);
  //   });

  //=====================================
  // by TEAM ID
  //http://www.json-generator.com/api/json/get/bUrDbgmusy?indent=2
  //=====================================

  // const options = {
  //   method: 'GET',
  //   url: 'http://www.json-generator.com/api/json/get/bUrDbgmusy?indent=2'
  // };

  // axios.request(options).then(function (response) {

  //   res.render("team/details", { response: response.data });

  // })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

})


//================================
//http://www.json-generator.com/api/json/get/cfzvjdcvdu?indent=2
//================================
router.get("/team/statstics",isLoggedIn, (req, res) => {


  // const options = {
  //     method: 'GET',
  //     url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
  //     params: {league: '307', season: '2020', team: '2939'},
  //     headers: {
  //       'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
  //       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //     }
  //   };

  const options = {
    method: 'GET',
    url: 'http://http://www.json-generator.com/api/json/get/cffaPzJwoi?indent=2'
  };


  axios.request(options).then(function (response) {
    res.json(response.data)
  }).catch(function (error) {
    console.error(error);
  });

})

//================================
//http://www.json-generator.com/api/json/get/coVfiUkhrC?indent=2
//================================
router.get("/player/trophies",isLoggedIn, (req, res) => {


  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/trophies',
    params: { player: '276' },
    headers: {
      'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });

})


//================================
//http://www.json-generator.com/api/json/get/bVetRIyAgO?indent=2
//================================
router.get("/top/scorers",isLoggedIn, (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
    params: { league: '307', season: '2020' },
    headers: {
      'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
})
module.exports = router;