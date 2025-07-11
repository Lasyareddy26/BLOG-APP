const mongoose=require("mongoose")
//define schema
const userAuthorSchema=new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImageUrl:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{"strict":"throw"})



//create model
const UserAuthor=mongoose.model('userauthor',userAuthorSchema) //creates a collection called"userauthors

//export model
module.exports=UserAuthor;