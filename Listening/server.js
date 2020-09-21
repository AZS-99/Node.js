require('dotenv').config()              //require is the equivalent of #include in C++
const express = require('express')

const HTTP_PORT = process.env.HTTP_PORT

const app = express()                   //app is an instance of class 'express'

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(HTTP_PORT)