const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const User=require('../../src/models/user.js')
const Task=require('../../src/models/task.js')

const userId=new mongoose.Types.ObjectId()
const userOne={
    _id:userId,
    name:'David',
    email:"solo@gmail.com",
    password:"1234567",
    tokens:[{
        token:jwt.sign({_id:userId},process.env.JWT_API)
    }]
}

const userTwoId=new mongoose.Types.ObjectId()
const userTwo={
    _id:userTwoId,
    name:'Vinter',
    email:"Monk@gmail.com",
    password:"1234567",
    tokens:[{
        token:jwt.sign({_id:userTwoId},process.env.JWT_API)
    }]
}

const taskOne={
    _id:new mongoose.Types.ObjectId(),
    description:'First Task',
    completed:false,
    owner:userOne._id
}

const taskTwo={
    _id:new mongoose.Types.ObjectId(),
    description:'Second Task',
    completed:false,
    owner:userOne._id
}


const setUpDatabase=async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}

module.exports={
    userId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    setUpDatabase
}