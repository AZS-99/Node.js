let members = [
    {
        firstName: 'Adam', 
        lastName: 'Saher',
        email: 'adam.saher@icloud.com'
    },
    {
        firstName: 'Lui', 
        lastName: 'Saher',
        email: 'lui@icloud.com'
    },
    {
        firstName: 'Gomana', 
        lastName: 'Rhaegar',
        email: 'g@icloud.com'
    }
]



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
    members.forEach(member => {
        data.addMember(member).then(console.log).catch(console.log)
    })
    data.getMembers().then(members => {
        res.send(members)
    })
}) 


data.initialise().then(
    app.listen(httpPort)
).catch(console.log)

