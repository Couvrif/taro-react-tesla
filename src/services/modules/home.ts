import api from '../../utils/api'

export const reqmain = () => {
  return api.get(`tesla`)
}

export const reqshop = () => {
  return api.get(`shop`)
}

export const reqfind = (page) => {
  return api.get(`find/${page}`)
}
