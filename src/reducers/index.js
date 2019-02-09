
import { combineReducers } from 'redux'
import grids from './grid'
import app from './app'

// combine reducers to build the state
const appReducer = combineReducers({
  grids,
  app
})

export default appReducer
