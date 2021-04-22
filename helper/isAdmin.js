module.exports = (req, res, next) => {
    if(req.user.id == "60808ba0e44eaf6efc4545e8")
    {
        console.log("here")
        res.redirect('/admin/index'); 
       
    }
    else{
        console.log("there")
        next();
       
    }
}