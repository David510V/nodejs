const name='Dima'
const userAge='25'

const user={
    //name
    userName:name,
    age:userAge,
    location:'Haifa'
}

const {location,age,userName}=user


const transaction=(type, { userName,age=0,location }={})=>{   // The 'user' obj will be unstructured
    console.log(type,userName,age,location)
}

transaction('order',user)