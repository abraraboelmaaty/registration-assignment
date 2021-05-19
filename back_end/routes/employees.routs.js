const router = require('express').Router()

const {validationToken} = require('../middel_ware/users/validation.middle')
const {isAdminMiddleWare} = require('../middel_ware/users/isAdmin.middle')
const employeeDto = require('../dto/emloyee.dto')

const {Emplyee} = require('../models/employee.model')



router.post('/',validationToken,isAdminMiddleWare,async(req,res)=>{

    const {name,email,phoneNumber,address,role,salary} = req.body;

    const employee = new Emplyee({
        name,
        email,
        phoneNumber,
        address,
        role,
        salary
    })

    await employee.save()
    const employeeInfo = employeeDto(employee)
    res.json({employee})
})

router.get('/all',validationToken,isAdminMiddleWare,async(req,res)=>{

    const employees = await  Emplyee.find()
    const employeesInfo = employeeDto(employees)
    res.json({employees})
})

router.put('/:id',validationToken,isAdminMiddleWare,async(req,res)=>{

    const {id} = req.params
    const {name,email,role} = req.body
    
    const employee = await Emplyee.findByIdAndUpdate(id,{
        name,
        email,
        role
    },
    {
       new:true 
    })
    
    res.json({employee})
})

router.delete('/:id',validationToken,isAdminMiddleWare,async(req,res)=>{
    const {id} = req.params;
    await Emplyee.findByIdAndDelete(id)
    res.json({msg:'employe has deleted successfully'})
})

module.exports = router

