 const mongoose = require('mongoose')


  let connectDB = async () =>{
    await mongoose.connect(process.env.mongo_url)
    .then(()=>console.log("Connected to db"))
    .catch(()=> console.log("failed to connect to db"))
  }


module.exports=connectDB