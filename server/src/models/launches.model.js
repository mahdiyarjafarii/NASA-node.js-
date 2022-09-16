
const launchesDataBase=require("../models/launches.mongo")
const planets=require("../models/planets.mongo")
const axios=require("axios")




let DEFUALT_FLIGHT_NUMBER=100;
 const launch={
    flightNumber:100,
    mission:"kepler exploration x",
    rocket:"Explorer IS1",
    launchDate:new Date('Decembae27,2030'),
    target:'salam',
    customers:["ztm","NASA"],
    upcoming:true,
    success:true
};




async function abortLaunchId(id){
    const aborted=await launchesDataBase.updateOne({
        flightNumber:id
    },{
        upcoming:false,
        success:false,
    })
    return aborted.ok===1 && aborted.mModified===1;

}

async function existLaunche(id){
    return await launchesDataBase.findOne({
        flightNumber:id
    })
};

async function getAllLaunchesDatabese(skip,limit){
    return await launchesDataBase.find({},{_id:0,__v:0}) 
    .skip(skip).limit(limit) 
}


async function saveLaunch(launch){
    const planet=planets.findOne({
        keplerName:launch.target
    })
    if(!planet){
        throw new Error("no matching palent found..")
    }
    await launchesDataBase.findOneAndUpdate({
        flightNumber:launch.flightNumber
    },launch,{
        upsert:true,
    })
}
saveLaunch(launch);

const SPACE_URL_API="https://api.spacexdata.com/v4/launches/query"
async function loadLaunchesData(){
    console.log("downloading launch data...");
      const response=await axios.post(SPACE_URL_API,
        {
            query:{},
            Option:{
                // pagination:false,
                limit: 20,
                populate:[
                    {
                        path:"rocket",
                        select:{
                            name:1
                        }
                    },
                    {
                        path:"payloads",
                        select:{
                            "customers":1
                        }
                    }
                ]
            }
        }
        );
   const launchDocs=response.data.docs;
   for(const launchDoc of launchDocs){
    const payloads=launchDoc['payloads'];
    const customers=payloads.flatMap((payload)=>{
        return payload["customrs"]
    })


    const launch={
        flightNumber:launchDoc["flight_number"],
        mission:launchDoc["name"],
        rocket:launchDoc['rocket'] ['name'],
        launchDate:launchDoc["data_local"],
        upcoming:launchDoc["upcoming"],
        success:launchDoc['success'],
        customers
    }
    console.log(`${launch.flightNumber} ${launch.success}`)
    await saveLaunch(launch)
   }     

}

async function getLeastFlightNumber(){
    const latestLaunch=await launchesDataBase
    .findOne().sort("-flightNumber") 

    if(!latestLaunch){
        return DEFUALT_FLIGHT_NUMBER
    }

    return latestLaunch.flightNumber

}

async function addNewLaunch(launch){
    const latestnumber=await getLeastFlightNumber()+1;
    const newLaunch=Object.assign(launch,{
        upcoming:true,
        success:true,
        customer:["ztm","NASA"],        
        flightNumber:latestnumber
    });
    await saveLaunch(newLaunch)
}


module.exports={
    addNewLaunch,
    existLaunche,
    abortLaunchId,
    getAllLaunchesDatabese,
    loadLaunchesData
};