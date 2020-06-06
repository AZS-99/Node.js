const HTTP_PORT = process.env.PORT || 8080

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const alert = require('alert-node')
const clientSessions = require('client-sessions')
const database = require('./database')


const app = express() 
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(clientSessions({
    cookieName: "session",
    secret: "ourlordwhoartsinheavens,hallowedbethyname",
    duration: 5 * 60 * 1000,
    activeDuration: 60 * 1000,
    cookie: {
        maxAge: 10 * 60 * 1000,
        ephermal: true,
        secure: false
    }
}))

app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery')))
app.use('/bootstrap', express.static(path.join(__dirname,'/node_modules/bootstrap')))
app.use('/public', express.static(path.join(__dirname,'/public')))


const ensureLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else 
        next() 
}


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/login', (req, res) => {
    res.render('logIn')
})


app.post('/logIn', async (req, res) => {
    try {
        const success = await database.verifyUser(req.body)
        if (success){
            req.session.user = await database.getUser({"email": req.body.email})
            res.send('Welcome ' + req.session.user.firstName)
        }
        else 
            res.send("not successful")
    } catch (error) {
        res.alert(error)
    }
})


app.get('/signUp', (req, res) => {
    res.render('signUpForm')
})


app.post('/signUp', async (req, res) => {
    try{
        await database.addUser(req.body)
        res.send(await database.getUsers())
    }catch(error) {
        alert(error)
    }
    
})


app.get('/secret', ensureLogin, (req, res) => {
    res.send('Welcome ' + req.session.user.firstName)
})






database.initialise().then(app.listen(HTTP_PORT))
