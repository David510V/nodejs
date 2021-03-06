const request=require('request');

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGF2aWR2NTEwIiwiYSI6ImNrY2ozZXpudjE5emwyd2xwOHh0NWQ0NXUifQ.Ohm832s-4gzy1_uYjwbwKg&limit=1`

    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('Cant to connect to specific Locations',undefined)
        } else if(body.features.length===0){
            callback('No Location try another',undefined)
        }else{    //(error,data)
            callback(undefined,{
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports=geocode