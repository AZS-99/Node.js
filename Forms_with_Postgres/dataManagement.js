const Sequelise = require('sequelize')

const database = new Sequelise('ddmt8sc48le9ap', 'oqtsaytnuluhpl', '4ef811885089d130408ba2ab1f7603ffb2e9b80f2303463ce634c70fd684ae6f', {
    host: 'ec2-54-225-129-101.compute-1.amazonaws.com',
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
    surname: Sequelise.STRING
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