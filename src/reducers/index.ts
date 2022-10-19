import { combineReducers } from 'redux'
import graphql from './graphql.reducer'
import user from './user.reducer'

export default combineReducers({
  graphql, user
})
