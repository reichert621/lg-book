export const REQUEST_PROMPTS = 'REQUEST_PROMPTS'
export const RECEIVE_PROMPTS = 'RECEIVE_PROMPTS'
export const RECEIVE_FAILED = 'RECEIVE_FAILED'

import * as API from '../api'

function receiveFailure (error) {
  return {
    type: RECEIVE_FAILED,
    error
  }
}

function requestPrompts () {
  return {
    type: REQUEST_PROMPTS
  }
}

function receivePrompts (json) {
  return {
    type: RECEIVE_PROMPTS,
    prompts: json.prompts,
    receivedAt: Date.now()
  }
}

export function fetchPrompts () {
  return dispatch => {
    dispatch(requestPrompts())

    API.fetchPrompts().then(
      json => dispatch(receivePrompts(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

export const REQUEST_PROMPT = 'REQUEST_PROMPT'
export const RECEIVE_NEW_PROMPT = 'RECEIVE_NEW_PROMPT'
export const RECEIVE_UPDATED_PROMPT = 'RECEIVE_UPDATED_PROMPT'
export const RECEIVE_DELETED_PROMPT = 'RECEIVE_DELETED_PROMPT'

function requestPrompt () {
  return {
    type: REQUEST_PROMPT
  }
}

function receiveNewPrompt (json) {
  return {
    type: RECEIVE_NEW_PROMPT,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

export function addPrompt (params) {
  return dispatch => {
    dispatch(requestPrompt())

    API.addPrompt(params).then(
      json => dispatch(receiveNewPrompt(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

function receiveUpdatedPrompt (json) {
  return {
    type: RECEIVE_UPDATED_PROMPT,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

export function updatePrompt (id, params) {
  return dispatch => {
    dispatch(requestPrompt())

    API.updatePrompt(id, params).then(
      json => dispatch(receiveUpdatedPrompt(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

function receiveDeletedPrompt (json) {
  return {
    type: RECEIVE_DELETED_PROMPT,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

export function removePrompt (id) {
  return dispatch => {
    dispatch(requestPrompt())

    API.removePrompt(id).then(
      json => dispatch(receiveDeletedPrompt(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

export const TOGGLE_EDIT_PROMPT = 'TOGGLE_EDIT_PROMPT'

export function toggleEdit (id) {
  return {
    type: TOGGLE_EDIT_PROMPT,
    id
  }
}

export const actions = {
  fetchPrompts,
  updatePrompt,
  addPrompt,
  removePrompt,
  toggleEdit
}

const initialState = {
  isFetching: false,
  items: []
}

export default function prompts (state = initialState, action) {
  switch (action.type) {
    case REQUEST_PROMPTS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_PROMPTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.prompts,
        lastUpdated: action.receivedAt
      })

    case REQUEST_PROMPT:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_NEW_PROMPT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(action.prompt),
        lastUpdated: action.receivedAt
      })

    case RECEIVE_UPDATED_PROMPT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map((item) => {
          if (item._id === action.prompt._id) {
            return action.prompt
          }
          return item
        }),
        lastUpdated: action.receivedAt
      })

    case RECEIVE_DELETED_PROMPT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter((item) => {
          return (item._id !== action.prompt._id)
        }),
        lastUpdated: action.receivedAt
      })

    case TOGGLE_EDIT_PROMPT:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map((item) => {
          if (item._id === action.id) {
            item.editing = !item.editing
          }
          return item
        })
      })

    default:
      return state
  }
}
