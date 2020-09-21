const body_parser = require('body-parser')
const database = require('./database')
const express = require('express')
const exphbs = require('express-handlebars')
const express_session = require('express-session')
const fs = require('fs')
const https = require('https')
const path = require('path')
const pg = require('pg')


const app = express() 

//Define express-handlebars to express
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        json: (str) => {
            return JSON.parse(str)
        }
    }
}))
//In order to avoid specifying the extension '.hbs' every single time
app.set('view engine', 'hbs')
app.use(body_parser.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname, '/public')))


const pg_session = require('connect-pg-simple')(express_session);
const pg_pool = new pg.Pool({
    user: 'wkwcjdovgjzdts',
    password: '314b08287fcff10f91d54968648d50fb9f51cfb0d7eec70a2a0e2ec11ba722a5',
    host: 'ec2-52-200-48-116.compute-1.amazonaws.com',
    port: 5432,
    database: 'd6ekrv4s2uj6gh',
    ssl: true
});
app.use(express_session({
    store: new pg_session({
        pool : pg_pool,               
        tableName : 'session'   
    }),
    cookieName: 'session',
    secret: 'ourfatherwhoartinheaven,hallowedbethyname',
    duration: 1 * 60 * 1000,
    activeDuration: 2 * 60 * 1000, //Extend the 'duration' if the user is still interactive by this interval
    cookie: {
        maxAge: 20 * 60 * 1000,
        ephemeral: true,
        secure: false
    },
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    res.locals.session = req.session //Automatically pass 'session' to all all pathes (no need to include 'user_session: session' in every res.render)
    next()
})

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})


app.get('/sign_up', (req, res) => {
    res.render('sign_up')
})

app.post('/sign_up', async (req, res) => {
    try {
        await database.add_user(req.body)
        res.send("User added successful")
    } catch (error) {
        throw(error)
    }
})


app.post('/log_in', async (req, res) => {
    try {
        req.session.user = await database.get_user(req.body)
        res.redirect('/')
    } catch (error) {
        throw (error)
    }
})



app.get('/log_out', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})








;(async () => {
    try {
        await database.initalise()
        app.listen(8080)
    } catch(error) {
        console.log(error)
    }
}) ()