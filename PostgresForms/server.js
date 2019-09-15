const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const dataManagement = require('./dataManagement')

const http_port = process.env.PORT || 8080

const app = express()
app.set('view engine', 'hbs')

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) //check pics in public 

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
        title: 'Home'
    })
})


app.get('/signUp', (req, res) => {
    res.render('signUp')
})

app.post('/signUp', upload.single('profilePic'), (req, res) => {
    let member = req.body
    member.profilePic = req.file.path
    dataManagement.addMember(member).then(() => {
        res.redirect('/members')
    }).catch(error => {
        res.send("Could not post successfully: " + error)
    })
})

app.get('/members', (req, res) => {
    // const imagesPath = path.join(__dirname, "public/images/uploads")
    // fs.readdir(imagesPath, (error, imgs) => {
    //     if (error)
    //         res.send(error)
    //     else {
            
    //         res.render('images', {
    //             imgs: imgs
    //         })
    //     }
    // })
    let imagePath;
    dataManagement.getMembers().then(members => {
        res.render('members', {
            title: 'All Members',
            members: members
        })
    }).catch(error => {
        res.send("Couldn't get members for the following reason: " + error)
    })
})

dataManagement.initialise().then(() => {
    app.listen(http_port)
}).catch(console.log)
