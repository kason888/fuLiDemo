//index.js
//获取应用实例
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
let start_Time, djs_data, sc_time, test;
const WXAPI = require('../../wxapi/main')
Page({
  onShareAppMessage() {
    return {
      title: '免费领好物',
      path: 'pages/index/index'
    }
  },

  data: {
    swiperList:[],
    motto: 'Hello World',
    userInfo: {},
    current: 'homepage',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    background: [],
    giftList: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    noticeList: '欢迎光临', //首页通知
    playNoticeSpeed: 2000, //通知滚动速度，根据数量来计算，2.5s *n 
    comeBtnBg:'../../static/banner/b1.jpg',
    showRead:false,
    showTitle:'新人必看'
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  globalData: {
    appid: '1wqas2342dasaqwe2323424ac23qwe', //appid需自己提供，此处的appid我随机编写
    secret: 'e0dassdadef2424234209bwqqweqw123ccqwa', //secret需自己提供，此处的secret我随机编写
  },
  getSwiper: function () {
    WXAPI.getSwiper({}).then(res => {
      console.log("轮播图", res)
      this.setData({
        swiperList:res.data
      })
    })
  },
  onShow: function () {
    this.read();
  },
  onLoad: function () {
    WXAPI.getNotice({
      isUse: 1
    }).then(res => {
      console.log("tongzhi ", res.data)
      if (res.code == 200) {
        let toString = '';
        for ( let i of res.data){
          toString+= i.content;
        }
        this.setData({
          noticeList:toString
        })
      }
    })
    WXAPI.getComeBtn({
      isWx: 1
    }).then(res => {
      console.log("comebtn ", res)
      if (res.code == 200) {
        this.setData({
          comeBtnBg:res.data[0].imgSrc
          // comeBtnBg:'../../static/testBg.png'
        })
      }
    })

    this.getSwiper();

    var that = this; //把this对象复制到临时变量that
    const wxreq = wx.request({
      url: 'https://api.orderour.com/api/admin/upGoods',
      success: function (res) {
        console.log(res.data);
        that.setData({
          giftList: res.data.data
        }); //和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res) {
        console.log(res.data);
        this.userData = "数据获取失败";
      }
    })



    //获取uuid和code等信息
    // wx.login({
    //   success: function (res) {
    //     console.log('loginCode:', res)
    //   }
    // });


  },
  read: function (e) {
    WXAPI.getRead({
      openId:wx.getStorageSync('openid')
    }).then(res=>{
      console.log("展示新人指导？",res);
      if(res.data != false && res.code === 200){
        this.setData({
          read:true,
          showTitle:res.data.showTitle
        })
      }
    })
  },
 
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // globalData: {
  //   qj: 123
  // }
})