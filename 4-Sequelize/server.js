require ('dotenv').config()
const { urlencoded } = require('body-parser')
const database = require('./database')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


const HTTP_PORT = process.env.HTTP_PORT

const app = express()

//Define exphbs to express
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        json: (str) => {
            return JSON.parse(str)
        },
        evaluate: (str) => {
            return str
        }
    }
}))
//To avoid having to use extension name in render
app.set('view engine', 'hbs')
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(urlencoded({extended: true}))
app.use((req, res, next) => {
    res.locals.left_nav = {"Home": "/", "About": "/about"}
    res.locals.right_nav = {"Log in": "log_in", "Sign up": "sign_up"}
    res.locals.tmp = "log_in"
    next()
})


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})


app.post('/sign_up', async (req, res) => {
    await database.add_user(req.body)
    res.send('success')
})


;(async () => {
    await database.initialise()
    app.listen(HTTP_PORT)
}) ()


