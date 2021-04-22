module.exports = (req, res, next) => {
    if(req.user.id == process.env.ADMIN)
    {
        next(); 
       
    }
    else{
        res.redirect('/profile'); 
     
       
    }
}