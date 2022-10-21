import { GraphQLClient } from 'graphql-request'
import Taro from '@tarojs/taro'
import gql from 'wxapp-graphql'
import { get as getGlobalData } from './global_data'
import { baseUrl } from './config'
import { getCurrentPageUrl } from './common'

const constantToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTM2NTY3ODF9.3Qr7EVQOIvVmXeIFDInV8m4DZ43VZeoCGU1f237fOKA'

export default {
  baseOptions(params, method) {
    let { url, data } = params
    console.log('params', params)
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    const option = {
      url: url.indexOf('http') !== -1 ? url : `${baseUrl}/${url}`,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': `Bearer ${getGlobalData('token')}`
      }
    }
    return Taro.request(option)
  },
  get(url, data?: any) {
    const option = { url, data }
    return this.baseOptions(option)
  },
  post(url, data, contentType?: string) {
    const params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data?: any) {
    const option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data?: any) {
    const option = { url, data }
    return this.baseOptions(option, 'DELETE')
  },
  httpGql(query = ``, variables = {}, useContantToken = false) {
    let token = getGlobalData('token')
    if (useContantToken) {
      token = constantToken
    } else if (!token) {
      const path = getCurrentPageUrl()
      Taro.redirectTo({
        url: `/pages/login/get_wechat_phone?url=${path}`
      })
    }
    const header = {
      'Authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    }
    const requestUrl = `${baseUrl}/graphql`
    let result = {}
    if (process.env.TARO_ENV === 'h5') {
      const graphQLClient = new GraphQLClient(requestUrl, {
        headers: header
      })
      result = graphQLClient.request(query, variables)
    } else {
      const GraphQL = gql.GraphQL
      const graphql = GraphQL({
        url: requestUrl,
        header: header
      }, true)
      result = graphql.query({
        query: query,
        variables: variables
      })
    }
    return result
  }
}
