const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')

const HTTP_PORT = process.env.PORT || 8080
const app = express()

const navItems = ["Home", "About", "Members"]
let members = []


app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))


app.get('/', (req, res) => {
    res.render("Home", {
        title: "Home",
        navItems: navItems
    })
})

app.get('/Home', (req, res) => {
    res.redirect('/')
})

app.get('/member', (req, res) => {
    res.render("Member", {
        title: "Member Info",
        member: members[0]
    })
})

app.get('/SignUp', (req, res) => {
    res.render('SignUp', { //Notice, no slash before SignUp, this directs to SignUp.hbs
        title: "Sign Up"
    }) 
})

app.post('/SignUp', (req, res) => {
    members.push(req.body)
    res.redirect('/member')
})

app.listen(HTTP_PORT)