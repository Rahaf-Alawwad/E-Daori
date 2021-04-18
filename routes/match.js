const express = require('express');

const router = express.Router();


// HTTP GET - display details a specific match by id
router.get('/match/details/:id', (req, res) => {
    
    const options = {
        method: 'GET',
        url:'http://www.json-generator.com/api/json/get/cenUDEiMmW?indent=2',
    
      };
      
      axios.request(options).then(function (response) {
        /*
         * TODO get specific match by id 
         */
          res.render("match/details" , {response : response.data});
          
      }).catch(function (error) {
        console.error(error);
      });
});





module.exports = router;