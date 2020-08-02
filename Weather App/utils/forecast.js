const request=require('request')
const forecast=(a1,b2,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=73e8fab5f87e3c5f1f891d4116db45da&query=${encodeURIComponent(a1)},${encodeURIComponent(b2)}&units=s`

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('There is Non connection',undefined)
        }
        else if(body.error){
            callback(body.error,undefined)
        }
        else{
            location=body.location.name
            temp=body.current.temperature
        }
    })
}


module.exports=forecast