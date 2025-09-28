const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET
function createTokenUser(user){ 
    const payload ={
        _id:user._id,
        email:user.email,
        profileImageURL:user.profileImageURL,
        roll:user.roll,   
    };
    const token= JWT.sign(payload,secret);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports={
    createTokenUser,
    validateToken
}