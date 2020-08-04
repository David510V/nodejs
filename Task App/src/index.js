// /Users/Davidka/mongodb/bin/mongod --dbpath=/Users/Davidka/mongodb-data
const express=require('express');
const app=express();
require('dotenv').config({path:'./enviorment/dev.env'})
require('./db/mongoose.js')

const Task=require('./models/task.js')
const userRouter=require('./routes/user.js')
const taskRouter=require('./routes/task.js')
const port=process.env.PORT;

const multer=require('multer')


const upload=multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a Word Document'))
        }
        cb(undefined,true)
    }
})


app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const router=new express.Router()

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const User = require('./models/user.js');

const main= async ()=>{
    const user=await User.findById('5f26b678c72fb810a09a2d61')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
}

// main()

app.listen(port,()=>{
    console.log("Server is up on " +port)
})