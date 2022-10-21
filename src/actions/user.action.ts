import { bindActionCreators } from 'redux'
import { GET_USER_INFO, USER_LOGIN, USER_FOCUS_ORG, USER_REAL_RESULT, USER_CONTACTS, EMPTY_STATE } from '../constants/user.constants'
import store from '../store'
import { createApiAction, createAction } from './index'
import api from '../utils/api'
import * as gqlQuery from '../services/graphql_query'

export const login = createApiAction(USER_LOGIN, (data) => api.post('auth/login', data))

// export const getUserInfo = createApiAction(GET_USER_INFO, (params) => api.httpGql(gqlQuery.gqlUserInfo, params, true))

// export const getUserResidents = createApiAction(USER_FOCUS_ORG, (params) => api.httpGql(gqlQuery.gqlMyResidents, params))

// export const getUserRealResult = createApiAction(USER_REAL_RESULT, (params) => api.httpGql(gqlQuery.gqlRealName, params))

// export const getUserContacts = createApiAction(USER_CONTACTS, (params) => api.httpGql(gqlQuery.gqlUserContacts, params))

export const emptyState = createAction(EMPTY_STATE)

export default bindActionCreators({
  login,
  emptyState
  // getUserInfo,
  // getUserResidents, getUserRealResult , getUserContacts,
}, store().dispatch)
