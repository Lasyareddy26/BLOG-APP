const exp=require('express')
const app=exp();
require('dotenv').config() //will take all from .env and put in process.env
const mongoose=require("mongoose");
const cors=require('cors')
app.use(cors())

const userApp = require('./APIs/userApi'); //these get imported automatically when line 21 is done
const adminApp = require('./APIs/Adminapi');
const authorApp = require('./APIs/authorApi');

const port=process.env.PORT || 4000

//db connection
mongoose.connect(process.env.DBURL)
.then(()=>{
   console.log("DB connection success")
   app.listen(port,()=>console.log("server listening on port",port)) 
})
.catch(err=>console.log("error in db connection",err))

app.use(exp.json())

//connect all api files
app.use('/user-api',userApp)
app.use('/admin-api',adminApp)
app.use('/author-api',authorApp)

//error handling middleware
app.use((err,req,res,next)=>{
   console.log("err object in express error handler",err)
   res.send({message:err.message})
})

