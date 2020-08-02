require('../src/db/mongoose.js');

const Task=require('../src/models/task.js');
const { count } = require('../src/models/task.js');

// Task.findByIdAndDelete("5f23d93246e2c00eb088d587").then((tasks)=>{
//     console.log(tasks)
//     return Task.countDocuments({completed:false})
// }).then((tasks)=>{
//     // Task.remove(tasks)
//     console.log(tasks)
// }).catch((e)=>{
//     console.log(e)
// })


const deleteTask=async (id)=>{
    const taskNo= await Task.findByIdAndDelete(id)
    const countFalse= await Task.countDocuments({completed:false})

    return countFalse
}

deleteTask('5f23d34482459d319cbccac7').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

