const express = require('express')
const pg = require('pg')
const exphbs = require('express-handlebars')
const data = require('./data_management')

const httpPort = process.env.PORT || 8080
const app = express()
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main'
}))

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    member = {
        firstName: 'Adam', 
        lastName: 'Saher',
        email: 'adam.saher@icloud.com'
    }
    data.addMember(member).then(msg => {
        console.log(msg)
        data.getMembers().then(members => {
            res.send(members)
        })
    }).catch(console.log)
    
}) 


data.initialise().then(
    app.listen(httpPort)
).catch(console.log)

