import * as constants from "../constants/all.constants";
import { bindActionCreators } from "redux";
import store from '../store'
import { createApiAction, createAction } from ".";
import { reqshop, reqfind, reqmain } from '@/services/modules/home'

export const getShopDataAction = createApiAction(constants.GET_SHOP_DATA, reqshop())
export const getFindDataAction = createApiAction(constants.GET_FIND_DATA, (page) => reqfind(page))
export const getTeslaDataAction = createApiAction(constants.GET_TESLA_DATA, reqmain())

export const changeColorAction = createAction(constants.GET_COLOR_INDEX)
export const changeWheelAction = createAction(constants.GET_WHEEL_INDEX)

export default bindActionCreators({
  getShopDataAction, getFindDataAction, getTeslaDataAction, changeColorAction, changeWheelAction
}, store().dispatch)
