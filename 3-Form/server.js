require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const HTTP_PORT = process.env.PORT
const app = express() 
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use((req, res, next) => {
    res.locals.nav_left = {"Home": "/home", "About": "/about"}
    res.locals.nav_right = {"Log in": "/log_in", "Sign up": "/sign_up"}
    next()
})

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/sign_up', (req, res) => {
    res.render('sign_up')
})


app.listen(HTTP_PORT)
