require('dotenv').config()
const express = require("express")
const exphbs = require("express-handlebars")
const path = require("path")
const HTTP_PORT = process.env.HTTP_PORT

const app = express() 

//Define the express-handlebars to express
app.engine("hbs", exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    helpers: {
        json: (str) => {
            return JSON.parse(str)
        }
    }
}))
//In order to avoid using the extension '.hbs' with every single file 
app.set("view engine", "hbs")

app.use('/public', express.static(path.join(__dirname, '/public')))


app.get("/", (req, res) => {
    res.render("home", {
        title: "home", 
        jumbo_headline: "EFAS",
        jumbotron_bg: "bg-green",
    })
})

app.listen(HTTP_PORT)