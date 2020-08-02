// /Users/Davidka/mongodb/bin/mongod --dbpath=/Users/Davidka/mongodb-data
const express=require('express');
const app=express();
require('./db/mongoose.js')

const Task=require('./models/task.js')
const userRouter=require('./routes/user.js')
const taskRouter=require('./routes/task.js')
const port=process.env.PORT || 3000;


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
const router=new express.Router()

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// const myFunction=async()=>{
//     // const password='Red12345!'
//     // const hasedPassword=await bcrypt.hash(password,8)

//     // const isMatch=await bcrypt.compare(password,hasedPassword)
//     // console.log(isMatch)

//    const token= jwt.sign({_id:'Woll'},'thisIsDavid',{expiresIn:'7 days'})
    
//    const data=jwt.verify(token,'thisIsDavid')
//    console.log(data)
// }

// myFunction()

app.listen(port,()=>{
    console.log("Server is up on " +port)
})