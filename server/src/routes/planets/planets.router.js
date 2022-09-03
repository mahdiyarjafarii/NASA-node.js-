const { getAllPlanets }=require("../../routes/planets/planets.controller")
const express=require("express");
const planetsRouter=express.Router();
planetsRouter.get("/planets",getAllPlanets);
module.exports=planetsRouter;