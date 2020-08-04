// /Users/Davidka/mongodb/bin/mongod --dbpath=/Users/Davidka/mongodb-data
const express=require('express');
const app=express();
require('dotenv').config({path:'./enviorment/test.env'})
require('./db/mongoose.js')

const Task=require('./models/task.js')
const userRouter=require('./routes/user.js')
const taskRouter=require('./routes/task.js')
const port=process.env.PORT;
const router=new express.Router()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up on " +port)
})

module.exports=app