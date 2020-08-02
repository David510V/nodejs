const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0){
                return reject('Numbers Must be non negative')
            }

            resolve(a+b)
        },10)
    })
}

const doWork= async()=>{
   const sum=await add(1,1)
   const sum2=await add(sum,2)
   const sum3=await add(sum2,2)
   const sum4=await add(sum3,-2)
   return sum4
}

doWork().then((res)=>{
    console.log('return',res)
}).catch((e)=>{
    console.log('The error is:',e)
})