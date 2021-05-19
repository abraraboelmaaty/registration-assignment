const isAdminMiddleWare = (req,res,next)=>{
    
        const user = req.user;
        if(user.role !== 'admin'){
            return res.status(403).json({msg:'yuo are not allow to this action'})
        }
        next()
   
}

module.exports = {isAdminMiddleWare}