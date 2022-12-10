JWT_SECRET='deepakkasignature';
var jwt = require('jsonwebtoken');

const fetchuser=(req,res,next)=>{
    //Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authentiate using valid token"});
    }  
    try{
        console.log(token);
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }catch(error){
        res.json(error);
    }
}
module.exports = fetchuser;