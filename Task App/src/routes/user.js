const express=require('express')
const router=new express.Router()
const User=require('../models/user.js')
const auth=require('../middleware/auth.js')


router.post('/users',async (req,res)=>{
    const user= new User(req.body)
   try{
    const token=await user.generateAuthToken()
    await user.save()
    res.status(200).send({user,token})
   }
   catch(e){
       res.status(400).send(e)
       console.log(e)
   }
})


router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.status(200).send({user:user.getPublicProfile(),token})
    }
    catch(e){
        res.status(400).send("Connection Faield")
    }
    const user=await User.findByCredentials(req.body.email,req.body.password)
    res.send(user)
})


router.post('/users/logout',auth, async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()

        res.status(200).send("Logged Out")
    }
    catch(e){
        res.status(500)
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send("All Log Out")

    }catch(e){
        res.status(500)
    }
})

router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
})




router.patch('/users/:id',async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','age']
   
     updates.forEach((key) => {
    if (!allowedUpdates.includes(key)) {
      return res.status(404).send({error: "Key which is not in model supplied"});
    }
})

    try{
        const user=await User.findById(req.params.id) 
        

        updates.forEach((update)=>{user[update]=req.body[update]})
        await user.save()
        if(!user){
            res.status(404).send("No User!")
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/:id',auth,async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        if(!user){
           return res.status(404).send("No user found")
        }
        res.status(200).send(user)
    }
    catch(e){
        res.status(500).send("Connection Error")
    }
})

module.exports=router