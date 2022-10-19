import React, { useState, useEffect, useRef } from 'react'
import Taro, { usePageScroll, useShareAppMessage, useDidShow } from '@tarojs/taro'
import { useRouter } from 'taro-hooks'
import { View, Swiper, Block, SwiperItem, Image, Input } from '@tarojs/components'
import { useStore } from 'react-redux'
import * as other from '../../services/other.services'
import { get as getGlobalData} from '../../utils/global_data'
import { showToast } from '../../utils/message'
import './find.less'
import Footer from '@/components/common/footer'
import { baseUrl } from '../../utils/config'
import BackTop from '../../components/common/back_top'

export default function Index() {

  // 使用redux的store(H5无法使用useStore)
  const store = useStore()
  const state = store.getState()
  const userInfo = state.user.userInfo


  const router = useRouter()
  const height = getGlobalData('statusBarHeight') || 40
  const statusBarHeight = height
  const [articleList, setArticleList]: Array<any> = useState([])
  const [curLocation, setCurLocation] = useState('')
  const [showTop, setShowTop] = useState(false)
  const [helloText, setHelloText] = useState('')

  // 这个页面上的全局变量，但是又不在html上面展示的
  const currentRef = useRef(0)

  // 页面点击事件
  /**
   * param可以是any
   * @param param
   */
  const pageClick = (param) => {
    console.log('页面点击事件的参数可以是any', param)
    showToast('页面点击事件')
    if (param === '同望科技') {
      setCurLocation(param)
    } else if (param === true) {
      setCurLocation("小程序")
    }
  }

  // 页面输入事件
  const pageInput = (e) => {
    console.log(e)
  }

  // 调用restfulAPI示例
  const postData = async() => {
    const body = {
      id: '',
      name: ''
    }
    let res = await other.postMethod(body)
    if (res['code'] === 0) {
      showToast('postSuccess')
    } else {
      showToast('postError:', res['msg'])
    }
  }

  // 通过graphQL获取数据方法
  const loadArticle = async () => {
    let articleParam = {
      page: 1,
      rows: 5,
      org_id: ''
    }
    let res = await other.loadArticle(articleParam)
    let articleList = res['navigation_bars'] ? res['navigation_bars']['edges'] : []
    let showList: any = []
    if (articleList.length > 0) {
      articleList.forEach(item => {
        let status = item.node.status
        if (status === 1) {
          showList.push(item)
        }
      })
    }
    return showList
  }

  // 页面滚动事件
  usePageScroll(res => {
    const scrollTop = res.scrollTop
    setShowTop(scrollTop > 500)
  })

  // 分享(H5无法使用分享方法)
  useShareAppMessage(res => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '人人优佳',
      path: '/pages/index/index'
    }
  })

  // onShow事件
  useDidShow(() => { })

  const onload = async () => {
    if (process.env.TARO_ENV === 'weapp') {
      setHelloText('微信小程序')
    } else if (process.env.TARO_ENV === 'h5') {
      setHelloText('H5')
    }
    // async/await 写法
    let list = await loadArticle()
    let articleList: any = []
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].node.pics.length > 0) {
          for (let j = 0; j < list[i].node.pics.length; j++) {
            list[i].node.pics[j].url = `${baseUrl}${list[i].node.pics[j].url}&type=lg`
          }
        }
        articleList.push(list[i].node)
      }
    }
    setArticleList([...articleList])
    // .then写法
    // loadArticle().then(article => {
    //   let articleList: any = []
    //   if (article.length > 0) {
    //     for (let i = 0; i < article.length; i++) {
    //       if (article[i].node.pics.length > 0) {
    //         for (let j = 0; j < article[i].node.pics.length; j++) {
    //           article[i].node.pics[j].url = `${baseUrl}${article[i].node.pics[j].url}&type=lg`
    //         }
    //       }
    //       articleList.push(article[i].node)
    //     }
    //   }
    //   setArticleList([...articleList])
    // })
  }

  useEffect(() => {
    onload()
  }, [])

  // html
  return (
    <View>
      <View className='content' style='background: #fff;'>
        <View style={`padding-top:${statusBarHeight + 5}Px;position:fixed;width:100%;left:0Px;padding-left:10Px;`} className='header' onClick={() => pageClick('同望科技')} >
          <View className='header-main'>{curLocation || '珠海市'}</View>
        </View>
        <View className='head-search clear' style={`margin-top:${statusBarHeight + 45}Px;`}>
          <Input className='input-search left' style='width:90%;' onInput={pageInput.bind(this)} placeholder='请输入关键字查询' type='text' />
          <View className='icon-message right ' onClick={() => pageClick({ a: 1 })}>
            <Image className='img' src={require('../../assets/images/icon-message.png')} style='width:20Px;height:20Px;' />
          </View>
        </View>
        <View className='roll-banner'>
          <Swiper style='height:160Px' indicator-dots='true' autoplay interval={5000} duration={500} circular>
            {
              articleList && articleList.map((item) => {
                return (
                  <SwiperItem key={item.id}>
                    <Image src={item.pics[0].url} mode='widthFix' className='image' onClick={() => pageClick(item)} />
                  </SwiperItem>
                )
              })
            }
          </Swiper>
        </View>
        <View className='container-content no-padding-bottom'>
          <View className='activity-box' style='background:#FFF;'>
            <View className='activity-content'>
              <View className='no-activity'>
                <Image style='width:178Px;height:77Px;' src={require('../../assets/images/no-data.jpg')} className='image' />
                <Block>
                  <View className='no-activity-txt'>你好, 这是</View>
                  <View className='no-activity-txt-blue' onClick={() => pageClick(true)}>{helloText}</View>
                  <View className='no-activity-txt'>开发环境</View>
                </Block>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* 自定义组件 */}
      {
        showTop &&
        <BackTop></BackTop>
      }
      <Footer index='index'></Footer>
    </View>
  )
}
