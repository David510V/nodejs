const request=require('request');
const url='http://api.weatherstack.com/current?access_key=73e8fab5f87e3c5f1f891d4116db45da&query=37.8267,-122.4233&units=s'
const la='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGF2aWR2NTEwIiwiYSI6ImNrY2ozZXpudjE5emwyd2xwOHh0NWQ0NXUifQ.Ohm832s-4gzy1_uYjwbwKg&limit=1';
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

// console.log(process.argv)

if(!process.argv[2]){
 console.log("Put Address")
}

else{
  geocode(process.argv[2],(error,{latitude,longitude}={})=>{
    if(error){
      console.log(error)
    }
    console.log('Error2',error)
    console.log('Data2',{})
    forecast(latitude, longitude, (error, ForecastData) => {
      if(error)
      {
        console.log(error)
      }
      console.log('Error', error)
      console.log('ForecastData:', ForecastData) // the callback is console.log
    })
  })
  
}