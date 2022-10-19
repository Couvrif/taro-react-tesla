import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Block } from '@tarojs/components'

export default function Navbar(props) {

  const [statusBarHeight, setStatusBarHeight] = useState(20)
  const [statusBarWidth, setStatusBarWidth] = useState(260)
  const { title, back, backUrl } = props

  const onLoad = async () => {
    let sysRes = await Taro.getSystemInfo()
    setStatusBarHeight(sysRes['statusBarHeight'] + 5)
    setStatusBarWidth(sysRes['windowWidth'])
  }
  const toHome = () => {
    Taro.reLaunch({url: '/pages/index/index'})
  }
  const goBack = async () => {
    if (backUrl) {
      await Taro.redirectTo({url: backUrl})
    } else {
      await Taro.navigateBack({
        delta: 1
      })
    }
  }

  useEffect(() => {
    onLoad()
  }, [])
  return (
    <View style={'padding-top:' + statusBarHeight + 'px;position:fixed;'} className='header'>
      <View className='header-title clear' style={'width:' + statusBarWidth + 'px;'}>
        {
          back ?
            <Block>
              <View className='back-btn left' onClick={() => goBack()} ></View>
              <View className='index-btn' onClick={() => toHome()} ></View>
              <View className='header-title-txt left' style='font-size: 16px;'>{title}</View>
            </Block>
            :
            <Block>
              <View style='left:0%;' className='index-btn' onClick={() => toHome()} ></View>
              <View style='width:100%;font-size: 16px;' className='header-title-txt left' >{title}</View>
            </Block>
        }
      </View>
    </View>
  )

}

Navbar.options = {
  addGlobalClass: true
}