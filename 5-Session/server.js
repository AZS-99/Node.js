"use strict";

require('dotenv').config()
const { urlencoded } = require('body-parser')
const database = require('./database/database')
const enforce_ssl = require('express-enforces-ssl')
const express = require('express')
const exphbs = require('express-handlebars')
const helmet = require('helmet')
const path = require('path')


const session = require('./middlewares/session')
const globals = require('./middlewares/globals')
const csurf = require('csurf')
const csurfProtection = csurf({cookie: false}) //has to come after session 
const rateLimiter = require('./middlewares/rateLimiter')

const app = express()

app.use('/public', express.static(path.join(__dirname, '/public')))

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        evaluate: (str) => {
            return str
        },
        ternary: (condition, var1, var2) => {
            return condition? var1 : var2
        }
    }
}))
app.set('view engine', 'hbs')


app.use(helmet())
app.use(urlencoded({extended: true}))
app.use(session)
app.use(globals)
app.use(rateLimiter)

if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy')
    app.use(enforce_ssl())
}



app.get('/', (req, res) => {
    res.render('home', {
        env: process.env
    })
})


app.get('/log_in', csurfProtection, (req, res) => {
    res.render('log_in', {
        csurf_token: req.csrfToken()
    })
})


app.get('/log_out',  (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


app.get('/sign_up', (req, res) => {
    res.render('sign_up')
})


app.post('/log_in', csurfProtection, async (req, res) => {
    try {
        const user = await database.get_user(req.body.email, req.body.password)
        if (user === false) 
            res.send('wrong password')
        else if (user === null) 
            res.send("email doesn't exist")
        else {
            delete user.password
            req.session.user = user
            res.redirect('/')
        }
    } catch (error) {
        res.send("couldn't work: " + error)
    }
    
})


app.post('/sign_up', async (req, res) => {
    try {
        await database.add_user(req.body)
        delete req.body.user
        req.session.user = req.body
        res.redirect('/')
    } catch (error) {
        res.send('Failed to sign up:\n' + error)
    }
    
})
 
 

;(async () => {
    await database.initialise()
    app.listen(process.env.PORT)
}) ()