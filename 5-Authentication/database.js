const Sequelise = require('sequelize')
const bcrypt = require('bcrypt')

const saltRounds = 10
const database = new Sequelise('df04kv59pvdeaa', 'smblapwqtuqhdd', '5f418c1ea9b0980185ed26d81fc4e1e685ca2c3452eedb75181e7e2e628afa91', {
    host: 'ec2-107-21-235-87.compute-1.amazonaws.com',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})


const users = database.define('USERS', {
    userID: {
        type: Sequelise.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: Sequelise.STRING,
    surname: Sequelise.STRING,
    isPremium: {
        type: Sequelise.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: Sequelise.STRING,
        unique: true
    },
    password: Sequelise.STRING,
    isAdmin: {
        type: Sequelise.BOOLEAN,
        defaultValue: false
    }
})


module.exports.startDatabase = async () => {
    try {
        await database.sync()
    } catch(error) {
        return error
    }
}


module.exports.addUser = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, saltRounds)
        console.log(user.password)
        await users.create(user)
    } catch (error) {
        console.log("COULD NOT ADD USER: \n" + error)
    }
}


module.exports.getAllUsers = async () => {
    try {
        return await users.findAll()
    } catch (error) { 
        console.log("COULD NOT FETCH DATA FOR ALL USERS: \n" + error)
    }
}


module.exports.verifyteUser = async (credentials) => {
    try {
        const user = await users.findOne({
            where: {
                email: credentials.email
            }
        })
        return await bcrypt.compare(credentials.password, user.password) //First arg: text, second arg: hash
    } catch (error) {
        console.log("COULD NOT VERIFY USER \n" + error)
    }
    
}