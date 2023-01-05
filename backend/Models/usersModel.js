const { urlencoded } = require('express')
const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name .']
    },
    email:{
        type:String,
        required:[true,'Please add your email']

    },
    password:{
        type:String,
        required:[true,'Please add your password']

    },
    phoneNumber:{
        type:String,
        required:[true,'Please add a phone number']
    },
    language:{
        type:String,
        required:[true,'Please select a language'],
        enum:['English','עברית', 'العربية' ],
        default:'English'
       },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'Please select a category'],
        ref:"Category"
       },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    profile_image:{
        type:String,
        default:'https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png'
    },
    favorite_pet:{
        type:String,
        required:[true,"please add favorite pet  "]
    }
    

})

module.exports=mongoose.model('User',userSchema)