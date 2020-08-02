const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0){
                return reject('Numbers Must be non negative')
            }

            resolve(a+b)
        },2000)
    })
}

add(1,2).then((result)=>{
    console.log(result)
   return add(result,3)
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})