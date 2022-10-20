import { combineReducers } from 'redux'
import graphql from './graphql.reducer'
import user from './user.reducer'
import allReducer from './all.reducer'

export default combineReducers({
  graphql, user, allReducer
})
