function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response

    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

export function fetchGoals () {
  const endpoint = '/api/goals'

  return fetch(endpoint)
    .then(checkStatus)
    .then(parseJSON)
}
