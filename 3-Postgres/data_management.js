const Sequelise = require('sequelize')
const database = new Sequelise('d7cgiig48727gm', 'jytkynsmmdequz', '7555b9f64c706ca65c08646f37ca50b1e8234f3df1d6003548db4f28256184b5', {
    host: 'ec2-50-19-114-27.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    dialectOptions: {
        ssl: true
    }
})

const Members = database.define('Members', {
    memberId: {
        type: Sequelise.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: Sequelise.STRING,
    lastName: Sequelise.STRING,
    email: {
        type: Sequelise.STRING,
        unique: true
    }
})


module.exports.initialise = () => {
    return new Promise((resolve, reject) => {
        database.sync().then(Members => {
            resolve("Members initiated successfully!")
        }).catch(error => {
            reject(error);
        })
    })
}


module.exports.getMembers = () => {
    return new Promise((resolve, reject) => {
        Members.findAll().then(resolve).catch(error => {
            reject(error)
        })
    })
}


module.exports.addMember = (member) => {
    return new Promise((resolve, reject) => {
        Members.create(member).then(resolve("Member added successfuly")).catch(error => {
            reject("Couldn't add member for the following reasong: " + error)
        })
    })
}