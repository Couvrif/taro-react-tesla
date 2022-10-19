const globalData = {
  baseUrl: '',
  apiBaseUrl: '',
  graphqlBaseUrl: '',
  token: '',
}


export function set(key, val) {
  globalData[key] = val
}

export function get(key) {
  return globalData[key]
}