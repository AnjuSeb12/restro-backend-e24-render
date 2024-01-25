const mongoose=require("mongoose");
const validator=require("validator");
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        minLength:[3,"Fullname should have minimum3 character"],
        maxLength:[20,"Fullname shouldn't exceed 20 characters"],
        required:[true,"Please enter Fullname"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],  
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
        
       
    },
   
    password:{
        type:String,
        required:[true,"Please enter Password"]
    }
});
module.exports=mongoose.model('user',userSchema);