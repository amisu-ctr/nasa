const {getAllLaunches, addNewLaunch} = require('../../models/launches.model')

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

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch

}