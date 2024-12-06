
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:"interest",
    newsList_follow:[],
    newsList_All:[]
  },
  tapLike(e){
    let that=this;
    console.log("like",e.currentTarget.dataset.curid);
    let temp_userId=wx.getStorageSync('user_openid');
    console.log(temp_userId);
    wx.request({
      url: 'http://10.132.137.113:8000/userActions/like',
      method:'POST',
      data:{
        article_id:e.currentTarget.dataset.curid,
        user_id:temp_userId
      },
      success(res){
        if(res.statusCode===200){
          console.log("点赞成功");
          that.pullAll();
        }
        else{
          console.log("失败");
        }
      }
    })
  },
  createNews(){
    wx.navigateTo({
      url: '/pages/write_news/write_news',
    })
  },
  tapTocheck(e){
    console.log("check news",e.currentTarget.dataset.currentid);
    wx.setStorageSync('temp_trans_articleid',e.currentTarget.dataset.currentid)
    wx.navigateTo({
      url: '/pages/create_news/create_news',
    })
  },
  checkImage(e){
    console.log(e.currentTarget.dataset.currentimage);
    let tempPath=e.currentTarget.dataset.currentimage;
    wx.previewImage({
      urls: [tempPath],
    })
  },
  changeTab(e){
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentTab: type,
    });
    this.pullAll();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.pullAll();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  pullAll(){
    let that=this;
    let temp_userId=wx.getStorageSync('user_openid');
    wx.request({
      url: `http://10.132.137.113:8000/getArticlesByUserId?user_id=${temp_userId}`,
      success(res){
        if(res.statusCode===200){
          console.log("成功拉取所有");
          console.log("拉取回来的结果是",res.data.list);
          that.setData({
            newsList_All:res.data.list
          });
          console.log("赋值的结果是",that.data.newsList_All);
          //console.log(that.data.newsList_All[4].preview_images.length);
        }
        else{
          console.log("拉取所有失败");
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.pullAll();
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