const express=require('express')
const router=new express.Router()
const Task=require('../models/task.js')
const auth=require('../middleware/auth.js')

router.post('/tasks',auth,async (req,res)=>{    
    const task= new Task({
        ...req.body,
        owner:req.user._id
    })
    try{    
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send("something misses")
    }
    
})

// Coustmize data that comes back
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async(req,res)=>{
    const match={}
    const sort={}
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':')
        sort[parts[0]]=parts[1]==='desc'? -1 : 1
    }
    try{
        //const tasks=await Task.find({owner:req.user._id})
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }
    catch(e){
        res.status(500).send("Wrong Connection")
    }
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findOne({_id, owner:req.user._id})
        if(!task){
            res.status(400).send("No Task Found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(e).send("Wrong Connection")
    }
    
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']

    updates.forEach((key)=>{
        if(!allowedUpdates.includes(key)){
          return  res.status(404).send({error:'Invalid Updates'})
        }
    })

    try{
        const task=await Task.findOne({_id:req.params.id,owner:req.user._id})
        
        if(!task){
            res.status(404).send("No Task has Found")
        }
        // const task=await Task.findById(req.params.id)
        updates.forEach((update)=>{task[update]=req.body[update]})
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id',auth,async(req,res)=>{
    try{
        const task=await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task){
            res.status(404).send("No Task Found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports=router