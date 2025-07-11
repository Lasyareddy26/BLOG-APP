const UserAuthor = require("../models/userAuthorModel");

async function commonuserandauthor(req,res){
    //to post user or author
    const newUserAuthor=req.body;
    //fnd user by emil id
    const userInDb=await UserAuthor.findOne({email:newUserAuthor.email})
    //if user or author exists
    if(userInDb!==null){
        //check their role
        if(newUserAuthor.role===userInDb.role){
            res.status(200).send({message:newUserAuthor.role,payload:userInDb})
            
        }else{
            res.status(200).send({message:"**user already exists"})
        }

    }else{
        //create new user and save in db
        let newUser=new UserAuthor(newUserAuthor);
        let newUserOrAuthorDoc=await newUser.save();
        res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
    }

}
module.exports=commonuserandauthor