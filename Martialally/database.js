const Sequelise = require('sequelize') //install pg
const bcrypt = require('bcrypt')
const alert = require('alert-node')

const saltRounds = 15

const database = new Sequelise('df4mp28bp6gcmc', 'u9kmgsdacophvh', 'p5762fa3b3c4b8da14e01b083953d6aabbc559831d052dc26b2611fc7b72ee5db', {
    host: 'ec2-34-201-188-242.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


const users = database.define('USERS', {
    userID: {
        type: Sequelise.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: Sequelise.STRING,
        validate: {
            is: ['^[a-z]{2,25}', 'i'],
            notEmpty: true
        }
    },
    surname: {
        type: Sequelise.STRING,
        validate: {
            is: ['^[a-z]{2,25}', 'i'],
            notEmpty: true
        }
    },
    email: {
        type: Sequelise.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelise.STRING,
        len: [2, 100]
    }
})


module.exports.initialise = async () => {
    try {
        await database.sync()
    } catch (error) {
        alert(error)
    }
}


module.exports.getUsers = async () => {
    try {
        return await users.findAll() 
    } catch (error) {
        alert(error) 
    }
}


module.exports.getUser = async (query) => {
    try {
        return await users.findOne({
            where: query
        })
    } catch (error) {
        return error 
    }
} 


module.exports.addUser = async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, saltRounds)
        await users.create(user) 
    } catch (error) {
        alert(error)
    }
}


module.exports.verifyUser = async (credentials) => {
    try {
        const user = await users.findOne({
            where: {
                email: credentials.email
            }
        })
        return bcrypt.compare(credentials.password, user.password)
    } catch (error) {
        alert(error)
    }
}

