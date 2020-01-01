const express = require('express')
const exphbs = require ('express-handlebars')
const path = require('path')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080
const app = express()


//saves you specifying the path and extenstion for any hbs file in 'veiws' directory when you render
app.set('view engine', 'hbs') 
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')))
app.use('/jquery', express.static(path.join(__dirname, '/jquery/dist/jquery.js')))


app.get('/', (req, res) => {
    let navigationItems = ["Home", "About"]
    res.render('home', {
        navItems: navigationItems  //uses default layout 'main', since layout attribute isn't explicitly specified.
    })       
})

app.get('/Home', (req, res) => {
    res.redirect('/')
})


app.get('/members', (req, res) => {
    //reserved-variable 'layout' is not set, so the default layout is main.hbs
    dataManagement.getAllMembers().then(membersArray => {
        res.render('members', {
            title: 'Members',
            members: membersArrays
        })
    })
    
})


app.get('/member/:email', (req, res) => {
    dataManagement.getMemberByEmail(req.params.email).then(member => {
        res.render('member', {
            member: member,
            title: member.firstName + ' ' + member.surname
        })
    }).catch(error => {
        res.send(error)
    })
})


app.listen(http_port);