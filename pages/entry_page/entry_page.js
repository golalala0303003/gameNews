import * as lottie from 'lottie-miniprogram'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagRe:0,
    flagLo:0
  },
  
  loginNow(){
    console.log("前往登录页面");
    wx.login({
      success: (res) => {
        console.log(res.code);
        const wxCode=res.code;
        wx.request({
          url: 'http://10.132.137.113:8000/login',
          method:'POST',
          data:{
            wx_login_code:wxCode
          },
          success(res){
            if(res.statusCode===200){
              console.log("登录成功");
              wx.setStorageSync('user_openid',res.data.openid );
              console.log(wx.getStorageSync('user_openid'));
              console.log("用户信息已储存");
            }
          }
        })
      },
    })
    // 添加点击时的缩放效果
    this.setData({flagLo:1});
    setTimeout(() => {
      this.setData({flagLo:0});
      wx.switchTab({
        url: '/pages/news/news',
      })
    }, 500);
    
  },
  registerNow(){
    console.log("前往注册页面");
    this.setData({flagRe:1});
    setTimeout(() => {
      this.setData({flagRe:0});
      wx.navigateTo({
        url: '/pages/entry_page/register/register',
      })
    }, 500);
    
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
    wx.createSelectorQuery().select('#lottiejs-canvas').fields({node: true, size: true}).exec(res => {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
  
  
      const dpr = wx.getSystemInfoSync().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
  
  
      lottie.setup(canvas);
      lottie.loadAnimation({
        loop: true,
        autoplay: true,
        //animationData: animationData,
        path: 'http://10.132.137.113:8000/assets/car-loading2-data.json',
        rendererSettings: {
          context: ctx,
        },
      });
    });
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