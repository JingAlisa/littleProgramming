var localData=require("../../../data/localData");
var app=getApp();
Page({
  data:{
    isPlaying: false
  },
  onLoad:function(option){
    console.log(option);
    var myData=localData.local_data[option.id];
    this.setData({id:option.id});
    this.setData({myData:myData});
    // wx.setStorageSync('name', 'Alisa');
    wx.setStorageSync('person',{
      name:'Alisa',
      age:'23',
      sex:'female'
    })
    var userCollected=wx.getStorageSync('articleCollected');
    if(userCollected){
      var postCollected = userCollected[option.id];
      this.setData({
        collected:postCollected
      })
    }else{
      
      userCollected[option.id]=false;
      wx.setStorageSync('articleCollected', userCollected);
    }
    if (app.globalData.g_playMusic){
      this.setData({isPlaying:true})
    }
    console.log(app.globalData.g_playMusic);
    this.onWatchMusic();
  },
  onWatchMusic:function(){
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({ isPlaying: true });
      app.globalData.g_playMusic=true;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({ isPlaying: false });
      app.globalData.g_playMusic = false;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({ isPlaying: false });
      app.globalData.g_playMusic = false;
    });
  },
  onCollectionTap:function(){
    var userCollected=wx.getStorageSync('articleCollected');
    var postCollected=userCollected[this.data.id];
    postCollected=!postCollected;
    //修改缓存内容
    userCollected[this.data.id] = postCollected;
    wx.setStorageSync('articleCollected', userCollected);
    //修改页面绑定的collected数据
    this.setData({collected:postCollected});
    //取消收藏，收藏成功
    // if(postCollected){
    //   wx.showToast({
    //     title: 'finishe collect'
    //   });
    // }else{
    //   wx.showToast({
    //     title:'cancel collect'
    //   });
    // }
    //简单写法
    wx.showToast({
      title: postCollected?"收藏成功":"取消收藏",
      duration:1000,
      icon:postCollected?"success":"loading"
    })
    // this.showModal(userCollected, postCollected);
    
  },
  // showModal: function (userCollected, postCollected) {
  //   var that=this;
  //   wx.showModal({
  //     title: '收藏',
  //     content: postCollected?'收藏该文章？':"取消收藏文章？",
  //     cancelText: '取消',
  //     cancelColor: '#666',
  //     confirmText: '确认',
  //     confirmColor: '#986',
  //     success:function(res){
  //       if(res.confirm){
  //         wx.setStorageSync('articleCollected', userCollected);
  //         //修改页面绑定的collected数据
  //         that.setData({ collected: postCollected });
  //       }
  //     }
  //   })
  // },
  onShareTap:function(){
    var itemList = ['分享到微信', '分享给好友', '分享到QQ', '分享到微博'];
    wx.showActionSheet({
      itemList:itemList,
      itemColor:'#29a',
      success:function(res){
        wx.showModal({
          title: '用户分享到'+itemList[res.tapIndex]
        })
      }
    })
  },
  onPlayMusic:function(){
    var Playing=!this.data.isPlaying;
    this.setData({isPlaying:Playing});
    if (Playing){
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        title:'此时此刻'
      })
    }else{
      wx.pauseBackgroundAudio();
    }
  }
})