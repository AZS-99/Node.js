const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


const HTTP_PORT = process.env.PORT || 8080

const app = express() 
app.set(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))



app.get('/', (req, res) => {
    res.render('home', {
        title: "HOME"
    })
})


app.listen(HTTP_PORT)