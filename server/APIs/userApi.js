const exp=require("express")
const userApp=exp.Router();
const UserAuthor=require('../models/userAuthorModel')
const expressAsyncHandler=require("express-async-handler")
const commonuserandauthor=require('./commonuserandauthor')
const Article=require('../models/articleModel')

//create new user
userApp.post('/user',expressAsyncHandler(commonuserandauthor))

//add a comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{  //it sput and not post req
    //get comment object
    const commentObj=req.body;
    //add commentobj to article
    const articleWithComments=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:commentObj}},{returnOriginal:false})
    res.send({message:"comment added",payload:articleWithComments})
}))





module.exports=userApp;