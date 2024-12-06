// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:""
  },
  tapHistory(){
    console.log("查看历史发帖记录");
    wx.navigateTo({
      url: '/pages/user/userRecord/userRecord',
    })
  },
  tapStar(){
    console.log("查看收藏");
  },
  tapHelp(){
    console.log("查看帮助");
  },
  pulluserinfo(){
    let temp=wx.getStorageSync('user_openid');
    let that=this;
    wx.request({
      url: `http://10.132.137.113:8000/getUsernameById?user_id=${temp}`,
      method:'GET',
      success(res){
        if(res.statusCode===200){
          console.log("成功");
          console.log(res.data.username);
          wx.setStorageSync('user_name', res.data.username);
          that.setData({
            username:res.data.username
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.pulluserinfo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.pulluserinfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})