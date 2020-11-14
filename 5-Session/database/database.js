const bcrypt = require('bcrypt')
const Sequelise = require('sequelize')
const pg = require('pg')
pg.defaults.ssl = process.env.NODE_ENV === 'production'? { rejectUnauthorized: false } : true

const database = new Sequelise(process.env.DATABASE_URL)
module.exports.database = database




module.exports.initialise = async () => {
    try { await database.sync() }
    catch (error) { throw error }
}


const sessions = require('./sessions')
const users = require('./users')


module.exports.add_user = async (user) => {
    try { await users.create(user) }
    catch (error) { throw error }
}


module.exports.get_user = async (email, password) => {
    try {
        const user = await users.findOne({
            where: {
                email: email
            },
            raw: true
        })
        if (user) 
            return (await bcrypt.compare(password, user.password))? user : false
        else 
            return null
    } catch (error) { throw error }
}

