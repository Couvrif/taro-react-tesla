export default {
  pages: [
    "pages/find/find",
    "pages/tesla/tesla",
    "pages/map/map",
    "pages/shop/shop",
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/find/find',
      text: '发现',
      iconPath: "./assets/img/tabbar/find.png",
      selectedIconPath: "./assets/img/tabbar/findActive.png",
    }, {
      pagePath: 'pages/tesla/tesla',
      text: '选购',
      iconPath: "./assets/img/tabbar/tesla.png",
      selectedIconPath: "./assets/img/tabbar/teslaActive.png",

    }, {
      pagePath: 'pages/shop/shop',
      text: '商城',
      iconPath: "./assets/img/tabbar/shop.png",
      selectedIconPath: "./assets/img/tabbar/shopActive.png",
    }, {
      pagePath: 'pages/map/map',
      text: '地图',
      iconPath: "./assets/img/tabbar/map.png",
      selectedIconPath: "./assets/img/tabbar/mapActive.png",
    }],
    'color': '#000',
    'selectedColor': '#000000',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
