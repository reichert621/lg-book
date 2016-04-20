export const REQUEST_PROMPTS = 'REQUEST_PROMPTS'
export const RECEIVE_PROMPTS = 'RECEIVE_PROMPTS'

function requestPrompts (endpoint) {
  return {
    type: REQUEST_PROMPTS,
    endpoint
  }
}

function receivePrompts (endpoint, json) {
  return {
    type: RECEIVE_PROMPTS,
    endpoint: endpoint,
    prompts: json.prompts,
    receivedAt: Date.now()
  }
}

export function fetchPrompts () {
  const endpoint = '/api/prompts'

  return dispatch => {
    dispatch(requestPrompts(endpoint))

    return fetch(endpoint)
      .then(res => {
        return res.json()
      }).then(json => {
        console.log(json)
        dispatch(receivePrompts(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export const REQUEST_PROMPT = 'REQUEST_PROMPT'
export const RECEIVE_NEW_PROMPT = 'RECEIVE_NEW_PROMPT'
export const RECEIVE_UPDATED_PROMPT = 'RECEIVE_UPDATED_PROMPT'
export const RECEIVE_DELETED_PROMPT = 'RECEIVE_DELETED_PROMPT'

const httpHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function requestPrompt (endpoint) {
  return {
    type: REQUEST_PROMPT,
    endpoint
  }
}

function receiveNewPrompt (endpoint, json) {
  return {
    type: RECEIVE_NEW_PROMPT,
    endpoint: endpoint,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

function receiveUpdatedPrompt (endpoint, json) {
  return {
    type: RECEIVE_UPDATED_PROMPT,
    endpoint: endpoint,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

function receiveDeletedPrompt (endpoint, json) {
  return {
    type: RECEIVE_DELETED_PROMPT,
    endpoint: endpoint,
    prompt: json.prompt,
    receivedAt: Date.now()
  }
}

export function addPrompt (body) {
  const endpoint = '/api/prompts/'

  const httpParams = {
    method: 'post',
    headers: httpHeaders,
    body: JSON.stringify(body)
  }

  return dispatch => {
    dispatch(requestPrompt(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveNewPrompt(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export function updatePrompt (id, body) {
  const endpoint = `/api/prompts/${id}`

  const httpParams = {
    method: 'put',
    headers: httpHeaders,
    body: JSON.stringify(body)
  }

  return dispatch => {
    dispatch(requestPrompt(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveUpdatedPrompt(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export function removePrompt (id) {
  const endpoint = `/api/prompts/${id}`

  const httpParams = {
    method: 'delete',
    headers: httpHeaders
  }

  return dispatch => {
    dispatch(requestPrompt(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveDeletedPrompt(endpoint, json))
      }).catch(err => console.log(err))
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
