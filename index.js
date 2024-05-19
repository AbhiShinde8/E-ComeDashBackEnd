

// mongodb+srv://admin:admin@123@cluster0.g9nzgbg.mongodb.net/ monodb connection URI


const mongoose = require('mongoose');

const { Schema } = mongoose;
const cors = require('cors');





mongoose.connect('mongodb+srv://admin:admin%40123@cluster0.g9nzgbg.mongodb.net/ecom')
  .then(() => console.log('Connected!'))
  .catch((e)=>{
    consol.log("Database not conected..")
  });


  const userSchema = new Schema({
    firstName: String, // String is shorthand for {type: String}
    lastName: String,
    contact: String,
    email: String,
    password:String,
    confirmpassword:String,
  });



  const User = mongoose.model('User', userSchema);

  


const express = require('express')
const app = express()
const port=3000;
const bodyParser = require('body-parser')
app.use(cors());
// app.use(bodyParser.json())

const jsonParser = bodyParser.json()

app.get('/',  (req, res)=> {
  res.send('Hello World')
})

app.post('/register', jsonParser,(req, res)=>{
const {firstName,lastName,contact,email,password,confirmpassword}=req.body;

// here user is creates using User 
const newUserCreate = new User({
  firstname: firstName, 
    lastname:lastName ,
    contact:contact ,
    email:email ,
    password:password,
    confirmpassword:confirmpassword,
})
// after creating user it's time to save it using save() method and .then()
newUserCreate.save().then((result)=>{
  // here pass the response and stetus using code like 201 with json formatt 
  res.status(201).json({msg:"New User is created Successfully",result});
})
})
app.post('/login', jsonParser,  (req, res)=> {
  console.log("body data",req.body)
  res.send('Login API')
})

app.listen(port,()=>{
  console.log("Server is running on Port No",port)
})