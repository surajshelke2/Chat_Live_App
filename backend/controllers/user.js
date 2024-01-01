const { message } = require("statuses");
const User = require("../model/userModel");
const bcrypt = require('bcrypt')


const registerUser = async(req,res)=>{
    
    try {

        const {name,email,password,pic}=req.body;

    const user = await User.findone(email);

    if(!user) return res.json({
        success:false,
        message:"User Already Exits !!"
    })

    const hashPassword = await bcrypt.hash(password,10);

    user = await User.create({name,email,password:hashPassword,pic})

    sendCokkies(user,res,"Registartion Suceessfully !!",201)
    
        
    } catch (error) {

        next()
        
    }
    

}



module.exports=registerUser;