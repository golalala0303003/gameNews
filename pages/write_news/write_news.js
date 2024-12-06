// pages/write_news/write_news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageIndex:0,
    preViewImages:[],
  },
  editorIsready(){
    console.log("editor is ready!")
    const that = this;
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
    console.log("inital success!");
  },
  insertImage(){
    console.log("现在开始向编辑器插入图片");
    const that = this;
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      success(res){
        console.log("成功从用户手中拿到了图片");
        console.log(res.tempFiles[0].tempFilePath);
        const tempPath=res.tempFiles[0].tempFilePath;
        wx.uploadFile({
          filePath: tempPath,
          name: 'file',
          url: 'http://10.132.137.113:8000/uploadImage',
          success(res){
            if(res.statusCode===200){
              
              const temp='http://'+JSON.parse(res.data).url;
              console.log("获取的网络图片",temp);
              if(that.data.imageIndex===3)
              {
                console.log("缩略图满了");
              }
              else{
                console.log("向缩略图数组插入",temp);
                that.data.preViewImages[that.data.imageIndex]=temp;
                console.log("当前的缩略图数组",that.data.preViewImages);
                that.data.imageIndex++;
              }
              that.editorCtx.insertImage({
                src:temp,
                width:'60%',
                height:'auto',
                success(insertRes) {
                  console.log("Image inserted successfully:", insertRes);
                },
                fail(insertErr) {
                  console.error("Image insertion failed:", insertErr);
                }
              })
            }
          }
        })
      }
    });
  },
  formSubmit(e){
    console.log(e.detail.value.title);
    const titleCommit=e.detail.value.title;
    const that = this;
    this.editorCtx.getContents({
      success(res) {
        console.log("Editor content:", res.html);
        const tempopenid=wx.getStorageSync('user_openid');
        wx.request({
          url: 'http://10.132.137.113:8000/postArticle',
          method:'POST',
          data:{
            author_openid:tempopenid,
            title:titleCommit,
            richText:res.html,
            preview_images:that.data.preViewImages
          },
          success(res){
            if(res.statusCode===200){
              console.log("上传成功");
              wx.switchTab({
                url: '/pages/news/news',
              })
            }
            else{
              console.log("失败了");
            }
          }
        })
        wx.setStorageSync('rich', res.html);
        /*wx.switchTab({
          url: '/pages/news/news',
        })*/
      }
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