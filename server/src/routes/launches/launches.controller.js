const {launches,addNewLaunch,existLaunche,abortLaunchId}=require("../../models/launches.model")

function abortLaunches(req,res){
    const launchid=Number( req.params.id)
    
    if(!existLaunche){
        return res.status(404).json({
            error:"Launche not found"
        })
    };
    const aborted =abortLaunchId(launchid);
    res.status(200).json(aborted)
    
}

function getAllLaunches(req,res){
    res.status(200).json(Array.from(launches.values()))
};
function addNewLaunches(req,res){
const launch=req.body;
if(!launch.mission||!launch.rocket||!launch.launchDate||!launch.target){
    return res.status(400).json({
        error:"missing required launch property"
    })
}
launch.launchDate=new Date(launch.launchDate);
if(isNaN(launch.launchDate)){
    return res.status(400).json({
        error:"invalid launch date"
    })
}
addNewLaunch(launch);
return res.status(201).json(launch)
};
module.exports={
    getAllLaunches,
    addNewLaunches,
    abortLaunches
};