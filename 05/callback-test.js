const DB = [];

function Register(user){

    return saveDB(user, (user) => {
        return sendEmail(user, (user)=>{
            return getResult(user);
        })
    })
}


const saveDB = (user, callback) => {
    DB.push(user);
    console.log(`save ${user.name} to DB.`);
    return callback(user);
}

const sendEmail = (user, callback) => {
    console.log(`email to ${user.name}`);
    return callback(user);
}



const getResult = (user) => {

    return `success register ${user.name}`;
}

const result = Register({ email: "andy@test.com", password: "1234", name: "andy"});
console.log(result);