export const REQUEST_ENTRIES = 'REQUEST_ENTRIES'
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'

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

function requestEntries (endpoint) {
  return {
    type: REQUEST_ENTRIES,
    endpoint
  }
}

function receiveEntries (endpoint, json) {
  return {
    type: RECEIVE_ENTRIES,
    endpoint: endpoint,
    entries: json.entries,
    receivedAt: Date.now()
  }
}

export function fetchEntries () {
  const endpoint = '/api/entries'

  return dispatch => {
    dispatch(requestEntries(endpoint))

    return fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        dispatch(receiveEntries(endpoint, json))
      })
      .catch(console.log)
  }
}

export const REQUEST_ENTRY = 'REQUEST_ENTRY'
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY'

const httpHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function requestEntry (endpoint) {
  return {
    type: REQUEST_ENTRY,
    endpoint
  }
}

function receiveEntry (endpoint, json) {
  return {
    type: RECEIVE_ENTRY,
    endpoint: endpoint,
    entry: json.entry,
    receivedAt: Date.now()
  }
}

export function fetchEntry (dateId) {
  const endpoint = `/api/entries/${dateId}`
  const httpParams = {
    method: 'get',
    headers: httpHeaders
  }

  return dispatch => {
    dispatch(requestEntry(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => res.json())
      .then(json => {
        dispatch(receiveEntry(endpoint, json))
      })
      .catch(err => console.log(err))
  }
}

export function updateEntry (id, body) {
  const endpoint = `/api/entries/${id}`

  const httpParams = {
    method: 'put',
    headers: httpHeaders,
    body: JSON.stringify(body)
  }

  return dispatch => {
    dispatch(requestEntry(endpoint))

    return fetch(endpoint, httpParams)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => {
        dispatch(receiveEntry(endpoint, json))
      })
      .catch(err => console.log(err))
  }
}

export const EDIT_ENTRY = 'EDIT_ENTRY'

export function editEntry (entry, params) {
  return {
    type: EDIT_ENTRY,
    receivedAt: Date.now(),
    entry: Object.assign({}, entry, params)
  }
}

export const actions = {
  fetchEntries,
  fetchEntry,
  updateEntry
}

const initialState = {
  isFetching: false,
  items: []
}

export default function entries (state = initialState, action) {
  switch (action.type) {
    case REQUEST_ENTRIES:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_ENTRIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.entries,
        lastUpdated: action.receivedAt
      })

    case REQUEST_ENTRY:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_ENTRY:
    case EDIT_ENTRY:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.entry,
        lastUpdated: action.receivedAt
      })

    default:
      return state
  }
}
