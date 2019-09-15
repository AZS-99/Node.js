const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser =  require('body-parser')

const http_port = process.env.PORT || 8080
const app = express()


app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
    res.render('home', {
        title: "Home"
    })
})


app.get("/signUp", (req, res) => {
    res.render('signUp', {
        title: "Sign Up"
    })
})


app.post("/signUp", (req, res) => {
    res.send(req.body)
})



app.listen(http_port)