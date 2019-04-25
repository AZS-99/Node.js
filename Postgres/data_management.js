const Sequelise = require('sequelize')
const database = new Sequelise('d9d0sduvc2c4pe', 'vdfqdgxwxxpung', '63dd527db9686236c9a196f766db5e586b3b344c4d4be913dc169ab3f6316ee7', {
    host: 'ec2-23-21-106-241.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

const Members = database.define('Members', {
    memberId: {
        type: Sequelise.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: Sequelise.STRING,
    lastName: Sequelise.STRING,
    email: Sequelise.STRING
})


module.exports.initialise = () => {
    return new Promise((resolve, reject) => {
        database.sync().then(Members => {
            resolve("Members initiated successfully!")
        }).catch(error => {
            reject(error);
        })
    })
}


module.exports.getMembers = () => {
    return new Promise((resolve, reject) => {
        Members.findAll().then(resolve).catch(error => {
            reject(error)
        })
    })
}


module.exports.addMember = (member) => {
    return new Promise((resolve, reject) => {
        Members.create(member).then(resolve("Member added successfuly")).catch(error => {
            reject("Couldn't add member for the following reasong: " + error)
        })
    })
}