import React, { useState, useEffect, useRef } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, ScrollView } from '@tarojs/components'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import './find.less'
import allAction from '../../actions/all.action'

export default function Index() {

  const { findData } = useSelector<any, any>(state => ({ findData: state.allReducer.findData }),shallowEqual)

  // 页面滚动事件
  // usePageScroll(res => {
  //   const scrollTop = res.scrollTop
  //   setShowTop(scrollTop > 500)
  // })

  console.log(findData,'弗老大');

  // onShow事件
  useDidShow(() => { })

  const [currentPage,setCurrentPage]=useState(1)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(allAction.getFindDataAction(currentPage))
  }, [])

  const scrollStyle = {
    height: '500px'
  }
  const scrollTop = 0
  const Threshold = 20

  const onScrollToUpper=()=> { }

  // or 使用箭头函数
  // onScrollToUpper = () => {}

  const onScroll=(e)=>{
    console.log(e.detail)
  }

  // html
  return (
    <View className='find_content'>
      <View className="title_img">
        <Image mode='widthFix' src='https://china-community-app.tesla.cn/community-media/de6f422a-4c62-4a90-a5b0-c7460783bf4b.png' />
      </View>
      <ScrollView
        className='scrollview'
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScrollToUpper={e => onScrollToUpper()} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        onScroll={e=>onScroll(e)}
      >
      <View className='find_list'>
        {
          findData.length > 0 && findData.map(item => {
            return (
              <View className='list_item' key={item.id}>
                <View className='list_left'>
                  <View className='list_title'>{item.title}</View>
                  <View className='list_data'>{item.date}</View>
                </View>
                <View className='list_right'>
                  <Image src={item.picUrl}></Image>
                </View>
              </View>
            )
          })
        }
        </View>
      </ScrollView>
    </View>
  )
}
