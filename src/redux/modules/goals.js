export const REQUEST_GOALS = 'REQUEST_GOALS'
export const RECEIVE_GOALS = 'RECEIVE_GOALS'
export const RECEIVE_FAILED = 'RECEIVE_FAILED'

import * as API from '../api'

function receiveFailure (error) {
  return {
    type: RECEIVE_FAILED,
    error
  }
}

function requestGoals () {
  return {
    type: REQUEST_GOALS
  }
}

function receiveGoals (json) {
  return {
    type: RECEIVE_GOALS,
    goals: json.goals,
    receivedAt: Date.now()
  }
}

export function fetchGoals () {
  return dispatch => {
    dispatch(requestGoals())

    API.fetchGoals().then(
      json => dispatch(receiveGoals(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

export const REQUEST_GOAL = 'REQUEST_GOAL'
export const RECEIVE_NEW_GOAL = 'RECEIVE_NEW_GOAL'
export const RECEIVE_UPDATED_GOAL = 'RECEIVE_UPDATED_GOAL'
export const RECEIVE_DELETED_GOAL = 'RECEIVE_DELETED_GOAL'

// const httpHeaders = {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// }

function requestGoal () {
  return {
    type: REQUEST_GOAL
  }
}

function receiveNewGoal (json) {
  return {
    type: RECEIVE_NEW_GOAL,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

export function addGoal (params) {
  return dispatch => {
    dispatch(requestGoal())

    API.addGoal(params).then(
      json => dispatch(receiveNewGoal(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

function receiveUpdatedGoal (json) {
  return {
    type: RECEIVE_UPDATED_GOAL,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

export function updateGoal (id, params) {
  return dispatch => {
    dispatch(requestGoal())

    API.updateGoal(id, params).then(
      json => dispatch(receiveUpdatedGoal(json)),
      error => dispatch(receiveFailure(error))
    )
  }
}

function receiveDeletedGoal (json) {
  return {
    type: RECEIVE_DELETED_GOAL,
    goal: json.goal,
    receivedAt: Date.now()
  }
}

export function removeGoal (id) {
  return dispatch => {
    dispatch(requestGoal())

    API.removeGoal(id).then(
      json => dispatch(receiveDeletedGoal(json)),
      error => dispatch(receiveFailure(error))
    )
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
