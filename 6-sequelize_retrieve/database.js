const bcrypt = require('bcrypt')
const Sequelise = require('sequelize')
const pg = require('pg')



const salt_rounds = 15

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


const users = database.define('users', {
    user_id: {
        type: Sequelise.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelise.STRING,
        validate: {
            is: ['^[a-z]{2,20}', 'i']
        }
    },
    surname: {
        type: Sequelise.STRING,
        is: ['^[a-z]{2,10}', 'i']
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
                args: ['^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_@$]{8,20}$'],
                msg: ["Password must contain 1 uppercase, 1 lowercase, and 1 digit"]
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


module.exports.get_user = async (credentials) => {
    try {
        let user = await users.findOne({
            where: {
                email: credentials.email
            }
        })
        const password_correct = await bcrypt.compare(credentials.password, user.password)
        delete user.dataValues.password //Postgres returns an 'enriched' object
        return password_correct? user : null
    } catch (error) {
        throw (error)
    }
}



