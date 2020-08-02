const express=require('express')
const router=new express.Router()
const Task=require('../models/task.js')
router.post('/tasks',async (req,res)=>{
    
    try{
        const task= await new Task(req.body)
        await task.save()
        res.status(200).send(task)
    }
    catch(e){
        res.status(400).send("something misses")
    }
    
})

router.get('/tasks',async(req,res)=>{
    try{
        const tasks=await Task.find({})
        res.status(200).send(tasks)
    }
    catch(e){
        res.status(500).send("Wrong Connection")
    }
})

router.get('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findById(req.params.id)
        if(!task){
            res.status(400).send("No Task Found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(e).send("Wrong Connection")
    }
    
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['description','completed']

    updates.forEach((key)=>{
        if(!allowedUpdates.includes(key)){
          return  res.status(404).send({error:'Invalid Updates'})
        }
    })

    try{
        const task=await Task.findById(req.params.id)
        updates.forEach((update)=>{task[update]=req.body[update]})
        await task.save()
        if(!task){
            res.status(404).send("No Task has Found")
        }
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id',async(req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id)
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