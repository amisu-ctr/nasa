const API_URL = 'http://localhost:4444/v1'

async function httpGetPlanets() {
  const response = (await fetch(`${API_URL}/planets`)).json()
  return response
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/launches`)
  // Load launches, sort by flight number, and return as JSON.
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - a.flightNumber;
  })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
 try {
  return await fetch(`${API_URL}/launches`, {
    method: 'post',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(launch)
  })
 } catch(err) {
  return {
    ok: false,
  }
 }
  // Submit given launch data to launch system.
}

  // Delete launch with given ID.
async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: 'delete'
    })
   } catch(err) {
    console.log(err)
    return {
      ok: false,
    }
   }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};