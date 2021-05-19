const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')

const { User } = require('../models/user.model');
const userDto = require('../dto/user.dto')
const {JWT_SECRET} = require('../config/secrets')

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email})

    if(!user) {
        return res.status(404).json({msg:'user not found'})
    }

    const validPassword = bcrypt.compareSync(password,user.password)

    if(!validPassword){
        return res.status(400).json('msg:incorrect email or password')
    }

    const userData = userDto(user)
    const token = jwt.sign(userData,JWT_SECRET)

    res.json({user:userData,token})
})

router.post ('/signup', async(req,res)=>{
    const {fullName,email,userName,password,repetedPassword,role} = req.body;
    const user = new User({fullName,userName,email,role,password,repetedPassword})

    
    if(user.password!=user.repetedPassword){
        return res.status(404).json({msg: 'this is an different password , please enter tha same password'})
    }
    

    hashPassword = bcrypt.hashSync(password,10)
    user.password = hashPassword

    hashRepetedPassword = bcrypt.hashSync(repetedPassword,10)
    user.repetedPassword = hashRepetedPassword

   

    await user.save()

    res.json({
        msg:'successfuly signup',
        user:userDto(user)
    })
})
module.exports = router;