const globals = (req, res, next) => {
    res.locals.left_nav = {"Home": "/", "About": "/about"}
    res.locals.right_nav = {"Log in": "/log_in", "Sign up": "/sign_up"}
    res.locals.tmp = "log_in"
    next()
}

module.exports = globals