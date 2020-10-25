const bcrypt = require('bcrypt')
const pg = require('pg')
const Sequelise = require('sequelize')
pg.defaults.ssl = true
// psql -h HOST -U USER -d DATABASE

const database = new Sequelise (process.env.DATABASE_URL)

const {RateLimiterPostgres} = require('rate-limiter-flexible');

module.exports = async (opts) => {
  return new Promise((resolve, reject) => {
    
    const ready = (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(rateLimiter)
      }
    }
    const rateLimiter = new RateLimiterPostgres({
        storeClient: database,
  }, ready);
   
  })
}


module.exports.initialise = async () => {
    try { await database.sync() } 
    catch (error) { throw error }
}


const users = database.define('USERS', {
    user_id: {
        type: Sequelise.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelise.STRING,
        validate: { is: ['^[a-z]{2,15}$', 'i'] }
    },
    surname: {
        type: Sequelise.STRING,
        validate: { is: ['^[a-z]{2,15}$', 'i'] }
    },
    email: {
        type: Sequelise.STRING,
        validate: { isEmail: true }
    },
    password: {
        type: Sequelise.STRING,
        validate: {
            is: ['^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-z0-9_]{8,30}$', 'i']
        }
    }
}, {
    hooks: {
        afterValidate: async (user, options) => {
            user.password = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS))
            
        }
    }
})


module.exports.add_user = async (user) => {
    try {
        await users.create(user)
    } catch (error) {
        throw error
    }
}