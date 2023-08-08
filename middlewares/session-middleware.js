function isAuth(req, res, next) {
    if (req.session.isAuth) {
        res.locals.isAuth = true
        next();
    }

    next();
}

module.exports = isAuth;