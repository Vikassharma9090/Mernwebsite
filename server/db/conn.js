const mongoose = require('mongoose');
//database connection start.
// const DB = 'mongodb+srv://vikas:vikas9090@cluster0.ipptd.mongodb.net/mernstacks?retryWrites=true&w=majority';

const DB = process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false

}).then(()=>{
    console.log('connection Sucessful');
}).catch((err)=> console.log('no connection'));

// databse connection end.