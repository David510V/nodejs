const superTest =require('supertest')

const app=require('../src/app.js')
const User=require('../src/models/user.js')
const {setUpDatabase,userId,userOne} =require('./fixtures/db.js')

beforeEach(setUpDatabase)

test('Log in the User',async()=>{
   const response= await superTest(app).post('/users/login').send({
    name:'David',
    email:"solo@gmail.com",
    password:"1234567"
    }).expect(200)
    const user=await User.findById(userId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Cant login the user',async()=>{
    await superTest(app).post('/users/login').send({
    name:'David',
    email:"x@gmail.com",
    password:"1"
    }).expect(400)
})

test('Want to see user profile',async()=>{
    await superTest(app).get('/users/me').set('Authorization',`Bearer ${userOne.tokens[0].token}`).send().expect(200)
})


test('Delete Account',async()=>{
   await superTest(app).delete('/users/me').set('Authorization',`Bearer ${userOne.tokens[0].token}`).expect(200)
   const user=await User.findById(userId)
   
   expect(user).toBeNull()
})

test('Upload Image Avatar',async()=>{
    await superTest(app).post('/users/me/avatar').set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/profile-pic.jpg').expect(200)

    const user=await User.findById(userId)

    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should Update User',async()=>{
   const response= await superTest(app).patch('/users/me').set('Authorization',`Bearer ${userOne.tokens[0].token}`)
   .send({
       name:'John'
   })
    const user=await User.findById(userId)

    expect(user.name).toEqual("John")

})