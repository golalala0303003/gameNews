
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl1:''
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
    console.log("tap");
    const that = this;
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      success(res){
        console.log("picture got");
        console.log(res.tempFiles[0].tempFilePath);
        if(res.tempFiles[0].tempFilePath){
          const myFiles = res.tempFiles[0].tempFilePath;
          that.editorCtx.insertImage({
            src:myFiles,
            width:'60%',
            height:'auto',
            success(insertRes) {
              console.log("Image inserted successfully:", insertRes);
            },
            fail(insertErr) {
              console.error("Image insertion failed:", insertErr);
            }
          });
        }
      }
    })
  },
  uploadFiles(){
    const that = this;
    // 获取富文本编辑器的内容
    this.editorCtx.getContents({
      success(res) {
        console.log("Editor content:", res.html); // 这里可以拿到富文本内容
        wx.setStorageSync('rich', res.html);
        wx.navigateTo({
          url: '/pages/index/navigate/navigate',
        })
      }
    })
  },
  uploadImage(){
    let that=this;
    wx.chooseMedia({
      count:9,
      mediaType:['image'],
      success(res){
        console.log("picture got");
        console.log(res.tempFiles[0].tempFilePath);

        const tempPath=res.tempFiles[0].tempFilePath;
        wx.uploadFile({
          filePath: tempPath,
          name: 'file',
          url: 'http://10.132.137.113:8000/uploadImage',
          success(res){
            if(res.statusCode===200){
              console.log("上传成功");
              
              const temp='http://'+JSON.parse(res.data).url;
              console.log(temp);
              that.setData({
                imageUrl1:temp
              })
            }
            else{
              console.log("failed");
            }
          }
          
        })
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