require('../src/db/mongoose.js');

const User=require('../src/models/user.js');

// User.findByIdAndUpdate('5f22c8336eef433dec26b018',{ age:1}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })


const updateAge=async (id,age)=>{
    const user=await User.findByIdAndUpdate(id, { age })
    const count=await User.countDocuments({age})

    return count
}


updateAge('5f22c643b1da873e5cca7328',52).then((user)=>{
    console.log(user)
}).catch((e)=>{
    console.log(e)
})