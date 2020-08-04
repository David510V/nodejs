const calculateTip=(total,tipPrecent)=>{
    tip=total*tipPrecent
    return tip+total
}

const fahrenheitToCelsius=(temp)=>{
    return (temp-32)/1.8
}

const celsiusToFahrenheit=(temp)=>{
    return (temp*1.8)+32
}

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


module.exports={calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add}