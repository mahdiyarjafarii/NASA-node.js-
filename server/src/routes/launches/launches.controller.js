const {launches,addNewLaunch,existLaunche,abortLaunchId,getAllLaunchesDatabese}=require("../../models/launches.model")
const {getPagination}=require("../../../services/query")
async function abortLaunches(req,res){
    const launchid=Number( req.params.id)
    const existid= await existLaunche(launchid);
    
    if(!existid){
        return res.status(404).json({
            error:"Launche not found"
        })
    };
    
    const aborted =await abortLaunchId(launchid);
    if(!aborted){
        return res.status(400).json({
            error:"Launch not aborted"
        })
    }
    res.status(200).json({
        ok:true
    })
    
}

 async function getAllLaunches(req,res){
    const {limit,skip}=getPagination(req.query)
    res.status(200).json(await getAllLaunchesDatabese(limit,skip))
};
 async function addNewLaunches(req,res){
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
await addNewLaunch(launch);
return res.status(201).json(launch)
};
module.exports={
    getAllLaunches,
    addNewLaunches,
    abortLaunches
};