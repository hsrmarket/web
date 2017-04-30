
function isLoggedIn(req) {
    return !!req.session.username;
}

function handleAuthenticate(req, res, next){
    if(isLoggedIn(req)){
        res.redirect("/api/articles/index");
        /*
        next();
        */
    } else {
        res.render("login", { backref : req.originalUrl});
    }
}

function currentUser(req) {
    return req.session.name;
}

module.exports = {isLoggedIn : isLoggedIn, handleAuthenticate :handleAuthenticate , current : currentUser};