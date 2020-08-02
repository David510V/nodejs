const fs=require('fs')
const book={
    title:'Eagle Eye',
    author:'Ryan Holiday'
}

const car={
    name:'Volvo',
    year:'2019'
}
const bookJSON= JSON.stringify(book) // Will be as a String. no such thing "bookJSON.title" // null

const bookData=JSON.parse(bookJSON) //Give access to properties "bookJSON.title" // `Ryan Holiday` // BUT NEEDS TO JSON.Stringfy

const carJSON=JSON.stringify(car)
const carData=JSON.parse(carJSON)
// fs.writeFileSync('1-json.json',bookJSON)
// fs.appendFileSync('1-json.json',carJSON)

const dataBuffer=fs.readFileSync('1-json.json') //How to get the info form the json file
const dataJSON=dataBuffer.toString()
const data=JSON.parse(dataJSON)
// console.log(data.title)


const earthBuffer=fs.readFileSync('data.json')
const earthJSON=earthBuffer.toString()
const earth=JSON.parse(earthJSON)

earth.name="Arnold";
earth.age="22"
earth.planet="mars"

//Changed the data in `earth`
// create a new varibale called `NewearthJSON
// stringify back the `earth` and atach 
const NewearthJSON=JSON.stringify(earth)

fs.writeFileSync('data.json',NewearthJSON)
console.log(earth)