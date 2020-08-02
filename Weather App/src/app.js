const path=require('path')
const express=require('express')
const app=express()
const geocode=require('./utils/gecode.js')
const forecast=require('./utils/forecast.js')
const hbs=require('hbs')
const { getHeapCodeStatistics } = require('v8')


const publicDir=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'By David'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Node Js',
        name:'By David'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Me',
        name:'By David'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error')
})

app.get('*',(req,res)=>{
    res.render('error',{
        desc:"Not Found",
        name:"Not Found Name"
    })
})
app.listen(3000,()=>{
    console.log("Server is up on 3000 port ! ")
})