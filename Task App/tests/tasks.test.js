const superTest =require('supertest')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const app=require('../src/app.js')
const Task=require('../src/models/task.js')

const User=require('../src/models/user.js')
const {userId,
    userOne,
    userTwoId,
    userTwo,
    setUpDatabase,
    taskOne} =require('./fixtures/db.js')
const { request } = require('../src/app.js')

beforeEach(setUpDatabase)


test('Should Create Task For User',async()=>{
   const response= await superTest(app).post('/tasks').
   set('Authorization',`Bearer ${userOne.tokens[0].token}`)
   .send({
       description:'Know You'
   }).expect(200)
   const task=await Task.findById(response.body._id)
   expect(task).not.toBeNull()
})

test('Get all tasks for user one',async()=>{
    const response=await superTest(app).get('/tasks').set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .expect(200)

    expect(response.body.length).toEqual(2)
})

test('Should Delete other users tasks',async ()=>{
    const response=await superTest(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)


})