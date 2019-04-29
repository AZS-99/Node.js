const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080

const app = express()
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        layout: 'tronAndNav'
    })
})


app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: 'Sign Up!',
        layout: 'tronAndNav'
    })
})


app.get('/signIn', (req, res) => {
    res.render('signIn', {
        title: 'Sign In'
    })
})


app.post('/signUp', (req, res) => {
    dataManagement.addUser(req.body).then(() => {
        dataManagement.getUsers().then(users => {
            res.send(users)
        }).catch(error => {
            res.send(error)
        })
    }).catch(error => {
        res.send(error)
    })
})


app.post('/signIn', (req, res) => {
    dataManagement.verifyUser(req.body).then(isValid => {
        res.send(isValid)
    }).catch(error => {
        res.send('app.post fn failure: ' + error)
    })
})


dataManagement.initialise().then(app.listen(http_port)).catch(console.log)
