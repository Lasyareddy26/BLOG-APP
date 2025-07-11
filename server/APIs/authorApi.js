const exp=require("express")
const authorApp=exp.Router();
const expressAsyncHandler=require("express-async-handler")
const commonuserandauthor=require('./commonuserandauthor')
const Article=require('../models/articleModel')

//create new author
authorApp.post('/author',expressAsyncHandler(commonuserandauthor))

//author creates new article
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{
    //get that article info obj from user
    const newArticleObj=req.body;
    const newArticle=new Article(newArticleObj)
    const articleObj=await newArticle.save()
    res.status(201).send({message:"article published",payload:articleObj})
}))

//read all articles(his and others also)
authorApp.get('/articles',expressAsyncHandler(async(req,res)=>{
    //read all articles from db
    const listOfArticles=await Article.find({isArticleActive:true})
    res.status(200).send({message:"articles",payload:listOfArticles})
}))

//edit article by id
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    //get modified article from user
    const modifiedArticle=req.body;
    //update article by id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:latestArticle})

}))

//delete article by article id (delete means onli isArtcle wil change to false..we odnt wanna delete anything else coz it will get deleted permenantly..so we r just updating..so not delete req and put req)
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    //get modified article from user
    const modifiedArticle=req.body;
    //update article by id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article deleted or restored",payload:latestArticle})

}))
module.exports=authorApp;
