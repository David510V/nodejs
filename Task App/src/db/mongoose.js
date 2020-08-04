const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_UR,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false 
})




