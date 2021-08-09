 // First Mern Program.
// // First Require the express.
// const express = require('express');
// //use Express
// const app = express();

// app.get('/',(req,res)=>{
//     res.send("HelloWorld From the Server");

// })
// app.listen(3000,()=>{
//     console.log('server is running');
// })

//middleware or database connection. using mongoose.

// const mongoose = require('mongoose');
const mongoose = require('mongoose');
//import userSchema data.
// const user = require('./model/userSchema');
const dotenv = require('dotenv');
// First Require the express.
const express = require('express');
//use Express
const app = express();

// usedotenv
dotenv.config({ path:'./config.env'});
// import connjs data in app.js.
 require('./db/conn');
//if your show the json data then you write this not write if not write the error undifined.
 app.use(express.json());
//we link the router files to make our route easy.
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// //database connection start.
// // const DB = 'mongodb+srv://vikas:vikas9090@cluster0.ipptd.mongodb.net/mernstacks?retryWrites=true&w=majority';

// mongoose.connect(DB,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false

// }).then(()=>{
//     console.log('connection Sucessful');
// }).catch((err)=> console.log('no connection'));

// databse connection end.




//middleware


const middleware = (req,res,next)=>{
    console.log('hello my middleware');
    next();
    //Note:- If next can not write don not get output.
}

// middleware();
//if router set then it will not work. i comment .
// app.get('/',(req,res)=>{
//     res.send("HelloWorld From the Server");

// })

app.get('/about',middleware,(req,res)=>{
    console.log('Helloworld my about');
    res.send("Hello about From the Server");

})
app.get('/contact',(req,res)=>{
    res.cookie("Test","vikas");
    res.send("Hello contact From the Server");

})
app.get('/signin',(req,res)=>{
    res.send("Hello signin From the Server");

})
app.get('/signup',(req,res)=>{
    res.send("Hello signup From the Server");

})

app.listen(PORT,()=>{
    console.log(`server is running at port no is ${PORT}`);
})



