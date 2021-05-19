const mongoose = require("mongoose");

const connectToDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/registration',{
          useNewUrlParser: true, 
          useUnifiedTopology: true});
          console.log("connected to DB")
    } catch(err){
        console.log('connect to DB is failed')
    }
   
    
}

module.exports = connectToDB;