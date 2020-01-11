const alert = require('alert-node')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const database = require('./database')


const HTTP_PORT = process.env.PORT || 8080
const navbarItems = ["Home", "About"]

const app = express()
app.set("view engine", "hbs");
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap')))

app.get('/', (req, res) => {
    res.render('home', {
        title: "Home",
        navbarItems: navbarItems,
        navbarItemsRight: ["SignUp"]
    })
})


app.get('/home', (req, res) => {
    res.redirect('/')
})


app.get('/signUp', (req, res) => {
    res.render('signUp', {
        title: "Sign up!",
        navbarItems: navbarItems
    })
})


app.post('/signUp', async (req, res) => {
    try {
        await database.addUser(req.body)
        res.redirect('/users')
    } catch (error) {
        alert(error)
    }
})


app.get('/users', async (req, res) => {
    try {
        res.render('users', {
            navbarItems: navbarItems,
            title: "Users",
            users: await database.getUsers(req.query)
        })
    } catch (error) {
        alert(error)
    }
})


app.get('/user/:email', async (req, res) => {
    const user = await database.getUser({ email: req.params.email })
    res.send(user)
})


app.post('/users', async (req, res) => {

    const formJSON = req.body //{userID: email, ...,  btn: delete/view}
    if (formJSON.btn == "delete") {
        if (formJSON.emails.constructor === Array) { //Check if more than one email was checked by user
            for (let email in formJSON.emails) {
                try {
                    await database.deleteUser({ email: email })
                } catch (error) {
                    alert(error)
                }
            }
        } else {
            try {
                await database.deleteUser({email: formJSON.emails})
            }catch (error) {
                alert(error)
            }
        }

        res.redirect('/users')
    } else {
        res.send(users)
    }
})


database.initialise().then(
    app.listen(HTTP_PORT)
).catch(error => {
    alert(error)
})

