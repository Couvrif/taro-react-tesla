import { GET_USER_INFO, USER_LOGIN, USER_FOCUS_ORG, USER_REAL_RESULT, USER_CONTACTS, EMPTY_STATE } from '../constants/user.constants'
import { baseUrl } from '../utils/config'

const INITIAL_STATE = {
  cityList: null,
  userInfo: null,
  loginInfo: {
    isBinded: 1
  },
  myResidents: null,
  realResult: null
}

const handelUserInfo = (state, payload) => {
  let userInfo = payload['wechat_user']
  if (!!userInfo.extra && !!userInfo.extra.avatar && (userInfo.extra.avatar.indexOf('https://') === -1) && (userInfo.extra.avatar.indexOf('http://') === -1)) {
    userInfo.extra.avatar = `${baseUrl}${userInfo.extra.avatar}&type=sm`
  }
  state['userInfo'] = userInfo
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

const handelLogin = (state, payload) => {
  console.log('payload', payload)
  state['loginInfo'] = {
    code: payload ? payload.code : 1,
    token: payload.token
  }
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

const handelUserResidents = (state, payload) => {
  let residents = payload['my_residents']['edges']
  let list: any = []
  residents.forEach(item => {
    let group = item['node']['group']
    if (!!group && !!group.logos && group.logos.length > 0) {
      if (group.logos[0].url.indexOf('https://') === -1 && group.logos[0].url.indexOf('http://') === -1) {
        group['logo'] = `${baseUrl}${group.logos[0].url}&type=sm`
      }
    }
    list.push(group)
  })
  state['myResidents'] = list
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

const handelUserRealResult = (state, payload) => {
  let res = payload['pReal_name']
  state['realResult'] = !!res ? res.result : null
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

const handelUserContacts = (state, payload) => {
  state['userContacts'] = payload['user_contacts'] || []
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

const handelState = (state) => {
  state['userInfo'] = {}
  state['loginInfo'] = { code : 1}
  state['userContacts'] = []
  state['myResidents'] = []
  state['realResult'] = null
  const newState = JSON.parse(JSON.stringify({...state}))
  return newState
}

export default function user(state = INITIAL_STATE, action) {
  const data = action.payload ? action.payload : {}
  switch (action.type) {
    case GET_USER_INFO:
      return handelUserInfo(state, data)
    case USER_LOGIN:
      return handelLogin(state, data)
    case USER_FOCUS_ORG:
      return handelUserResidents(state, data)
    case USER_REAL_RESULT:
      return handelUserRealResult(state, data)
    case USER_CONTACTS:
      return handelUserContacts(state, data)
    case EMPTY_STATE:
      return handelState(state)
    default:
      return state
  }
}


