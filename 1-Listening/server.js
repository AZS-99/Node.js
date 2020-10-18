require('dotenv').config()              //require is the equivalent of #include in C++
const express = require('express')

const app = express()                   //app is an instance of class 'express'

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.HTTP_PORT)