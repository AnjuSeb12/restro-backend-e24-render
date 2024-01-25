const bcrypt=require("bcrypt");

const saltRound=10;//saltround variable declaring
const User=require("../models/userModel");
const { getToken } = require("../utils/jwtToken");


exports.postRegister= async (req,res) => {
    // console.log(req.body);
    // throw Error("this is an Error");
    // res.send("Profile");
    // res.send("this is register page");
    const {fullname,email,password}=req.body;
    const hashedPass=await bcrypt.hash(password,saltRound);
    // console.log("Hashed Password:",hashedPass);
    // console.log("Inside Register API");
    try {
        const user= await User.create({
            fullname,
            email,
            password:hashedPass
        
        });
       
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User Registeration Failed!",
            })
        }
        res.status(201).json({
            success:true,
            message:"User Registration Successfully Completed!!",
            user,
            isAuthenticated:true,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }

}
exports.userLogin = async (req,res,next) => {
    const {email,password} = req.body;
    try {
        const user= await User.findOne({email});
        console.log("user",user);
        if(!user){
            return res.status(500).json({
                success:false,
                message:"User not Found!"
    
            });
        }
        const isValid= await bcrypt.compare(password,user.password);
        console.log("isValid",isValid);
        if(!isValid){
            return res.status(401).json({
                success:false,
                message:'Invalid credentials!'
            });
        }
        req.user=user;
        getToken(req,res)
        // res.status(201).json({
        //     success:true,
        //     message:"Loged in Successfully!",
        //     isAuthenticated:true,
        //     user
        // });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
   
}
// userList API
exports.getAllUsers=async (req,res) => {

// console.log(token);
    try {
        const users=await User.find();
      
        if(!users){
            return res.status(500).json({
                success:false,
                message:"Users not found!"
            });
        }
        res.status(200).json({
            success:true,
            users
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
}
exports.updateUserDetails =async (req,res) => {
const userId=req.params.id;
const {fullname,email}=req.body
try{
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not Found",
            user
        });
    }
    user.fullname=fullname;
    user.email=email;
    user.save();
    res.status(200).json({
        success:true,
        message:"User details Updated",
        user
    });

}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    });

}



}
exports.getUserDetails= async (req,res) => {
    const userId=req.params.id;
    try {
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found",
                user
            });
        }
        res.status(200).json({
            success:true,
          
            user
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    
    }
}
exports.deleteUser = async (req,res) => {
    const {id}=req.params;
    try {
        const user=await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found",
                
            });
        }
        res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
          
            
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    
    }
}
