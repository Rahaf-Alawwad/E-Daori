const express = require('express');

const router = express.Router();

const axios = require("axios");



router.get("/team/details/:teamID", (req,res)=>{

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/teams',
        params: {id: "2939"},
        headers: {
          'x-rapidapi-key': '4841aa3b86msha792848b61a8cefp19f1b8jsn6ab83c1bc281',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {

        res.render("team/details" , {team : response.data});
      }).catch(function (error) {
          console.error(error);
      });
})

router.get("/team/details/", (req,res)=>{

    const options = {
        method: 'GET',
        url: 'http://www.json-generator.com/api/json/get/cpOuuObTKG?indent=2'};

        axios.request(options).then(function (response) {
            
            res.render("team/details" , {response : response.data});

        })

})

module.exports = router;