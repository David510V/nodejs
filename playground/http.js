const http=require('http')
const url='http://api.weatherstack.com/current?access_key=73e8fab5f87e3c5f1f891d4116db45da&query=37.8267,-122.4233&units=s'

const request=http.request(url,(response)=>{
    let data=''
    response.on('data',(chunk)=>{
        data=data+chunk.toString()
    })
    response.on('end',()=>{
       const body=JSON.parse(data)
       console.log(body)
    })
})


request.on('error',(error)=>{
    console.log("There is an error", error)
})

request.end()