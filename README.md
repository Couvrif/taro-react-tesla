# Taro框架项目需要注意和配置的事项 #

## 项目使用技术 ##
1. Taro 3.4.1
2. Hooks
3. Redux
4. GraphQL
5. React

## Taro 3的升级 ##
Taro 3 可以支持转换到 H5、ReactNative 以及任意小程序平台。

目前官方支持转换的平台如下：
* H5
* ReactNative
* 微信小程序
* 京东小程序
* 百度小程序
* 支付宝小程序
* 字节跳动小程序
* QQ 小程序
* 钉钉小程序
* 企业微信小程序
* 支付宝 IOT 小程序
* 飞书小程序

在 Taro 3 中可以使用完整的 React / Vue / Vue3 / Nerv 开发体验，具体请参考：

* <p><a href="https://taro-docs.jd.com/taro/docs/react-overall/">基础教程——React</a></p>
* <p><a href="https://taro-docs.jd.com/taro/docs/vue-overall/">基础教程——Vue</a></p>
* <p><a href="https://taro-docs.jd.com/taro/docs/vue3/">基础教程——Vue3</a></p>

## 配置文件 ##
配置文件我们写在了utils/config文件里了

一般放请求的路径、使用的外部SDK的key，以及一些静态资源的链接(例如：小程序里面的默认图片)


## 请求封装 ##
基础的请求方法封装放在了utils/api文件里

包括了restful api 的封装和 graphQL查询的封装

<p style='color: red'>注：目前项目里面封装的GraphQL请求，是针对微信小程序的，如需要兼容多端，请自己参考示例去封装其他端的GraphQL插件</p>


## 自定义组件 ##

<p><a href="https://nervjs.github.io/taro/docs/props.html">Taro自定义组件</a></p>
同样也可以参考component/common下的组件写法。
Taro同样也支持微信小程序原生组件和Taro代码混合使用的情况，但要注意的是
<p style='color: yellow'>如果在Taro项目里面使用了微信小程序原生的组件或者代码，该项目就不支持多端转换</p>


## 使用redux ##

<p><a href="https://nervjs.github.io/taro/docs/redux.html">Taro使用redux教程</a></p>

本项目使用了Hooks，所以redux也是hook的写法


## Hooks ##
[useRef]: https://nervjs.github.io/taro/docs/hooks.html#useref "useRef"

Hooks 是一套全新的 API，可以让你在不编写类，不使用 state 的情况下使用 Class 的状态管理，生命周期等功能。

关于 Hooks 的概述、动机和规则,我们强烈建议你阅读 React 的官方文档。和其它大部分 React 特性不同

<p><a href="https://nervjs.github.io/taro/docs/hooks.html">Taro Hooks</a></p>
<p><a href="https://zh-hans.reactjs.org/docs/hooks-intro.html">React Hooks中文简介</a></p>

本项目也使用了Hooks，相关用法可以参考index.tsx

目前对Hooks的使用，个人总结出下面需要注意的点
1. 不在页面上展示的数据，最好不用useState。 
    * 原因我们先看一下官方对state的说明：
        > `const [state, setState] = useState(initialState); `返回的是一个 state，以及更新 state 的函数，在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。  
        `setState(newState); `  
        setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列，在后续的重新渲染中，useState 返回的第一个值将始终是更新后最新的 state

        从上面的文字我们可以看出来，如果是在页面上使用的数据，用setState触发页面渲染的时候，会获取到最新的state，  
        但是如果页面上面没有使用到定义的state，即使state更新了，我们在代码里取到的值还会是原来初始化的initialState，就会导致数据没更新。  
        所以我推荐，如果是仅仅在页面内做逻辑判断，而不是在展示层上面使用的参数，可以使用[useRef]
        <p style='color: yellow'>注：如果该参数是Object类型，也可以用</p>
        <p style='color: yellow'> setState(prevState => {  </p>
        <p style='color: yellow'>    // 也可以使用 Object.assign  </p>
        <p style='color: yellow'>    return {...prevState, ...updatedValues};  </p>
        <p style='color: yellow'>});</p>
        <p style='color: yellow'>来做到更新state的效果</p>

2. 小程序页面上如果要判断用户时候登录，尽量不用redux里面的数据来判断，否则会因为异步的问题导致一系列的数据不准确


## Taro开发微信小程序过程中遇到的坑 ##

1. Taro默认会开启px转rpx的功能，如果项目内的样式使用的是px来设计，就会出现样式以及字体混乱的问题，在config/index.js文件下，修改pxtransform选项解决
      ```
      mini: {
        postcss: {
          autoprefixer: {
            enable: true,
            config: {
              browsers: [
                'last 3 versions',
                'Android >= 4.1',
                'ios >= 8'
              ]
            }
          },
          pxtransform: {
            enable: false, //像素转换开关
            config: {

            }
          }
        }
      }
      ```
      <p style='color: yellow'>注：如果使用了taro-ui，需要自己去自定义taro-ui的样式，否则taro-ui的样式会因为没开像素转换而混乱</p>