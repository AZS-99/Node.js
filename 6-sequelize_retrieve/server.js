const body_parser = require('body-parser')
const database = require('./database')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')


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

app.post('/log_in', async (req, res) => {
    try {
        res.send(await database.get_user(req.body))
    } catch (error) {
        throw (error)
    }
})


app.post('/sign_up', async (req, res) => {
    try {
        await database.add_user(req.body)
        res.send("User added successful")
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