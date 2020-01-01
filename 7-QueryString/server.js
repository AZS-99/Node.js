const express = require('express')
const exphbs = require('express-handlebars')
const database = require('./database')

const HTTP_PORT = process.env.PORT || 8080 

const app = express() 
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home',
        jumboBG: 'bg-danger'
    })
})


app.get('/allusers', async (req, res) => {
    
    res.render('users', {
        users: await database.getAllUsers()
    })
})


app.get('/users', async (req, res) => {
    res.render('users', {
        users: await database.getUsers(req.query)
    })
})


database.initialise().then(
app.listen(HTTP_PORT))