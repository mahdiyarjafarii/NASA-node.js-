const launches= new Map();
let lastFlightNumber=100;
 const launch={
    flightNumber:100,
    mission:"kepler exploration x",
    rocket:"Explorer IS1",
    launchDate:new Date('Decembae27,2030'),
    target:'kepler-442 b',
    customer:["ztm","NASA"],
    upcoming:true,
    success:true
};

launches.set(launch.flightNumber,launch);



function abortLaunchId(id){
   const aborted= launches.get(id);
   aborted.upcoming=false;
   aborted.success=false;
    return aborted;
}

function existLaunche(id){
    return launches.has(id)
};


function addNewLaunch(launch){
lastFlightNumber++;
launches.set(
    lastFlightNumber,
    Object.assign(launch,{
        upcoming:true,
        success:true,
        customer:["ztm","NASA"],        
        flightNumber:lastFlightNumber
    })
)
};
module.exports={
    launches,
    addNewLaunch,
    existLaunche,
    abortLaunchId
};