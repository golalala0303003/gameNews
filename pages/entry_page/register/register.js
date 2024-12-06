// pages/entry_page/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e){
    console.log("捕获",e.detail.value.userName);
    const temp_Name= e.detail.value.userName;
    wx.login({
      success: (res) => {
        console.log(res.code);
        const wxCode=res.code;
        wx.request({
          url: 'http://10.132.137.113:8000/register',
          method:'POST',
          data:{
            wx_login_code: wxCode,
            username:temp_Name
          },
          success(res){
            if(res.statusCode===200){
              console.log("注册成功");
              console.log(res);
              wx.setStorageSync('user_openid',res.data.openid );
              console.log(wx.getStorageSync('user_openid'));
              wx.switchTab({
                url: '/pages/news/news',
              })
            }
            else{
              console.log("失败");
            }
          }
        })
      },
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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