
function isLoggedIn(req) {
    return !!req.session.username;
}

function handleAuthenticate(req, res, next){
    if(isLoggedIn(req)){
        next();
    } else {
        res.render("login");
    }
}

function currentUser(req) {
    return req.session.name;
}

module.exports = {isLoggedIn : isLoggedIn, handleAuthenticate :handleAuthenticate , current : currentUser};