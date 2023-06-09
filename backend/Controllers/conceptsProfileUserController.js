const asyncHandler =require('express-async-handler');
const Concept=require('../Models/conceptsModel')
const User=require('../Models/usersModel')
const ConceptSearch = require('../Models/conceptSearchModel')
const UserActivity=require('../Models/UserActivityModel')

//@desc get concepts that specific user added 
//@route get /get/concepts/added/by/user
//@access private
const getConceptsAddedByUser=asyncHandler( async(req,res)=>{
    const userID=req.user._id;
    try {

        const count = await Concept.countDocuments({ suggestedBy_userId: { $exists: true } });

        const concepts=await Concept.find({suggestedBy_userId:userID,accepted:true}).select('conceptName categories _id isOpenAi createdAt')

        res.json({allConcepts:count,conceptsAddedByUser:concepts,conceptAddedCount:concepts.length})
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
//@desc get users added concepts Rating , 
//@route get /get/users/addedConcept/rating
//@access private
const getUsersAddedConceptRating=asyncHandler( async(req,res)=>{
    const userID=req.user.id;
    try {
      const usersIDes=await User.find().select("_id name")
      const data=await Concept.aggregate([
        {
            $match: {
              suggestedBy_userId: { $exists: true },
              accepted:true

            }
          },
        {
          $group: {
            _id: "$suggestedBy_userId",
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            uv: "$count",
            name: { $arrayElemAt: ["$user.name", 0] }
          }
        },
        {
            $project: {
              count: 0
            }
          },
        {
            $sort: {
             uv: 1
            }
          }
          
        
      ])
      for (let i = data.length-1; i >=0; i--) {
        data[i].name = i + 1;
      }
      const userRating=data.findIndex((user=>user.user_id==userID))
      res.json({userRating:userRating+1,data:data})
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})


//@desc get concepts searched by user 
//@route get /get/concepts/searched/by/user
//@access private
const getConceptsSearchedByUser=asyncHandler( async(req,res)=>{
  const email = req.user.email;
  try {

    let conceptsResults=new Array;
    const conceptIDs = await ConceptSearch.find({userEmail:email,correctSearched:true}).sort({ createdAt: -1 }).limit(5).select({conceptID:1,createdAt:1});
    const idesArray=conceptIDs.map((concept)=>concept.conceptID)
    for(let i=0;i<idesArray.length;i++){
      console.log(idesArray[i])
      conceptsResults.push({ concept:await Concept.findById(idesArray[i]).select({conceptName:1,categories:1}),createdAt:conceptIDs[i].createdAt})
    }
    res.json(conceptsResults)
  } catch (error) {
      res.status(400)
      throw new Error(error.message)
  }
})


//@desc get the last concepts added at the last user login 
//@route get /get/last/concepts/added/at/last/user/login
//@access private
const getLastConceptsAddedAtLastLogin=asyncHandler( async(req,res)=>{
  const user= req.user;
  const currentDate = new Date();
  const nextDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  try {
    // const query = {
    //   userId:user._id,
    //   createdAt: { $gte: nextDate }
    // };
    // const result=await UserActivity.findOne(query)
    // // res.json(`${result.createdAt.getDate()}/${result.createdAt.getMonth()+1}/${result.createdAt.getFullYear()}`)
    // res.json(result)
    res.json("success")
  } catch (error) {
      res.status(400)
      throw new Error(error.message)
  }
})


module.exports={
    getConceptsAddedByUser,
    getUsersAddedConceptRating,
    getConceptsSearchedByUser,
    getLastConceptsAddedAtLastLogin
 }