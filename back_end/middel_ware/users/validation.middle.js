const jwt = require('jsonwebtoken');
const{JWT_SECRET} = require('../../config/secrets')

const validationToken = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token,JWT_SECRET)
        req.user = user;
        next();

    }catch(err){
        console.log('Failed To Validate Token')
        res.status(400).json({ msg: "Invalid User Token" });
        console.log(err);
    }
   
}

module.exports = {validationToken}