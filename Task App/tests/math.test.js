const {calculateTip,fahrenheitToCelsius,celsiusToFahrenheit,add}=require('../src/math.js')


test('Check for CalculateTip',()=>{
   const totalTest=calculateTip(10,0.3)

   expect(totalTest).toBe(13)
})


test('Should Convert 32F to 0C',()=>{
    const celsius=fahrenheitToCelsius(32)
    expect(celsius).toBe(0)
})

test('Should Convert 0C to 32F',()=>{
    const fahrenheit=celsiusToFahrenheit(0)
    expect(fahrenheit).toBe(32)
})

test('Promise 2 Nums',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5)
        done()
    })
})
test('The 2 Nums Async',async()=>{
    const sum=await add(2,3)
    expect(sum).toBe(5)
    // done()
})