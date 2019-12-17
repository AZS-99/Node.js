const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

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
        navbarItems: navbarItems
    })
})

app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: "Sign up!"
    })
})

app.post('/signUp', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.listen(HTTP_PORT)
