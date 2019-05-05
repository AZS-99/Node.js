const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
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

app.use(express.static('public'))
const upload = multer({storage: 
    multer.diskStorage({
        destination: './public/images/uploads',
        filename: (req, file, callback) => {
            callback(null, file.originalname)
        }
    })
})


app.get('/', (req, res) => {
    res.render('home', {
        title: "Home"
    })
})


app.get('/members', upload.single('profilePic'), (req, res) => {
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
        //delete public from path (gave me hell to figure out; 2 days)
        const imagePath = members[0].profilePic.replace(/^public/, '') 
        console.log(imagePath)
        res.render('member', {
            member: members[0],
            image: imagePath
        })
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


app.post('/signUp', upload.single('profilePic'), (req, res) => {
    let member = req.body
    member.profilePic = req.file.path
    dataManagement.addMember(member).then(res.redirect('/members')).catch(res.send)
})


dataManagement.initialise().then(app.listen(http_port)).catch(console.log)
