import React, { useCallback } from "react";
import { View, Text, Button, Image,Swiper,SwiperItem } from "@tarojs/components";

import './slide.less'

const Slide = (props) => {

  const { rotationImg }=props

  return (
    <View className="wrapper">
      <Swiper
        className='swiper'
        indicatorColor='#999999'
        indicatorActiveColor='#ffffff'
        circular
        indicatorDots
        >
          {
            rotationImg.length > 0 &&
            rotationImg.map(item => {
              return <SwiperItem>
                <View className="item_contain">
                  <Image src={item.picUrl}></Image>
                  <View className="item_content">
                    <View className="item_desc">
                      <View><Text className="big">{item.battery + '  '}</Text>公里</View>
                      <View>续航里程（预估）</View>
                    </View>
                    <View className="item_desc">
                      <View><Text className="big">{item.speedUp + '  '}</Text>秒</View>
                      <View>百公里加速*</View>
                    </View>
                    <View className="item_desc">
                      <View><Text className="big">{item.higtSpeed + '  '}</Text>公里/小时</View>
                      <View>最高车速+</View>
                    </View>
                  </View>
                </View>
              </SwiperItem>
            })
          }
      </Swiper>
    </View>
  );
};

export default Slide;
