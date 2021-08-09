const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("../db/conn");
const User = require("../modal/userSchema");
// require("../db/conn");
// const user = require('../model/userSchema');

router.get("/", (req, res) => {
  res.send("Hello world from the server router js");
});
//extra
//   router.post('/register',(req,res)=>{
//      //   console.log(req.body.name);
//      //   console.log(req.body.email);
//      //array descutring
//      const{name,email,phone,work,password,cpassword}= req.body;
//      // console.log(name);
//      // console.log(email);
//      // console.log(phone);
//      if(!name || !email || !phone || !work || !password || !cpassword){
//           return res.status(422).json({error:"plZ filled the from properly"});
//      }
//      //   res.json({ message:req.body });
//      //   res.send("mera register page");
//      User.findOne({ email:email})
//      .then((userExit)=>{
//           if(userExit){
//                return res.status(422).json({error:"Email already exit"});
//           }
//          const user = new User({name,email,phone,work,password,cpassword});
//           // const user = new User({ name,email,phone,work,password,cpassword });

//           user.save().then(() => {
//                res.status(201).json({ message:"user registered successfully"});
//           }).catch((err)=> res.status(500).json({ error : "Failed to registered"}));
//      }).catch(err => {console.log(err);});

//   });
//   module.exports= router;

//using promises
router.post('/register',(req,res)=>{
     // res.send('Hello world from the register  server router js');
     // console.log(req.body);
     // res.json({ message:req.body });
     //simple javascript
     // console.log(req.body.name);
     // console.log(req.body.email);
     //array descutring
     const{name,email,phone,work,password,cpassword}=req.body;
      //find data
     // console.log(name);
     if(!name || !email || !phone || !work || !password || !cpassword){
          return res.status(422).json({error: "plz filled the field properly"});
     }

     User.findOne({ email: email })
     .then((userExit)=>{
          if(userExit){
               return res.status(422).json({error:"Email already Exits"});
          }
          // if will show html document in all data
          // const user = new user(req.body)
          const user = new User({name,email,phone,work,password,cpassword});

          user.save().then(()=>{
               res.status(201).json({message:"user registered sucessfully"});
          }).catch((err)=> res.status(500).json({ error:"Failed to registered"}));
     }).catch(err => { console.log(err);});
});
  module.exports= router;

// store data useing Async Data.
// // singin
// router.post('/register', async(req,res)=>{

//      const{name,email,phone,work,password,cpassword}=req.body;

//      if(!name || !email || !phone || !work || !password || !cpassword){
//           return res.status(422).json({error: "plz filled the field Properly"});
//      }
//      try{
//           const userExit = await User.findOne({email:email});

//           if(userExit){
//                return res.status(422).json({error:"email already Exits"});

//           }
//           const User = new User({name,email,phone,work,password,cpassword});
//           //yaha se phahle
//          await user.save();
//           res.status(201).json({message:"user registred sucessfully"});
//      }
//      catch(err){
//           console.log(err);
//      }

// })



//bcyrpt js 

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "plz filled the field Properly" });
  }
  try {
    const userExit = await User.findOne({ email: email });

    if (userExit) {
      return res.status(422).json({ error: "email already Exits" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password are not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
    

    //not show the console
    await user.save();
    // show the console 
    //  const userRegister =  await user.save();
    //  console.log(`${user} user Register successfully`);
    //  console.log(userRegister);

    res.status(201).json({ message: "user registred sucessfully" });
  }
  } catch (err) {
    console.log(err);
  }
});
// //user login
// router.post("/singin", async (req, res) => {
//   // console.log(req.body);
//   // res.json({message:"awsome"});

//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "plz Filled the data" });
//     }
//     const userLogin = await User.findOne({ email: email });
//     // console.log(userLogin);
    

//     if (!userLogin) {
//       res.status(400).json({ error: "can not find user" });
//     } else {
//       res.json({ message: "user Sigin sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
// module.exports = router;

// //compare password same or not.
// router.post("/singin", async (req, res) => {
//   // console.log(req.body);
//   // res.json({message:"awsome"});

//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "plz Filled the data" });
//     }
//     const userLogin = await User.findOne({ email: email });
//     // console.log(userLogin);
//     //compare password same or not.
//      if(userLogin){
//       const iMatch = await bcrypt.compare(password,userLogin.password);
   
//       if (!iMatch) {
        
//         res.status(400).json({ error: "can not find user pass" });
//         //or
//         // res.status(400).json({ error: "can not find user" });
//       } else {
//         res.json({ message: "user Sigin sucessfully" });
//       }
//      }else{
//       res.json({ message: "Invalid Creditails" });
//      }

    
//   } catch (err) {
//     console.log(err);
//   }
// });
// module.exports = router;
//user authetiaction using JWT in mern

// 1.Generate JWT Token and Stored it in Database.
// 2. How to Stored the token in Cookies.
// 3.  Get Token from cookie and Verify the User.


router.post("/singin", async (req, res) => {
  // console.log(req.body);
  // res.json({message:"awsome"});

  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz Filled the data" });
    }
    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    //compare password same or not.
     if(userLogin){
      const iMatch = await bcrypt.compare(password,userLogin.password);

      // using jwt
//       // userLogin.generateAuthToken is Return A promise So use Await.
//       const token = await userLogin.generateAuthToken();
//       console.log(token);
   
//       if (!iMatch) {
        
//         res.status(400).json({ error: "can not find user pass" });
//         //or
//         // res.status(400).json({ error: "can not find user" });
//       } else {
//         res.json({ message: "user Sigin sucessfully" });
//       }
//      }else{
//       res.json({ message: "Invalid Creditails" });
//      }

    
//   } catch (err) {
//     console.log(err);
//   }
// });
// module.exports = router;

// Store Jwt Token
      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 25982000000),
        httpOnly:true
      })
   
      if (!iMatch) {
        
        res.status(400).json({ error: "can not find user pass" });
        //or
        // res.status(400).json({ error: "can not find user" });
      } else {
        res.json({ message: "user Sigin sucessfully" });
      }
     }else{
      res.json({ message: "Invalid Creditails" });
     }

    
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;