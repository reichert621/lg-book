export const REQUEST_GOALS = 'REQUEST_GOALS'
export const RECEIVE_GOALS = 'RECEIVE_GOALS'

function requestGoals (endpoint) {
  return {
    type: REQUEST_GOALS,
    endpoint
  }
}

function receiveGoals (endpoint, json) {
  return {
    type: RECEIVE_GOALS,
    endpoint: endpoint,
    goals: json.goals,
    receivedAt: Date.now()
  }
}

export function fetchGoals () {
  const endpoint = '/api/goals'

  return dispatch => {
    dispatch(requestGoals(endpoint))

    return fetch(endpoint)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveGoals(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export const REQUEST_GOAL = 'REQUEST_GOAL'
export const RECEIVE_NEW_GOAL = 'RECEIVE_NEW_GOAL'
export const RECEIVE_UPDATED_GOAL = 'RECEIVE_UPDATED_GOAL'
export const RECEIVE_DELETED_GOAL = 'RECEIVE_DELETED_GOAL'

const httpHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function requestGoal (endpoint) {
  return {
    type: REQUEST_GOAL,
    endpoint
  }
}

function receiveNewGoal (endpoint, json) {
  return {
    type: RECEIVE_NEW_GOAL,
    endpoint: endpoint,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

function receiveUpdatedGoal (endpoint, json) {
  return {
    type: RECEIVE_UPDATED_GOAL,
    endpoint: endpoint,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

function receiveDeletedGoal (endpoint, json) {
  return {
    type: RECEIVE_DELETED_GOAL,
    endpoint: endpoint,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

export function addGoal (body) {
  const endpoint = '/api/goals/'

  const httpParams = {
    method: 'post',
    headers: httpHeaders,
    body: JSON.stringify(body)
  }

  return dispatch => {
    dispatch(requestGoal(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveNewGoal(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export function updateGoal (id, body) {
  const endpoint = `/api/goals/${id}`

  const httpParams = {
    method: 'put',
    headers: httpHeaders,
    body: JSON.stringify(body)
  }

  return dispatch => {
    dispatch(requestGoal(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveUpdatedGoal(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export function removeGoal (id) {
  const endpoint = `/api/goals/${id}`

  const httpParams = {
    method: 'delete',
    headers: httpHeaders
  }

  return dispatch => {
    dispatch(requestGoal(endpoint))

    return fetch(endpoint, httpParams)
      .then(res => {
        return res.json()
      }).then(json => {
        dispatch(receiveDeletedGoal(endpoint, json))
      }).catch(err => console.log(err))
  }
}

export const actions = {
  fetchGoals,
  updateGoal,
  addGoal,
  removeGoal
}

const initialState = {
  isFetching: false,
  items: []
}

export default function goals (state = initialState, action) {
  switch (action.type) {
    case REQUEST_GOALS:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_GOALS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.goals,
        lastUpdated: action.receivedAt
      })

    case REQUEST_GOAL:
      return Object.assign({}, state, {
        isFetching: true
      })

    case RECEIVE_NEW_GOAL:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.concat(action.goal),
        lastUpdated: action.receivedAt
      })

    case RECEIVE_UPDATED_GOAL:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.map((item) => {
          if (item._id === action.goal._id) {
            return action.goal
          }
          return item
        }),
        lastUpdated: action.receivedAt
      })

    case RECEIVE_DELETED_GOAL:
      return Object.assign({}, state, {
        isFetching: false,
        items: state.items.filter((item) => {
          return (item._id !== action.goal._id)
        }),
        lastUpdated: action.receivedAt
      })

    default:
      return state
  }
}
