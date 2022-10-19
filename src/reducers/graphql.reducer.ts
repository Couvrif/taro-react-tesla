import { CITY_LIST } from '../constants/graphql.constants'

const INITIAL_STATE = {
  cityList: null,
  userInfo: null
}

const handelCityList = (state, payload) => {
  const cityList: any = []
  if (payload && payload['groups'] && payload['groups']['edges']) {
    payload['groups']['edges'].forEach((item) => {
      if (item.node) {
        cityList.push(item.node)
      }
    })
  }
  state['cityList'] = cityList
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

export default function graphql(state = INITIAL_STATE, action) {
  const data = action.payload ? action.payload : {}
  switch (action.type) {
    case CITY_LIST:
      return handelCityList(state, data)
    default:
      return state
  }
}


