import * as constants from "../constants/all.constants";

const INITIAL_STATE = {
  findData: [],
  shopData: [],
  teslaData: [],
  colorIndex: 0,
  wheelIndex: 0
}

export default function reducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.GET_SHOP_DATA:
      return { ...state, shopData: action.payload }
    case constants.GET_FIND_DATA:
      return { ...state, findData: action.payload }
    case constants.GET_TESLA_DATA:
      return { ...state, teslaData: action.payload }
    case constants.GET_COLOR_INDEX:
      return { ...state, colorIndex: action.payload }
    case constants.GET_WHEEL_INDEX:
      console.log('action', action);
      return { ...state, wheelIndex: 12 }
    default:
      return state
  }
}
