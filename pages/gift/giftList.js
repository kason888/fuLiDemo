// pages/gift/giftList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    marketList: [
      {src:"../../static/banner/b1.jpg",title:"精选好物"},
      {src:"../../static/banner/b2.jpg",title:"精选好物"},
      {src:"../../static/banner/b3.jpg",title:"精选好物"},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    const wxreq = wx.request({
      url: 'https://api.orderour.com/api/wxClient/gift?type=wx',
      success: function (res){
        console.log(res.data);
        that.setData({ marketList: res.data.data });//和页面进行绑定可以动态的渲染到页面
      },
      fail: function (res){
        console.log(res.data);
        // this.userData = "数据获取失败";
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})