const express = require('express')
const exphbs = require ('express-handlebars')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080
const app = express()


//saves you specifying the path and extenstion for any hbs file in 'veiws' directory when you render
app.set('view engine', 'hbs') 
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))


app.get('/', (req, res) => {
    res.render('home')       //uses default layout 'main', since layout attribute isn't explicitly specified.
})


app.get('/members', (req, res) => {
    //reserved-variable 'layout' is not set, so the default layout is main.hbs
    dataManagement.getMembers().then(membersArray => {
        res.render('members', {
            title: 'Members',
            members: membersArray
        })
    })
    
})


app.get('/member/:email', (req, res) => {
    dataManagement.getMemberByEmail(req.params.email).then(member => {
        res.render('member', {
            member: member
        })
    }).catch(error => {
        res.send(error)
    })
})


app.get('/word', (req, res) => {
    res.render('word', {
        English: 'aback',   //pass the value 'aback' to the 'English' template  
        Arabic: 'N/A',
        layout: 'simple'    //The layout of word.hbs is going to be simple.hbs
    })
})


app.listen(http_port);