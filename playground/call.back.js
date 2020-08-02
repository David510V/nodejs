
const names=['a','b','c']
const shortName=names.fill((name)=>{
    return name.length<=4
})

// const geocode=(address,callback)=>{
//     setTimeout(()=>{
//         const data={
//             latitude:0,
//             longitude:0
//         }
    
//         callback(data)
//     },2000)
    
   
// }

// geocode('Philadelphia',(data)=>{
//     console.log(data)
// });
function showSome(a,b){
    var sum=a+b
    return "This is the things :" + sum
}

const add=(a,b,callback)=>{
     setTimeout(()=>{
        callback(showSome(a,b))
     },2000)
}

add(1,4,(sas)=>{
    console.log(sas) // show me 'sas' -> shows me 'callback' -> shows me 'showSome()'
})