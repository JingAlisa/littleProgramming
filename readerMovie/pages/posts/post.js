var localData = require("../../data/localData");
Page({
  /**
   * 页面的初始数据
   */
  data:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({mainData:localData.local_data});
  },
  detail:function(event){
    var contentId=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'post_detail/post_detail?id='+contentId,
    })
  },
  onCatchTap:function(event){
    var contentId = event.target.id;
    console.log(event);
    wx.navigateTo({
      url: 'post_detail/post_detail?id=' + contentId,
    })
  }
})