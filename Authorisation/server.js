const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const clientSessions = require('client-sessions')
const database = require('./database')

const HTTP_PORT = process.env.PORT || 8080 
let navbarRightItems = ['Login', 'SignUp']
const app = express() 


app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(clientSessions({
    cookieName: "session", //Adds the attribute session to req
    secret: "unguessablePassword",
    duration: 60 * 1000,
    activeDuration: 60 * 1000,
    cookie: {
        maxAge: 60 * 1000, 
        ephermal: true, //cookie expires when browser is closed
        secure: false
    }
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
    const user = req.body
    if (await database.verifyteUser(user)) {
        try {
            req.session.user = await database.getUser(user.email)
            navbarRightItems = ['LogOut']
            res.redirect('/')
        } catch (error) {
            console.log(error) 
        }
        
    }
        
    else 
        res.send("The combination of email and password is not correct")
})


app.get('/logout', (req, res) => {
    req.session.reset()
    navbarRightItems = ['Login', 'SignUp']
    res.redirect('/')
})


app.get('/users', ensureLogin, async (req, res) => {
    const users = await database.getAllUsers()
    res.render('users', {
        title: req.session.user.firstName,
        users: users,
        navbarRightItems: [req.session.user.firstName]
    })
})


app.get('/signup', (req, res) => {
    res.render('signup')
})


app.post('/signup', async (req, res) => {
    await database.addUser(req.body)
    res.redirect('/users')
})


function ensureLogin(req, res, next) {
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }


database.startDatabase().then(app.listen(HTTP_PORT))


