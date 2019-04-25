const express = require('express')

const http_port = process.env.PORT || 8080
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.listen(http_port);