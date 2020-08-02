const tasks={
    tasks:[{
        text:'Grocery Shop',
        completed:true
    },{
        text:'Clean up',
        completed:false
    },{
        text:'Film Stuff',
        completed:false
    }],

    getTasksTodo(){
       return this.tasks.filter((task)=> task.completed===false)
    }
}

console.log(tasks.getTasksTodo())