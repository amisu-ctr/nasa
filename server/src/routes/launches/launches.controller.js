const {
  getAllLaunches,
  existsLaunchWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  // extract body properties
  const launch = req.body;

  // validate all inputs
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  // turn date into a javascript date
  launch.launchDate = new Date(launch.launchDate);

  // validate date
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  //add new launch
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);

  const existsLaunch = existsLaunchWithId(launchId)

  //if launch doesn't exist
  if (!existsLaunch) {
    return res.status(401).json({
      error: "Launch not found",
    });
  }

  //if launch does exist
  const aborted = await abortLaunchById(launchId);
  if (!aborted ) {
    return res.status(400).json({error: 'Launch not aborted'})
  }
  return res.status(200).json({ok: true});
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
