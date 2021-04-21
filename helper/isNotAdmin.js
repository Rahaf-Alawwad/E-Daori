module.exports = (req, res, next) => {
    if(req.user.id == "607fd96f0f16833b447cdb36")
    {
        res.redirect('/admin/index'); 
    }
    else{
        next();
    }
}