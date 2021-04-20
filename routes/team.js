const express = require('express');

const router = express.Router();

const axios = require("axios");
const User = require('../models/User');



// router.get("/team/details/:teamID", (req,res)=>{

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

//         res.render("team/details" , {team : response.data});
//       }).catch(function (error) {
//           console.error(error);
//       });
// })

// router.get("/team/details/", (req,res)=>{

//     const options = {
//         method: 'GET',
//         url: 'http://www.json-generator.com/api/json/get/cpOuuObTKG?indent=2'};

//         axios.request(options).then(function (response) {
            
//             res.render("team/details" , {response : response.data});

//         })
//         .catch(function (error) {
//                    console.error(error);
//                 });

// })

router.get("/team/details/", (req,res)=>{

  const options = {
      method: 'GET',
      url: 'http://www.json-generator.com/api/json/get/cfzvjdcvdu?indent=2'};

      axios.request(options).then(function (team) {
        // res.render("team/details" , {team : team.data });


        const options2 = {
          method: 'GET',
          url: 'http://www.json-generator.com/api/json/get/bVGcPdYhQi?indent=2'};
    
          axios.request(options2).then(function (player) {


           

            res.render("team/details" , {team : team.data , player:player.data});
          })
          
          .catch(function (error) {
            console.error(error);
         });
      })
      .catch(function (error) {
                 console.error(error);
              });

})


router.post("/team/favorite/:id", (req,res)=>{

    User.findOneAndUpdate(req.user , { $push: { favoriteTeams: req.params.id}})
    .then(user => {
        res.send("Done");
    })
    .catch(err => {
        console.log(err);
      })
})




router.get("/player/statstics", (req,res)=>{
//=================================
// by LEAGUE ID
//http://www.json-generator.com/api/json/get/cgCTTDPUjm?indent=2
//=================================

    // const options = {
    //     method: 'GET',
    //     url: 'https://api-football-v1.p.rapidapi.com/v3/players',
    //     params: {league: '39', season: '2020'},
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
      //   url: 'https://api-football-v1.p.rapidapi.com/v3/players',
      //   params: {team: '33', season: '2020'},
      //   headers: {
      //     'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
      //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      //   }
      // };
      
    const options = {
      method: 'GET',
      url: 'http://www.json-generator.com/api/json/get/bUrDbgmusy?indent=2' };

        axios.request(options).then(function (response) {
            
            res.render("team/details" , {response : response.data});

        })
        .catch(function (error) {
                   console.error(error);
                });

})


//================================
//http://www.json-generator.com/api/json/get/cffaPzJwoi?indent=2
//================================
router.get("/team/statstics", (req,res)=>{


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
      url: 'http://http://www.json-generator.com/api/json/get/cffaPzJwoi?indent=2' };

      
      axios.request(options).then(function (response) {
          res.json(response.data)
      }).catch(function (error) {
          console.error(error);
      });
    
})

//================================
//http://www.json-generator.com/api/json/get/coVfiUkhrC?indent=2
//================================
router.get("/player/trophies", (req,res)=>{


    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/trophies',
        params: {player: '276'},
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
router.get("/top/scorers", (req,res)=>{
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers',
        params: {league: '307', season: '2020'},
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