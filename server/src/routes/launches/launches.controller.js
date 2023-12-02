const {getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    // extract body properties
    const launch = req.body

    // validate all inputs
    if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.destination) {
        return res.status(400).json({error: "Missing required launch property"})
    }
    
    // turn date into a javascript date
    launch.launchDate =   new Date(launch.launchDate)
    
    // validate date
    if(isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid launch date'
        })
    }
    
    //add new launch
    addNewLaunch(launch)
    return res.status(201).json(launch)
}


function httpAbortLaunch(req, res) {
    const launchId = Number( req.params.id);

    //if launch doesn't exist 
    if(!existsLaunchWithId(launchId)) {
        return res.status(401).json({
            error: 'Launch not found'
        })
    }

    //if launch does exist
    const aborted = abortLaunchById(launchId)
    return res.status(200).json(aborted)

}


module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}