// pages/home-video/index.js
import { getTopMVs } from "../../service/api_video"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMVs:[],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopMVData(0)
  },

  //封装网络请求的方法
  getTopMVData: async function(offset) {
    //判断是否可以请求
    if(!this.data.hasMore && offset !== 0) return 
    //开启请求加载动画
    wx.showNavigationBarLoading()
    //请求数据
    const res = await getTopMVs(offset)
    let newData = this.data.topMVs
    if(offset === 0) {
      newData = res.data
    }else {
      newData = newData.concat(res.data)
    }
    //设置数据
    this.setData({ topMVs: newData })
    this.setData({ hasMore: res.hasMore })
    //关闭请求加载动画
    wx.hideNavigationBarLoading()
    //关闭下拉加载动画
    if(offset === 0) {
      wx.stopPullDownRefresh()
    }
  },

  // 封装事件处理的方法
  handleVideoItemClick: function (event) {
    //获取点击的视频的id
    const id = event.currentTarget.dataset.item.id
    //页面跳转
    wx.navigateTo({
      url: '/pages/detail-video/index?id=' + id,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // if(!this.data.hasMore) return
    // //topMVs的长度就是请求偏移量
    // const res = await getTopMVs(this.data.topMVs.length)
    // this.setData({ topMVs: this.data.topMVs.concat(res.data) })
    // this.setData({ hasMore: res.hasMore })
    this.getTopMVData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})