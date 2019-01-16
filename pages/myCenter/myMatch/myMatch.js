// miniprogram/pages/myCenter/myMatch/myMatch.js
const app = getApp();
const {
  $Toast
} = require('../../../dist/base/index'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    match_list: [],
    pageIndex: 0,
    img_url: app.globalData.ali,

  },


  // 进入社团详情 
  toDetail: function(e) {

    console.log(e)

    wx.navigateTo({
      url: '../../match/matchDetail/matchDetail?matchEventId=' +
        e.currentTarget.dataset.id,
    })
  },


  loadMore: function(e) {
    console.log('load more ')
    this.setData({
      loading: true,
    })

    let that = this;
    let pageIndex = that.data.pageIndex + 1;
    that.setData({
      pageIndex: pageIndex,
    })
    console.log("pageIndex == ", pageIndex);

    //  请求社团 列表
    wx.request({
      url: app.globalData.club_url + '/match/event/match_by_open_id?open_id=' + app.globalData.userInfo.weChatOpenid + '&page=' + that.data.pageIndex + '&size=10',
      data: {
        'page': that.data.pageIndex,
        'size': '10',
        'open_id': app.globalData.userInfo.weChatOpenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'get',
      success(res) {
        console.log(res.data);
        const match_result = res.data.data.data;

        if (Array.isArray(match_result) && match_result.length != 0) {
          let data = that.data.match_list;
          match_result.forEach(ele => {
            data.push(ele)
          })

          that.setData({
            match_list: data,
            loading: false,
          })
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none'
          })
          that.setData({
            loading: false,
          })
        }
     
        $Toast.hide();

        console.log(that.data.match_list);
      }
    })

  },

  refresh: function(e) {
    console.log('refresh')
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0,
    });

    let that = this;

    // 计算滚动区域高度
    let query = wx.createSelectorQuery()
    wx.getSystemInfo({
      success: res => {
        query.selectAll('.box_top').boundingClientRect(rect => {
          let heightAll = 0;
          rect.map((currentValue, index, arr) => {
            heightAll = heightAll + currentValue.height
          })
          this.setData({
            scrollheight: res.windowHeight - heightAll
          })
        }).exec();
      }
    })

    //  请求社团 列表
    wx.request({
      url: app.globalData.club_url + '/match/event/match_by_open_id?open_id=' + app.globalData.userInfo.weChatOpenid + '&page=0&size=10',
      data: {
        'page': that.data.pageIndex,
        'size': '10',
        'open_id': app.globalData.userInfo.weChatOpenid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'get',
      success(res) {
        console.log(res.data);
        const match_result = res.data.data.data;

        that.setData({
          match_list: match_result,
        })
        $Toast.hide();

        console.log(that.data.match_list);
      }
    })

  },

  // 时间差计算函数
  timeFn: function(d1) {
    //di作为一个变量传进来
    var dateBegin = new Date(d1);
    var dateEnd = new Date(); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    // console.log(" 相差 " + dayDiff + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
    // console.log(dateDiff + "时间差的毫秒数", dayDiff + "计算出相差天数", leave1 + "计算天数后剩余的毫秒数"
    //   , hours + "计算出小时数", minutes + "计算相差分钟数", seconds + "计算相差秒数");

    return dateDiff + '天' + hours + '小时' + minutes + '分';
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})