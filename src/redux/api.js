const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const DELETE = 'DELETE'

const httpHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const defaultHttpParams = {
  method: GET,
  httpHeaders: httpHeaders
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    let error = new Error(response.statusText)
    error.response = response

    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

function fetchAndParse (endpoint, httpParams = defaultHttpParams) {
  console.log(httpParams.method, endpoint)
  return fetch(endpoint, httpParams)
    .then(checkStatus)
    .then(parseJSON)
}

// Entries

export function fetchEntries () {
  const endpoint = '/api/entries'

  return fetchAndParse(endpoint)
}

export function fetchEntry (dateId) {
  const endpoint = `/api/entries/${dateId}`

  return fetchAndParse(endpoint)
}

export function updateEntry (id, params) {
  const endpoint = `/api/entries/${id}`
  const httpParams = {
    method: PUT,
    headers: httpHeaders,
    body: JSON.stringify(params)
  }

  return fetchAndParse(endpoint, httpParams)
}

// Prompts

export function fetchPrompts () {
  const endpoint = '/api/prompts'

  return fetchAndParse(endpoint)
}

export function addPrompt (params) {
  const endpoint = '/api/prompts'
  const httpParams = {
    method: POST,
    headers: httpHeaders,
    body: JSON.stringify(params)
  }

  return fetchAndParse(endpoint, httpParams)
}

export function updatePrompt (id, params) {
  const endpoint = `/api/prompts/${id}`
  const httpParams = {
    method: PUT,
    headers: httpHeaders,
    body: JSON.stringify(params)
  }

  return fetchAndParse(endpoint, httpParams)
}

export function removePrompt (id) {
  const endpoint = `/api/prompts/${id}`
  const httpParams = {
    method: DELETE,
    headers: httpHeaders
  }

  return fetchAndParse(endpoint, httpParams)
}

// Goals

export function fetchGoals () {
  const endpoint = '/api/goals'

  return fetchAndParse(endpoint)
}

export function addGoal (params) {
  const endpoint = '/api/goals'
  const httpParams = {
    method: POST,
    headers: httpHeaders,
    body: JSON.stringify(params)
  }

  return fetchAndParse(endpoint, httpParams)
}

export function updateGoal (id, params) {
  const endpoint = `/api/goals/${id}`
  const httpParams = {
    method: PUT,
    headers: httpHeaders,
    body: JSON.stringify(params)
  }

  return fetchAndParse(endpoint, httpParams)
}

export function removeGoal (id) {
  const endpoint = `/api/goals/${id}`
  const httpParams = {
    method: DELETE,
    headers: httpHeaders
  }

  return fetchAndParse(endpoint, httpParams)
}
