const bcrypt = require('bcrypt')
const Sequelise = require('sequelize')
const pg = require('pg')

const salt_rounds = 13

const database = new Sequelise('d6ekrv4s2uj6gh', 'wkwcjdovgjzdts', '314b08287fcff10f91d54968648d50fb9f51cfb0d7eec70a2a0e2ec11ba722a5', {
    host: 'ec2-52-200-48-116.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    define: {
        freezeTableName: true
    }
})


module.exports.initalise = async () => {
    try {
        await database.sync()
    } catch(error) {
        console.log(error)
    }
}


const users = database.define('Users', {
    user_id: {
        type: Sequelise.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelise.STRING,
        validate: {
            is: {
                args: ['^[a-z]{2,30}$', 'i'],
                msg: ['Only English alphabet is allowed']
            }
        }
    },
    surname: {
        type: Sequelise.STRING,
        validate: {
            is: {
                args: ['^[a-z]{2,30}$', 'i'],
                msg: ['Only English alphabet is allowed']
            }
        }
    },
    email: {
        type: Sequelise.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelise.STRING,
        validate: {
            is: {
                args: ['^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_]{0,30}$'],
                msg: ['Only alphanumerics']
            }
        }
    },
    gender: {
        type: Sequelise.ENUM, 
        values: ['male', 'female', 'other']
    }
}, {
    hooks: {
        afterValidate: async (user, options) => {
            if (user && user.password) {
                user.password = await bcrypt.hash(user.password, salt_rounds)
            }
        }
    }
})


module.exports.add_user = async (user) => {
    try {
        await users.create(user)
    } catch (error) {
        throw (error)
    }
}



