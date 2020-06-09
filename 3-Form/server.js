const body_parser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const HTTP_PORT = 8080

const app = express() 

app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use(body_parser.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.render('home', {
        title: 'home'
    })
})


app.post('/sign_up', (req, res) => {
    res.send(req.body)
})


app.listen(HTTP_PORT)