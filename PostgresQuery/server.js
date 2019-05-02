const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080
const app = express()
app.set('view engine', 'hbs')
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/', (req, res) => {
    res.render('home', {
        title: "Home"
    })
})


app.get('/members', (req, res) => {
    dataManagement.getMembers().then(members => {
        res.render('members', {
            title: 'Members',
            members: members     
        })
    }).catch(error => {
        res.send(error)
    })
})


app.get('/member/:member_email', (req, res) => {
    dataManagement.getMemberByEmail(req.params.member_email).then(members => {
        res.send(members)
    }).catch(error => {
        res.send(error)
    })
})


app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: 'Sign Up!'
    })
})


app.get('/member/delete/:member_email', (req, res) => {
    dataManagement.deleteMember(req.params.member_email).then(res.redirect('/members')).catch(error => {
        res.send(error)
    })
})


app.post('/signUp', (req, res) => {
    dataManagement.addMember(req.body).then(res.redirect('/members')).catch(res.send)
})


dataManagement.initialise().then(app.listen(http_port)).catch(console.log)
