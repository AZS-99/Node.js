const body_parser = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const HTTP_HOST = 8080


const app = express() 

//Define express-handlebars to express
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
//In order to avoid specifying the extension '.hbs' every single time
app.set('view engine', 'hbs')
app.use(body_parser.urlencoded({extended: true}))
app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})


app.get('/sign_up', (req, res) => {
    res.render('sign_up')
})


app.post('/sign_up', (req, res) => {
    res.send(req.body)
})




app.listen(HTTP_HOST)