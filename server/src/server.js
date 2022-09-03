const http=require("http");
const PORT=8000;
const app=require("../src/app");
const {loadPlanetsData}=require("../src/models/planets.model")
const server=http.createServer(app);
 async function startServer(){
    await loadPlanetsData();
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