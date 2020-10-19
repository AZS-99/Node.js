require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use((req, res, next) => {
    res.locals.nav_left = {"Home": "/", "About": "/about"}
    res.locals.nav_right = {"Log in": "log_in", "Sign up": "sign_up"}
    next()
})

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(process.env.PORT)