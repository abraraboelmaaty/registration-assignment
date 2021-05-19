const{Schema,model} = require('mongoose')

const userSchema = Schema({
    fullName : {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    repetedPassword:{
        type:String,
        required:true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['admin', 'user']
    },
})

const User = model('users',userSchema)

module.exports = {User}