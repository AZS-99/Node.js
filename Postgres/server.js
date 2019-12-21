const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const database = require('./database')

const HTTP_PORT = process.env.PORT || 8080
const navbarItems = ["Home", "About"]

const app = express()
app.set("view engine", "hbs");
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.use(bodyParser.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.render('home', {
        title: "Home",
        navbarItems: navbarItems,
        navbarItemsRight: ["SignUp"]
    })
})


app.get('/home', (req, res) => {
    res.redirect('/')
})


app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: "Sign up!",
        navbarItems: navbarItems
    })
})


app.post('/signUp', async (req, res) => {
    await database.addUser(req.body)
    res.redirect('/users') 
})


app.get('/users', async (req, res) => {
    res.render('users', {
        navbarItems: navbarItems,
        title: "Users",
        users: await database.getAllUsers()
    })
})


app.get('/user/:email', async (req, res) => {
    const user = await database.getUser(req.params.email)
    res.send(user) 
})


app.post('/users', async (req, res) => {
    
    const users = req.body
    if (users.btn == "delete") {
        for (var userID in users){
            await database.deleteUser(users[userID])
        }
        res.redirect('/users')
    } else {
        res.send(users)
    }
    
})

database.initialise().then(
    app.listen(HTTP_PORT)
).catch(error => {
    console.log(error)
})

