const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const database = require('./database')

const HTTP_PORT = process.env.PORT || 8080 
const navbarRightItems = ['Login', 'SignUp']
const app = express() 


app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))


app.get('/', (req, res) => {
    res.render('home', {
        navbarRightItems: navbarRightItems
    })
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    if (await database.verifyteUser(req.body)) 
        res.send("You are logged in!")
    else 
        res.send("The combination of email and password is not correct")
})


app.get('/users', async (req, res) => {
    const users = await database.getAllUsers()
    res.render('users', {
        users: users
    })
})


app.get('/signup', (req, res) => {
    res.render('signup')
})


app.post('/signup', async (req, res) => {
    await database.addUser(req.body)
    res.redirect('/users')
})


database.startDatabase().then(app.listen(HTTP_PORT))


