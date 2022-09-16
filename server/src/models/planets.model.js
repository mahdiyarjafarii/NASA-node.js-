const {parse} = require('csv-parse');
const path=require("path")
const fs = require('fs');
const planets=require("../models/planets.mongo")



function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};
function loadPlanetsData(){
 return new Promise((resolve,reject)=>{

  fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data',  async (data) => {
    if (isHabitablePlanet(data)) {
      savePlanets(data)
      // habitablePlanets.push(data);
    }
  })
  .on('error', (err) => {
    console.error(err);
    reject(err)
  })
  .on('end', async () => {
    const currentPlanets=(await getAllPlanetsData())
    
    console.log(`${currentPlanets.length} habitable planets found!`);
    resolve();
  });
 }) 
}

async function getAllPlanetsData(){
  return await planets.find({})
};
async function savePlanets(planet){
  try{
    await planets.updateOne({
      keplerName:planet.kepler_name
    },
    { 
      keplerName:planet.kepler_name
    },{
      upsert:true,
    })
  }catch(err){
    console.log(err)

  }
  
}


module.exports={
    
    loadPlanetsData,
    getAllPlanetsData
}