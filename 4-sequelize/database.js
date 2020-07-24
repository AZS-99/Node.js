const Sequelise = require('sequelize')
const pg = require('pg')

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
    first_name: Sequelise.STRING,
    surname: Sequelise.STRING,
    email: Sequelise.STRING,
    password: Sequelise.STRING,
    gender: {
        type: Sequelise.ENUM, 
        values: ['male', 'female', 'other']
    }
})


module.exports.add_user = async (user) => {
    try {
        await users.create(user)
    } catch (error) {
        throw (error)
    }
}



