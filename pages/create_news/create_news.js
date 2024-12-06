// pages/create_news/create_news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:"main",
    news:{newsId:"123456789",imagesrcGroup:["/static/1.jpg","/static/2.jpg","/static/3.jpg",],newsTitle:"博德之门3影心攻略",newsComment:10,newsLike:100,newsCreater:"永远的神污渍"},
    richtext:"",
    comment:[],
    article:{}
  },
  formSubmit(e){
    console.log(e.detail.value.comment);
    let that=this;
    let temp_comment_content=e.detail.value.comment;

    let temp_article_id=wx.getStorageSync('temp_trans_articleid');
    let temp_user_id=wx.getStorageSync('user_openid');
    wx.request({
      url: 'http://10.132.137.113:8000/sendComment',
      method:'POST',
      data:{
        article_id: temp_article_id,
        author_id: temp_user_id,
        comment_content: temp_comment_content
      },
      success(res){
        if(res.statusCode===200){
          console.log("发送评论成功");
          that.pullComments();
        }
        else{
          console.log("发送评论失败");
        }
      }
    })
  },
  changeTab(e){
    this.pullArticle();
    this.pullComments();
    console.log(e.currentTarget.dataset.type);
    this.setData({
      currentTab:e.currentTarget.dataset.type
    })
  },
  pullArticle(){
    let that=this;
    console.log("当前查看的是",wx.getStorageSync('temp_trans_articleid'));
    let temp=wx.getStorageSync('temp_trans_articleid');
    wx.request({
      url: `http://10.132.137.113:8000/getArticleById?article_id=${temp}`,
      success(res){
        if(res.statusCode===200){
          console.log("成功")
          console.log(res.data.article);
          that.setData({article:res.data.article});
        }
      }
    })
  },
  pullComments(){
    let that=this;
    let temp=wx.getStorageSync('temp_trans_articleid');
    wx.request({
      url: `http://10.132.137.113:8000/getCommentsByArticleId?article_id=${temp}`,
      success(res){
        if(res.statusCode===200){
          console.log("成功拉取评论",res.data.pulled_comments);
          that.setData({
            comment:res.data.pulled_comments
          })
        }
        else{
          console.log("失败");
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.pullArticle();
    this.pullComments();
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
    this.pullArticle();
    this.pullComments();
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