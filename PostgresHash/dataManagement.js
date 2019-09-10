const Sequelise = require('sequelize')
const bcrypt = require('bcrypt')

const saltRounds = 14

const database = new Sequelise('d9pv56gqgfus8k', 'mraidxxitneysw', '672873196b044cc192ec4e01e98f17046e3660f59c082973c4973996b1492074', {
    host: 'ec2-23-21-129-125.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres', 
    dialectOptions: {
        ssl: true
    }
})


const Users2 = database.define('Users2', {
    userId: {
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
    password: Sequelise.STRING
})


module.exports.initialise = () => {
    return new Promise((resolve, reject) => {
        database.sync().catch(error => {
            reject('initialise fn failure: ' + error)
        })
    })
}


module.exports.addUser = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, saltRounds).then(hash => {
            user.password = hash
            Users2.create(user).then(resolve).catch(error => {
                reject('Inserting a user in addUser fn failure: ' + error)
            })
        }).catch(error => {
            reject('bcrypt in addUser fn failure: ' + error)
        })
    })
}


module.exports.verifyUser = (userEmailAndPassword) => {
    return new Promise((resolve, reject) => {
        Users2.findAll({
            where: {
                email: userEmailAndPassword.email
            }
        }).then(matchingUsers => {
            //plain text, then hash
            bcrypt.compare(userEmailAndPassword.password, matchingUsers[0].password).then(resolve).catch(error => {
                reject('bcrypt in verifyUser failure: ' + error)
            })
        }).catch(error => {
            reject('Users.find() in verifyUser fn failure: ' + error)
        })
    })
}


module.exports.getUsers = () => {
    return new Promise((resolve, reject) => {
        Users2.findAll().then(resolve).catch(error => {
            reject('getUsers fn failure: ' + error)
        })
    })
}