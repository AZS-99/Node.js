require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')

const HTTP_PORT = process.env.HTTP_PORT

const app = express() 

app.get('/', (req, res) => {
    res.send('Success')
})

app.listen(HTTP_PORT)