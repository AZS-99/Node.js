const Sequelise = require('sequelize')

const database = new Sequelise('d77ot1939uhru0', 'ekxuoxpxqmzqjl', 'bc084b78efa3c3dc041317f29c6ec9b51259d6b6cdec1e6168a14b1b072da555', {
    host: 'ec2-54-225-116-36.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres', 
    dialectOptions: {
        ssl: true
    }
})


const Members = database.define('Members', {
    memberId: {
        type: Sequelise.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelise.STRING,
        unique: true
    },
    firstName: Sequelise.STRING,
    surname: Sequelise.STRING,
    password: Sequelise.STRING,
    profilePic: Sequelise.STRING
})


module.exports.initialise = () => {
    return new Promise((resolve, reject) => {
        database.sync().then(() => {
            resolve("initialise fn success! database initialise successfully")
        }).catch((error) => {
            reject("initialise fn failure! " + error)
        })
    })
    
}


module.exports.addMember = (member) => {
    return new Promise ((resolve, reject) => {
        Members.create(member).then(resolve).catch(error => {
            reject("Couldn't add member for the following error: " + error)
        });
    })
}


module.exports.getMembers = () => {
    return new Promise ((resolve, reject) => {
        Members.findAll().then(resolve).catch(() => { //resolve takes the only passed argument, members
            reject("Couldn't find members") 
        })
    })
}