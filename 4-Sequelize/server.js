require ('dotenv').config()
const { urlencoded } = require('body-parser')
const database = require('./database')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const rateLimiter = require('./middlewares/rateLimiter')
const globals = require('./middlewares/globals')


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
app.use(globals, rateLimiter) 


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
    app.listen(process.env.PORT)
}) ()


