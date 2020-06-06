const Sequelise = require('sequelize')

/*
const database = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect:  one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
  });
*/
const Sequelise = require('sequelize') //install pg
const bcrypt = require('bcryptjs')

const saltRounds = 15

const database = new Sequelise('d14ncg8ancm2k1', 'u22fkhtkaiee5s', 'p3430522c48e82fa989dc8c77408b235f0c1fd532a5952fa077c252735270c809', {
    host: 'ec2-52-23-79-163.compute-1.amazonaws.com',
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
    firstName: {
        type: Sequelise.STRING,
        validate: {
            is: ['^[a-z]{2,25}$', 'i']
        }
    },
    surname: {
        type: Sequelise.STRING,
        validate: {
            is: ['^[a-z]{2,30}$', 'i']
        }
    },
    email: {
        type: Sequelise.STRING,
        unique: true,
        validate: {
            isEmail: true,
            len: [8, 200]
        }
    },
    password: {
        type: Sequelise.STRING
    },
    phoneNumber: {
        type: Sequelise.STRING,
        validate: {
            is: ['^$|^[0-9]{10,15}$']
        }
    },
    gender: {
        type: Sequelise.ENUM,
        values: ['male', 'female', 'human']
    }
})


module.exports.initalise = async () => {
    await database.sync()
}


module.exports.addUser = async (user) => {
    user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1,).toLowerCase()
    user.surname = user.surname[0].toUpperCase() + user.surname.slice(1,).toLowerCase()
    user.password = await bcrypt.hash(user.password, saltRounds)
    await users.create(user)
}


module.exports.getUser = async (query) => {
    return await users.findOne({
        where: query
    })
}


module.exports.getUsers = async (query) => {
    return await users.findAll({
        where: query
    })
}


module.exports.validateUser = async (credentials) => {
    const user = await users.findOne({
        where: {
            email: credentials.email
        }
    })
    const validated = await bcrypt.compare(credentials.password, user.password)
    return validated? user : null
}