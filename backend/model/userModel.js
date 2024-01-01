const mongoose = require('mongoose')

const userModel = mongoose.Schema(
    {
       name:{
        type:String,
        required:true

       },
       email:{
        type:String,
        required:true

       },
       password:{
        type:String,
        required:true

       },
       pic:{
        type:String,
        required:true,
        default:"https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"

       },
    },

    {
        timeStamps:true
    }

)

const User = mongoose.model("User",userModel);

module.exports =User