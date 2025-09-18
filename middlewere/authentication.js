//  user exist or not in  database to check
const {validateToken}=require ("../services/authentication")
function checkforauthenticationCookies(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName]; // FIXED
       
        if (!tokenCookieValue) {
          return next(); // token is not found then move to login page
          
        }
        try {
            const userPayload = validateToken(tokenCookieValue); // validate token using secret key 
            req.user = userPayload;
        } catch (error) {
          console.log(error)
        }
        return next();
    };
}


module.exports={
    checkforauthenticationCookies,
}