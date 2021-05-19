const {Schema,model} = require('mongoose')


const employeeSchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required:true,
        default: 'user',
        enum: ['admin', 'user']
    },
    salary:{
        type:Number,
        required:true
    }
})

const Emplyee = model('emplyees',employeeSchema)

module.exports = {Emplyee}