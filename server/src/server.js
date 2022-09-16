const http=require("http");
require('dotenv').config();
const mongoose=require("mongoose")
const PORT=8000;
const MONGO_URL=process.env.MONGO_URL
const app=require("../src/app");
const {loadPlanetsData}=require("../src/models/planets.model")
const server=http.createServer(app);
const {loadLaunchesData}=require("../src/models/launches.model")



mongoose.connection.once("open",()=>{
    console.log("conection is ready...");
})
mongoose.connection.on("error",(err)=>{
    console.log(err)
})

 async function startServer(){
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    await loadLaunchesData();
    server.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
}
startServer();

// const express = require('express')
// const app=require("../src/app");
// // const app = express()
// const port = 3000


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })