export const REQUEST_ENTRIES = 'REQUEST_ENTRIES'
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const RECEIVE_FAILED = 'RECEIVE_FAILED'

import * as API from '../api'

function receiveFailure (error) {
  return {
    type: RECEIVE_FAILED,
    error
  }
}

function requestEntries () {
  return {
    type: REQUEST_ENTRIES
  }
}

function receiveEntries (json) {
  return {
    type: RECEIVE_ENTRIES,
    entries: json.entries,
    receivedAt: Date.now()
  }
}

export function fetchEntries () {
  return dispatch => {
    dispatch(requestEntries())

    API.fetchEntries().then(
      json => dispatch(receiveEntries(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

export const REQUEST_ENTRY = 'REQUEST_ENTRY'
export const RECEIVE_ENTRY = 'RECEIVE_ENTRY'

function requestEntry () {
  return {
    type: REQUEST_ENTRY
  }
}

function receiveEntry (json) {
  return {
    type: RECEIVE_ENTRY,
    entry: json.entry,
    receivedAt: Date.now()
  }
}

export function fetchEntry (dateId) {
  return dispatch => {
    dispatch(requestEntry())

    API.fetchEntry(dateId).then(
      json => dispatch(receiveEntry(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

export function updateEntry (id, params) {
  return dispatch => {
    dispatch(requestEntry())

    API.updateEntry(id, params).then(
      json => dispatch(receiveEntry(json)),
      error => dispatch(receiveFailure(error))
    )
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
  updateEntry,
  editEntry
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
