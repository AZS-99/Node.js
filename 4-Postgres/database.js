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
    firstName: {
        type: Sequelise.STRING,
        validate: {
            is: ["^[a-z]+$", "g"],
            len: [2, 20],
            notEmpty: true //Do not allow empty strings
        }  
    },
    surname: {
        type: Sequelise.STRING,
        validate: {
            is: ["^[a-z]+$", "g"],
            len: [2, 20],
            notEmpty: true
        }
    },
    email: {
        type: Sequelise.STRING,
        unique: true,
        validate: {
            isEmail: true,
            len: [7, 300]
        }
    },
    gender: {
        type: Sequelise.ENUM,
        values: ['male', 'female', 'other']
    },
    password: {
        type: Sequelise.STRING,
        notEmpty: true,
        len: [8, 50]
    },
    phoneNumber: {
        type: Sequelise.STRING,
        validate: {
            is: ["^$|^[0-9]{10,15}$", "g"] //literally a space between the comma and 15 gave me hell lol
        }
    }
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


module.exports.getUsers = async (query) => {
    try {
        return await users.findAll({
            where: query
        })
    } catch (error) {
        return ("Counld not get all users\n" + error)
    }
}


module.exports.deleteUser = async userProperty => {

    await users.destroy({
        where: userProperty
    })

}


module.exports.getUser = async query => {
    return await users.findOne({
        where: query
    })
}