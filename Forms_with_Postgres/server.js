const Express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080

const app = Express()
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({extended: true}))
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))


app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    })
})


app.get('/signUp', (req, res) => {
    res.render('signUp')
})

app.post('/signUp', (req, res) => {
    dataManagement.addMember(req.body).then(() => {
        res.redirect('/members')
    }).catch(error => {
        res.send("Could not post successfully: " + error)
    })
})

app.get('/members', (req, res) => {
    dataManagement.getMembers().then(members => {
        res.send(members)
    }).catch(error => {
        res.send("Couldn't get members for the following reason: " + error)
    })
})

dataManagement.initialise().then(() => {
    app.listen(http_port)
}).catch(console.log)
