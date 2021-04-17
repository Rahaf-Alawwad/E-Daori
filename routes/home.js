const express = require('express');

const router = express.Router();

router.get('/test', (req,res)=>{

    const options = {
      method: 'GET',
      url:'http://www.json-generator.com/api/json/get/cenUDEiMmW?indent=2',
  
    };
    
    axios.request(options).then(function (response) {
      res.json(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  })
  
  router.get('/fetch', (req,res)=>{
  
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
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
  
  
  
  router.get('/prediction', (req,res)=>{
  
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
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