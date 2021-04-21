module.exports = (req, res, next) => {
    if(req.user.id == "60800d1e8196f760c061b28a")
    {
        res.redirect('/admin/index'); 
    }
    else{
        next();
    }
}