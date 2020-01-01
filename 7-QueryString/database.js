const Sequelise = require('sequelize')
const database = new Sequelise('df04kv59pvdeaa', 'smblapwqtuqhdd', '5f418c1ea9b0980185ed26d81fc4e1e685ca2c3452eedb75181e7e2e628afa91', {
    host: 'ec2-107-21-235-87.compute-1.amazonaws.com',
    port: 5432,
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


module.exports.initialise = async () => {
    try {
        await database.sync() 
    } catch(error) {
        console.log(error) 
    }
}


module.exports.getAllUsers = async () => {
    try {
        return await users.findAll()
    } catch (error) {
        return error
    }
}


module.exports.getUsers = async (queryString) => {
    try {
        return await users.findAll({
            where: queryString
        })
    } catch (error) {
        console.log(error) 
    }
}

