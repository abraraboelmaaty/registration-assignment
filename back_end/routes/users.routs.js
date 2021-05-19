const router = require('express').Router();
const {User} = require('../models/user.model')
const userDto = require('../dto/user.dto')

const {validationToken} = require('../middel_ware/users/validation.middle')
const {isAdminMiddleWare} = require('../middel_ware/users/isAdmin.middle')

router.get('/all',validationToken,isAdminMiddleWare,async(req,res)=>{

   

    const users = await User.find({})

    res.json({users})
})

router.get('/',validationToken,(req,res)=>{
    const user = req.user;
    res.json({user})
})

router.put('/:id',validationToken,async(req,res)=>{
    const {id} = req.params;
    const {fullName,email,userName} = req.body;

    const user = await User.findByIdAndUpdate(id,{
        fullName,
        userName,
        email,
        
    },
    {
        new:true
    })
    const userInfo = userDto(user)
    res.json({userInfo})
})

module.exports = router;