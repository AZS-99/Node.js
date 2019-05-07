let members = [
    {   
        memberId: 1,
        firstName: 'Adam',
        surname: 'Saher',
        email: 'adam@gmail.com',
        isManager: true
    },
    {
        memberId: 2,
        firstName: 'Lui',
        surname: 'Fares',
        email: 'lui@gmail.com',
        isManager: false
    },
    {
        memberId: 3,
        firstName: 'Sue',
        surname: 'Abd',
        email: 'sue@gmail.com',
        isManager: false
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


module.exports.getMemberByEmail = (email) => {
    return new Promise((resolve, reject) => {
        members.forEach(member => {
            if (member.email == email)
                resolve(member)
        })
        reject("getMemberByEmail fn: Member not found")
    })
}