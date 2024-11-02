const jwt = require('jsonwebtoken');
const userService  = require('./component/user/userService');

var action = {

    isLoggedIn : async function(req, res, next){
        try{
            //console.log("is logged in checking...");
            let token = req.headers.authorization;
            //console.log(req.headers);
            if(!token){
                return res.status(400).json({error:'user must be logged in'});
            }
            else{
                //console.log(token);
                let userData = await jwt.verify(token, settings.tokenSettings.secretKey);
                //console.log(userData);
               //check valid user 
               if(userData)
               userService.getByUserId(userData.userId, function(dbResult){
                   if(dbResult && dbResult.status)                   { 
                        req.loggedUser = dbResult.data;
                        if(dbResult.data)
                        next();
                   }
                   else{
                    return res.status(400).json({error:'user must be logged in'});
                   }
               });
               
            }
        }
        catch(err){
            next(err);
        }
    }
};


module.exports = {
    isLoggedIn : action.isLoggedIn
};