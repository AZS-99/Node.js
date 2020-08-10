const body_parser = require('body-parser')
const database = require('./database')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


const app = express() 

//Define express-handlebars to express
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        array: function(str) {
            return str.split(', ')
        },
        json: function(str) {
            return JSON.parse(str)
        }
    }
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


app.post('/sign_up', async (req, res) => {
    try {
        console.log(req.body)
        await database.add_user(req.body)
        res.send("User added successfully")
    } catch (error) {
        throw(error)
    }
})




;(async () => {
    try {
        await database.initalise()
        app.listen(8080)
    } catch(error) {
        console.log(error)
    }
}) ()