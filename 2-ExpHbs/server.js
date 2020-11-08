require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const globals = require('./middleware/globals')
const helmet = require('helmet')
const path = require('path')

const app = express()
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

app.use('/public', express.static(path.join(__dirname, '/public')))
app.use(globals)
app.use(helmet())

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(process.env.PORT)