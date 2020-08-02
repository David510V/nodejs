const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')



const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6){ 
                throw new Error('Too Short')
            }
            if(value==='password'){
                throw new Error('Dont Write Password you dummy')
            }
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not good Email!')
            }
        }
    },
    age:{
        type:Number,
        required:true,
        minlength:1
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


userSchema.methods.getPublicProfile=function(){
    const user=this
    const userObject=user.toObject()
    

    delete userObject.password
    delete userObject.tokens 
    return userObject
}

userSchema.statics.findByCredentials=async function (email,password){ //MONGOOSE MIDDLEWARE
    const user=await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch=await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user.id.toString()},'thisIsDavid')

    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}


//Hash the plain text password before saving
userSchema.pre('save',async function(next){
    const user=this
    if(user.isModified){
        user.password=await bcrypt.hash(user.password,8)
    }

    next()
})

const User=mongoose.model('User',userSchema)



module.exports =User