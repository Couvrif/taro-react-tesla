import React, { useCallback, useEffect } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import { useEnv, useNavigationBar, useModal, useToast } from "taro-hooks";
import allAction from '../../actions/all.action'
import './tesla.less'
import { useDispatch, useSelector } from "react-redux";
import Slide from "@/components/slide/slide";

const Index = () => {
  const [_, { setTitle }] = useNavigationBar({ title: "TESLA" });

  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(allAction.getTestAction())
  }, [])

  const { teslaData, colorIndex } = useSelector<any, any>((state) => ({ teslaData: state.allReducer.teslaData, colorIndex: state.allReducer.colorIndex }))

  return (
    <View className="wrapper">
      <Slide rotationImg={teslaData}></Slide>
      <Button>立即订购</Button>
    </View>
  );
};

export default Index;
