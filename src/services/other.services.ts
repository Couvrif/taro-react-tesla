import api from '../utils/api'
import { gqlArcticle } from './graphql_query'

// graphQL请求示例
export const loadArticle = (params) => {
  return api.httpGql(gqlArcticle, params, true)
}

// post示例
export const postMethod = (body) => {
  return api.post(`xxx/xxx`, body)
}

// put示例
export const putMethod = (body) => {
  return api.put(`xxx/xxx/${body.id}`)
}

// get示例
export const getMethod = (body) => {
  return api.get(`xxx/xxx/${body.id}`)
}

// delete示例
export const deleteMethod = (id) => {
  return api.delete(`xxx/xxx/${id}`)
}
