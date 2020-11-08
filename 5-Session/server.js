require('dotenv').config()
const { urlencoded } = require('body-parser')
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const globals = require('./middlewares/globals')



const app = express()


app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(urlencoded({extended: true}))
app.use(globals) 



app.get('/', (req, res) => {
    res.render('home')
})


app.get('/log_in', (req, res) => {
    res.render('log_in')
})

app.listen(process.env.PORT)
