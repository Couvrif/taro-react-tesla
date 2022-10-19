import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

export default function BackTop () {


  const toTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  }

  return (
    <View>
      <View style='bottom:15%;' onClick={() => toTop()} className='back-top'></View>
    </View>
  )

}

BackTop.options ={
  addGlobalClass: true
}