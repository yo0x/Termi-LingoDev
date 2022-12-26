const express=require('express')
const router=express.Router()
const {registrUser,loginUser,getMe,resetPassword,uploadImage,updateUser}=require('../Controllers/userControllers')
const {protect}=require("../middleware/authMiddleware")
const {upload} =require('../config/S3')

router.post('/register/:categoryId',registrUser)
router.get('/me',protect,getMe) 
router.post('/login',loginUser)
router.post('/upload/image',upload.single("profileImage"), uploadImage)
router.post('/reset/password',protect,resetPassword) 
router.post('/update/user',protect,updateUser)



module.exports=router
