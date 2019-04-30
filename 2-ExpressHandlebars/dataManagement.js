let members = [
    {   
        memberId: 1,
        firstName: 'Adam',
        surname: 'Saher',
        email: 'adam@gmail.com'
    },
    {
        memberId: 2,
        firstName: 'Lui',
        surname: 'Fares',
        email: 'lui@gmail.com'
    },
    {
        memberId: 3,
        firstName: 'Sue',
        surname: 'Abd',
        email: 'sue@gmail.com'
    }
]


module.exports.getMembers = () => {
    return new Promise((resolve, reject) => {
        if (members)
            resolve(members)
        else
            reject("getMembers fn failure")
    })
}