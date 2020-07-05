const express = require('express')           //require is the equivalent of 'include' in C++

const http_port = 8080
const app = express();                       //app is an instance of class express

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(http_port);