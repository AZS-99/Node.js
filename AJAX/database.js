const Sequelise = require('sequelize')

/*
const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
  });
*/
const database = new Sequelise('dcnk3v2fdd07gd', 'nybskplvcqiqag', '4fe04843206ba7b5c5a1bf70b2c96e4af2477f350a34cec775e21e00d695ec87', {
    host: 'ec2-174-129-33-132.compute-1.amazonaws.com',
    port: '5432',
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
    email: {
        type: Sequelise.STRING,
        unique: true
    },
    password: Sequelise.STRING
})


module.exports.initialise = async () => {
    try {
        await database.sync()
    } catch (error) {
        return error
    }
}


module.exports.addUser = async user => {
    try {
        await users.create(user)
    } catch (error) {
        return "Error in addUser"
    }
}


module.exports.count = async () => {
    try {
        const countAndRows = await users.findAndCountAll()
        return countAndRows.count
    } catch (error) {
        console.log(error)
    }
}


module.exports.getUsers = async (queryJSON) => {
    try {
        return await users.findAll({
            where: queryJSON
        })
    } catch(error) {
        alert(error)
    }
}


module.exports.deleteUser = async email => {

    await users.destroy({
        where: {
            email: email
        }
    })
}


module.exports.getUser = async userEmail => {
    return await users.findOne({
        where: {
            email: userEmail
        }
    })
}


