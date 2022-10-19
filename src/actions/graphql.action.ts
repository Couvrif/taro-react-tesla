import { bindActionCreators } from 'redux'
import { CITY_LIST } from '../constants/graphql.constants'
import store from '../store'
import { createApiAction } from './index'
import api from '../utils/api'
import * as gqlQuery from '../services/graphql_query'

export const cityList = createApiAction(CITY_LIST, (params) => api.httpGql(gqlQuery.gqlCityList, params, true))

export default bindActionCreators({ cityList }, store.dispatch)