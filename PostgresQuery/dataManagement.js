const Sequelise = require('sequelize')

const database = new Sequelise('dckvpt2438b1cv', 'txsbechvhwezrl', 'df2c5eb40df16b1a763cec7df1ef0a43defccc399698376dcee8fe534f837220', {
    host: 'ec2-54-225-116-36.compute-1.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

const Members = database.define('Members', {
    memberId: {
        type: Sequelise.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelise.STRING,
        unique: true
    },
    firstName: Sequelise.STRING,
    surname: Sequelise.STRING,
    password: Sequelise.STRING
})


module.exports.initialise = () => {
    return new Promise((resolve, reject) => {
        database.sync().then(resolve).catch(error => {
            reject("Initalise fn failure: " + error)
        })
    })
}


module.exports.addMember = (member) => {
    return new Promise ((resolve, reject) => {
        Members.create(member).then(resolve).catch(error => {
            reject("addMember fn failure: " + error)
        })
    })
}


module.exports.getMembers = () => {
    return new Promise((resolve, reject) => {
        Members.findAll().then(resolve).catch(error => {
            reject('getMembers fn failure: ' + error)
        })
    })
}


module.exports.getMemberByEmail = (email) => {
    return new Promise((resolve, reject) => {
        Members.findAll({
            where: {
                email: email
            }
        }).then(resolve).catch(error => {
            reject('getMemberByEmail fn failure: ' + error)
        })
    })
}


module.exports.deleteMember = (email) => {
    return new Promise((resolve, reject) => {
        Members.destroy({
            where: {
                email: email
            }
        }).then(resolve).catch(error => {
            reject('deleteMember fn failure: ' + error)
        })
    })
    
}




