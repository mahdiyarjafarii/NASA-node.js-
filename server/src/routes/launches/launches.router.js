const express=require("express");
const {getAllLaunches,addNewLaunches,abortLaunches}=require("../launches/launches.controller")

const launchesRouter=express.Router();
launchesRouter.post("/launches",addNewLaunches);
launchesRouter.get("/launches",getAllLaunches);
launchesRouter.delete("/launches/:id",abortLaunches);
module.exports=launchesRouter;