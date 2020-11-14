const express_session = require('express-session')
const { Pool } = require('pg')
const Session_store = require('connect-pg-simple')(express_session)

const client = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'? { rejectUnauthorized: false } : true
});

const session = (express_session({
    store: new Session_store({
        pool: client,
        tableName: process.env.SESSIONS_TABLE
    }),
    duration: 1 * 60,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

module.exports = session