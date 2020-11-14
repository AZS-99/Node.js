const Sequelise = require('sequelize')
const database = require('./database').database

const users = database.define('USERs', {
    first_name: {
        type: Sequelise.STRING,
        validate: {
            is: {
                args: ['^[a-z]{2,20}', 'i'],
                msg: ['Database rejected first name']
            }
        }
    },
    surname: {
        type: Sequelise.STRING,
        validate: {
            is: {
                args: ['^[a-z]{2,20}$', 'i'],
                msg: ['Database rejected surname']
            }
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
        validate: {
            is: {
                args: ['^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9_]{8,30}$'],
                msg: ['Database rejected password']
            }
        }
    }
}, {
    hooks: {
        afterValidate: async (user, options) => {
            user.password = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS))
        }
    }
})


module.exports = users
