const globals = (req, res, next) => {
    res.locals.nav_left = {"Home": "/", "About": "/about"}
    res.locals.nav_right = {"Log in": "/log_in", "Sign up": "/sign_up"}
    next()
}

module.exports = globals