const weatherForm=document.querySelector('#form')
const search=document.querySelector('#form input')
const ms1=document.querySelector('.ms1')
const ms2=document.querySelector('.ms2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value;
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            ms1.textContent=data.error
        }
        else{
           console.log(data.forecast)
            // // console.log(data.features[0].place_name)
            ms1.textContent=data.forecast
            ms2.textContent=data.location       
         }
    })
})
})
