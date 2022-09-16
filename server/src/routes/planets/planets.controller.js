const {planets}=require("../../models/planets.model")
const {getAllPlanetsData}=require("../../models/planets.model")

 async function getAllPlanets(req,res){
  console.log('hit');
  return res.status(200).json(await getAllPlanetsData())
};
module.exports={
  getAllPlanets
};