const Sequelise = require('sequelize')
const database = require('./database').database

const sessions = database.define(process.env.SESSIONS_TABLE, {
    sid: {
        type: Sequelise.STRING,
        allowNull: false,
        primaryKey: true
    },
    sess: {
        type: Sequelise.JSON,
        allowNull: false
    },
    expire: {
        type: 'TIMESTAMP(6)',
        allowNull: false
    }
}, {
    indexes: [
        {
            fields: ['expire'],
            name: 'IDX_session_expire'
        }
    ],
    timestamps: false
})


module.exports = sessions