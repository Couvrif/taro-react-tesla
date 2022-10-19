import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { getToken } from '../../utils/common'

const itemList: Array<any> = [
  { title: '发现', icon: 'ico-find', code: 'index', selectedIcon: '/images/home-selected.png', link: '/pages/find/find' },
  { title: '选购', icon: 'ico-tesla', code: 'community', selectedIcon: '/images/scan-selected.png', link: '/pages/tesla/tesla' },
  { title: '商城', icon: 'ico-shop', code: 'news', selectedIcon: '/images/icon-dongtai-cur.png', link: '/pages/shop/shop' },
  // { title: '同城', icon: 'ico-city', code: 'city', selectedIcon: '/images/icon-city-cur.png', link: '/cityPages/pages/city_index' },
  { title: '地图', icon: 'ico-map', code: 'my', selectedIcon: '/images/mine-selected.png', link: '/pages/map/map' }
]


export default function Footer (props) {

  let token = ''
  getToken().then(res => {
    token = res
  })

  const { index } = props
  const curIndex = index
  const items = itemList.filter((item) => {
    const code = item['code']
    item['cur'] = (code === curIndex) ? 'cur' : ''
    return true
  })

  async function tabClick(idx) {
    const item = items[idx]
    if (token) {
      Taro.reLaunch({url: item.link})
    } else {
      if (item.link.indexOf('/pages/index/index') === -1) {
        Taro.switchTab({url: item.link})
      } else {
        Taro.reLaunch({url: item.link})
      }
    }
  }

  return (
    <View className='foot-nav clear'>
      {
        items.map((item: any, idx) => {
          return <View style='width: 25%;' key={item.code} onClick={() => tabClick(idx)} className={item.cur ? 'foot-nav-btn left cur' : 'foot-nav-btn left'} >
                  <View className={`ico-nav ${item.icon}`}></View>
                  <View className='foot-nav-p'>{item.title}</View>
                </View>
        })
      }
    </View>
  )

}

Footer.options = {
  addGlobalClass: true
}
